
require("../logNginx");
const crypto = require("crypto")
const jwksConfig = require('../../certs/jwks.json'); 
const jsonwebtoken = require('jsonwebtoken');
const session = require('express-session');
const GOOGLE_CLIENT_ID = process.env.CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.CLIENT_SECRET;

const GOOGLE_ACCESS_TOKEN_URL = process.env.GOOGLE_ACCESS_TOKEN_URL;
const GOOGLE_REDIRECT_URL = process.env.GOOGLE_OAUTH_CALLBACK_URL;

const GOOGLE_OAUTH_URL = process.env.GOOGLE_OAUTH_URL;

const GOOGLE_CALLBACK_URL = process.env.GOOGLE_OAUTH_CALLBACK_URL;

const GOOGLE_OAUTH_SCOPES = [

  "https%3A//www.googleapis.com/auth/userinfo.email",
  
  "https%3A//www.googleapis.com/auth/userinfo.profile",
  
  ];
var jwt = require('jsonwebtoken');
var jwkToPem = require('jwk-to-pem');

const jsonWebKeys = jwksConfig.keys;
  
 //Use the req.isAuthenticated() function to check if user is Authenticated
function checkAuthenticated (req, res, next)  {
  
    console.log('req.path...',req.path);
   
         // Access 'Authorization' header
        const authorizationHeader = req.get('Authorization');
        const hostHeader = req.get('Host'); // Access 'Host' header
        console.log('Authorization:', authorizationHeader);
        console.log('Host:', hostHeader);
       const access_token = authorizationHeader.replace("Bearer ", "");
       console.log('jwksConfig...',jwksConfig);
       
        validateToken(access_token,res, next);
        
}

function validateToken(token,res,next) {
    const header = decodeTokenHeader(token) 
    const jsonWebKey = getJsonWebKeyWithKID(header.kid);
    verifyJsonWebTokenSignature(token, jsonWebKey, function(err, decodedToken) {
        if (err) 
            {
           // console.log(err);
             logNginx(err.stack);
             console.log('invalid token....');
             res.status(401).send({message:"Auth token not found"}); 
        } else {
            console.log(decodedToken);
            
            next(); 
        }
    })
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
            return jwk
        }
    }
    return null
}

function verifyJsonWebTokenSignature(token, jsonWebKey, clbk) {
    const pem = jwkToPem(jsonWebKey)
    jsonwebtoken.verify(token, pem, { algorithms: ['RS256'] }, function(err, decodedToken) {
        return clbk(err, decodedToken)
    })
}
module.exports = {checkAuthenticated}



