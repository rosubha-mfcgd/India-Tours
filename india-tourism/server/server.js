const express = require('express');
const session = require('express-session');
//loads environment variables from .env file into process.env
require("dotenv").config();
const crypto = require("crypto")
require("./src/logNginx.js");
const mongoose = require('mongoose');

const cors = require('cors');
//parses cookies attached to the client request object
//const cookieParser = require("cookie-parser");
const { env } = require('process');
const app = express();

const { OAuth2Client } = require('google-auth-library');
const { doSignup } = require('./dist/controller/signup');
const { doLogin } = require('./dist/controller/loginuser');
const PORT = process.env.PORT || 5000;
const GOOGLE_OAUTH_URL = process.env.GOOGLE_OAUTH_URL;
const GOOGLE_CLIENT_ID = process.env.CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.CLIENT_SECRET;
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_OAUTH_CALLBACK_URL;
const GOOGLE_ACCESS_TOKEN_URL = process.env.GOOGLE_ACCESS_TOKEN_URL;
const GOOGLE_REDIRECT_URL = process.env.GOOGLE_OAUTH_CALLBACK_URL;

const GOOGLE_OAUTH_SCOPES = [

  "https%3A//www.googleapis.com/auth/userinfo.email",
  
  "https%3A//www.googleapis.com/auth/userinfo.profile",
  
  ];

  const oAuth2Client = new OAuth2Client(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URL
);

  const corsOptions ={
    credentials:true,  //access-control-allow-credentials:true
    methods: "GET, POST, PATCH, DELETE, PUT, OPTIONS",
    origin: ['http://localhost:8080', 
      'http://localhost:80',
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

//Route for handling user registration and login
const userRouter = require("./dist/routers/routers");
//code for using implemented routes
app.use("/api", userRouter);
app.use("/", userRouter);

// Connect to MongoDBl
mongoose.connect(process.env.MONGO_DB_URI, 
  { useNewUrlParser: true, useUnifiedTopology: true });


app.post("/api/signup", async(req,res) =>{

 const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline', // Request a refresh token
        scope: ['https://www.googleapis.com/auth/userinfo.profile', 
          'https://www.googleapis.com/auth/userinfo.email'],
    });
    if(req.body.access_token)
    {
       session.signuptoken = req.body.access_token;
     //To be changed next
      session.access_token = req.body.access_token;
       console.log('saving access token to session...',session.access_token);
        if(!session.signuptoken)
        {
          throw new Error("No signup token found...");
        }
     const result =  await doSignup(req,res);
     
     if(result)
     {
          console.log('result is....',result);
          if(result === 'Y')
                        {
                        res.status(201).send({ message: "Account signup successful",
                            "access_token":req.body.access_token,code: "Y"});
                        }
                        else if(result === 'E')
                        {
                        res.status(200).send({message: "Account already exists.Please try logging in.",
                            "access_token":req.body.access_token,
                          code: "E"
                          });
                        }else
                        {
                           res.status(400).send({message: "Account signup failed. Try again .",
                            "access_token":req.body.access_token,code: "N"});
                        }
        }else{
         
          console.log('Token not found..');
          res.status(400).send({message: "Account signup failed"});
        }
    }});
      

app.post("/api/loginUser", async(req,res) =>{

 const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline', // Request a refresh token
        scope: ['https://www.googleapis.com/auth/userinfo.profile', 
          'https://www.googleapis.com/auth/userinfo.email'],
    });
    if(req.body.access_token)
    {
       session.logintoken = req.body.access_token;
     //To be changed next
      session.access_token = req.body.access_token;
       console.log('saving access token to session...',session.access_token);
        if(!session.signuptoken)
        {
          throw new Error("No signup token found...");
        }
     const result =  await doLogin(req,res);
     
     if(result)
     {
          console.log('result is....',result);
          if(result === 'Y')
                        {
                        res.status(201).send({ message: "Login successful",
                            "access_token":req.body.access_token,code: "Y"});
                        }
          else
                        {
                           res.status(400).send({message: "Login failed. Try again",
                            "access_token":req.body.access_token,code: "N"});
                        }
        }else{
         
          console.log('Token not found..');
          res.status(400).send({message: "User Login failed, Try again"});
        }
    }});

app.get("/api/callback", async (req, res) => {
  console.log(req.query);
try{
  const { code } = req.query;

  const data = {
    code,
    client_id: GOOGLE_CLIENT_ID,
    client_secret: GOOGLE_CLIENT_SECRET,
    redirect_uri: GOOGLE_REDIRECT_URL,
    grant_type: "authorization_code",
  }

  console.log(data);
  // exchange authorization code for access token & id_token
  const response = await fetch(GOOGLE_ACCESS_TOKEN_URL, {
    method: "POST",

    body: JSON.stringify(data),
  });
  const access_token_data = await response.json();

  const { id_token } = access_token_data;

  console.log('auth token is.... ',id_token);
  req.token = id_token;
  //session.access_token = id_token;
  res.status(response.status).
  send({"auth_token": id_token}).
  catch(res.status(500).send("Failed to signup user.Please retry"));
 
}catch(e){
  logNginx(e.stack)
  res.status(400).send(e.message);
}
 });


// Define routes and middleware
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

