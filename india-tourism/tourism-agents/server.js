const express = require('express');


const querystring = require('querystring');

const session = require('express-session');
//loads environment variables from .env file into process.env
require("dotenv").config();
const crypto = require("crypto")
const jwt = require('jsonwebtoken');
require("./src/logNginx.js");
const mongoose = require('mongoose');
const { GridFSBucket, ObjectId } = require("mongodb");
const axios = require('axios');
const cors = require('cors');
require("./src/logNginx.js");

//parses cookies attached to the client request object
//const cookieParser = require("cookie-parser");
const { env } = require('process');
const fs = require('fs');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const app = express();
const passport = require('passport');
const SamlStrategy = require('passport-saml').Strategy;
const bodyParser = require('body-parser');

const { OAuth2Client } = require('google-auth-library');
const encryptionUtil = require('./src/utilities/encryptionUtil');

const PORT = process.env.PORT || 5000;
const GOOGLE_OAUTH_URL = process.env.GOOGLE_OAUTH_URL;
const GOOGLE_CLIENT_ID = process.env.CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.CLIENT_SECRET;
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_OAUTH_CALLBACK_URL;
const GOOGLE_ACCESS_TOKEN_URL = process.env.GOOGLE_ACCESS_TOKEN_URL;
const GOOGLE_REDIRECT_URL = process.env.GOOGLE_OAUTH_CALLBACK_URL;
const API_CLIENT_ID = process.env.API_CLIENT_ID;
const API_CLIENT_SECRET = process.env.API_CLIENT_SECRET;
const GRANT_TYPE = process.env.GRANT_TYPE;
const API_AUTH_TOKEN_URL = process.env.API_AUTH_TOKEN_URL;
const GOOGLE_GEMINI_API_KEY = process.env.GOOGLE_GEMINI_API_KEY;
 
const GOOGLE_OAUTH_SCOPES = [

  "https%3A//www.googleapis.com/auth/userinfo.email",
  
  "https%3A//www.googleapis.com/auth/userinfo.profile",
  
  ];

 
  const corsOptions ={
    credentials:true,  //access-control-allow-credentials:true
    methods: "GET, POST, PATCH, DELETE, PUT, OPTIONS",
    origin: ['http://localhost:8080', 'http://localhost:8081', 'http://localhost:8083',
      'http://localhost:80','http://localhost:81',
      'http://localhost:8090',
      'https://accounts.google.com'] ,// Whitelist the domains you want to allow
      allowedHeaders: "Content-Type, Authorization",
    optionSuccessStatus:200,
 }
 const state = crypto.randomBytes(32).toString('hex');
 const scopes = GOOGLE_OAUTH_SCOPES.join(" ");
 const GOOGLE_OAUTH_CONSENT_SCREEN_URL = `${GOOGLE_OAUTH_URL}?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_CALLBACK_URL}&access_type=offline&response_type=code&state=${state}&scope=${scopes}`;
 console.log('GOOGLE_OAUTH_CONSENT_SCREEN_URL....',GOOGLE_OAUTH_CONSENT_SCREEN_URL);
app.use(cors(corsOptions));

app.use(express.json());

app.use(session({secret:'xcfsaqarpl',// A secret used to sign the session ID cookie
  resave: false ,// Don't save session if unmodified
  saveUninitialized: true,// Don't save uninitialized sessions
  cookie: { maxAge: 3600000 } // Example: session expires in 1 hour
}));

const secretKey = 'xcfsaqarpl'; 
const options = {
    expiresIn: '1h' // Token expires in 1 hour
};


app.use(passport.initialize());

//Route for handling user registration and login
const appRouter = require("./src/routers/weatheragentRouters.js");
const {checkRequestAuthenticated} = require("./src/middlewares/userAuth")

//code for using implemented routes
app.use("/api/agent", appRouter);

// Connect to MongoDBl
// mongoose.connect(process.env.MONGO_DB_URI, 
//   { useNewUrlParser: true, useUnifiedTopology: true
//    });

// const conn = mongoose.connection;

// conn.on('error', console.error.bind(console, 'connection error:'));
// conn.once('open', function () {
// console.log('Connected to MongoDB successfully!');
// const db = conn.db;

// });
const googleGeminiKey = process.env.GOOGLE_GEMINI_API_KEY;


//This function generates the oAuth token for API calls
app.post("/api/token", async(req,res) =>{
//Comment out the Auth token generation from AWS Cognito 
  //Implement the token generation from keycloak - free token generation
  let data = {
        client_id: process.env.AUTH_CLIENT_ID,
        client_secret: process.env.AUTH_CLIENT_SECRET,
        grant_type: process.env.GRANT_TYPE
    }
    
  try{
    console.log('generating keycloak token....');
    await axios.post(process.env.AUTH_SERVER_URI,querystring.stringify(data),
    {
          headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
            }}).then(
            response => {
                console.log('response data....',response.data)
                res.status(200).send(response.data);
            }
          );
        }
      catch(err)
        {
          logNginx(err.stack)
        }
});

//This function encrypts the secret key
app.get("/api/getEncryptedKey", checkRequestAuthenticated,async(req,res) =>{

  let encryptedKey = encryptionUtil.encrypt(googleGeminiKey);
  res.status(200).send({"encryptedKey":encryptedKey});

});
//This function decrypts the secret key
app.post("/api/getDecryptedKey", checkRequestAuthenticated,async(req,res) =>{
  const {encryptedKey} = req.body;
  //console.log('encryptedKey...',encryptedKey);
  let decryptedKey = encryptionUtil.decrypt(encryptedKey);
  res.status(200).send({"decryptedKey":decryptedKey});
});
// Define routes and middleware
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

