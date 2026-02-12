
require("../logNginx");
const jwksConfig = require('../../certs/jwks.json'); 
const session = require('express-session');
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

async function findjsonWebKeys() {
     const config = await axios.get(process.env.OIDC_ENDPOINT_JWKS_URL);
     if(config)
     {
      //  console.log('config....',JSON.stringify(config,getCircularReplacer()));
        let jwks_uri = config.data.jwks_uri;
        console.log('jwks_uri....',jwks_uri);
        const certs = await axios.get(jwks_uri);
        if(certs)
        {
           // console.log('certs....', JSON.stringify(certs,getCircularReplacer())); 
           return JSON.stringify(certs,getCircularReplacer());
        }else{
          //  res.status(400).send({"error":"no config found"});
             return {};
        }
     }else{
      //  res.status(400).send({"error":"no config found"});
      return {};
     }
}
  
 //Use the req.isAuthenticated() function to check if user is Authenticated
 //This uses keycloak auth mechanism
async function checkRequestAuthenticated (req, res, next)  {
  
    console.log('req.path...',req.path);
    console.log('checking keycloak token....')
    if(session && !session.jsonWebKeys)
    {
       let jsonWebKeys = await findjsonWebKeys();
       if(jsonWebKeys)
       {
            console.log('jsonWebkeys.....',jsonWebKeys);

            session.jsonWebKeys = (JSON.parse(jsonWebKeys)).data.keys;
            console.log('session jsonWebkeys....',session.jsonWebKeys)
       }
    }
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
             console.log('invalid token....');
             logNginx(err.stack);
             res.status(401).send({message:"Auth token not found"}); 
        } else {

            console.log("user token valid...", decodedToken);
            
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
    let jsonWebKeys = session.jsonWebKeys;
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
module.exports = {checkRequestAuthenticated}



