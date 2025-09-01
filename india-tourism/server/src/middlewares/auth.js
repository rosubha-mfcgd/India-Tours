
require("../logNginx");
const crypto = require("crypto")
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

  
 //Use the req.isAuthenticated() function to check if user is Authenticated
function checkAuthenticated (req, res, next)  {
  
    console.log('req.path...',req.path);
    let reqPath = req.path;
    if(reqPath === '/signup')
    {
        next();
    }
    else{
      if(session){
         console.log('session::',session);
         console.log('sessionToken::', session.access_token);
         // Access 'Authorization' header
        const authorizationHeader = req.get('Authorization');
        const hostHeader = req.get('Host'); // Access 'Host' header
        console.log('Authorization:', authorizationHeader);
        console.log('Host:', hostHeader);
       
        const sessionToken = session.access_token;
    
        if(authorizationHeader && 
        sessionToken === authorizationHeader.replace("Bearer ", ""))
        {
           // console.log('Valid request....');
            next();
        }else
        {
            res.status(401).send({message:"Auth token not found"});
        }
    }else{
            console.log('session is not found');
            res.status(401).send({message:"session not found"});
     } 
  }
}

module.exports = {checkAuthenticated}



