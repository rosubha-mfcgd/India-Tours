"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
require("../logNginx");
const jwksConfig = require('../../certs/jwks.json');
const jsonwebtoken = require('jsonwebtoken');
var jwt = require('jsonwebtoken');
var jwkToPem = require('jwk-to-pem');
const axios = require('axios');
const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
        if (typeof value === 'object' && value !== null) {
            if (seen.has(value)) {
                return; // Omit circular references
            }
            seen.add(value);
        }
        return value;
    };
};
const jsonWebKeys = (req_1, res_1, ...args_1) => __awaiter(void 0, [req_1, res_1, ...args_1], void 0, function* (req, res, retries = 3, delay = 1000) {
    const config = yield axios.get(process.env.OIDC_ENDPOINT_JWKS_URL);
    if (config) {
        console.log('config....', JSON.stringify(config, getCircularReplacer()));
        let jwks_uri = config.data.jwks_uri;
        console.log('jwks_uri....', jwks_uri);
        const certs = yield axios.get(jwks_uri);
        if (certs) {
            console.log('certs....', JSON.stringify(certs, getCircularReplacer()));
            res.status(200).send(JSON.stringify(certs, getCircularReplacer()));
        }
        else {
            res.status(400).send({ "error": "no config found" });
        }
    }
    else {
        res.status(400).send({ "error": "no config found" });
    }
});
//Use the req.isAuthenticated() function to check if user is Authenticated
function checkAuthenticated(req, res, next) {
    console.log('req.path...', req.path);
    // Access 'Authorization' header
    const authorizationHeader = req.get('Authorization');
    const hostHeader = req.get('Host'); // Access 'Host' header
    console.log('Authorization:', authorizationHeader);
    console.log('Host:', hostHeader);
    const access_token = authorizationHeader.replace("Bearer ", "");
    console.log('jwksConfig...', jwksConfig);
    validateToken(access_token, res, next);
}
function validateToken(token, res, next) {
    const header = decodeTokenHeader(token);
    const jsonWebKey = getJsonWebKeyWithKID(header.kid);
    verifyJsonWebTokenSignature(token, jsonWebKey, function (err, decodedToken) {
        if (err) {
            // console.log(err);
            logNginx(err.stack);
            console.log('invalid token....');
            res.status(401).send({ message: "Auth token not found" });
        }
        else {
            console.log(decodedToken);
            next();
        }
    });
}
function decodeTokenHeader(token) {
    const decodedToken = jwt.decode(token, { complete: true });
    const header = decodedToken.header;
    console.log('header...', header);
    return header;
}
function getJsonWebKeyWithKID(kid) {
    for (let jwk of jsonWebKeys) {
        if (jwk.kid == kid) {
            return jwk;
        }
    }
    return null;
}
function verifyJsonWebTokenSignature(token, jsonWebKey, clbk) {
    const pem = jwkToPem(jsonWebKey);
    jsonwebtoken.verify(token, pem, { algorithms: ['RS256'] }, function (err, decodedToken) {
        return clbk(err, decodedToken);
    });
}
module.exports = { checkAuthenticated, jsonWebKeys };
