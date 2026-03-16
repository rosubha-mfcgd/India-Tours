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
const { doSignup } = require('./src/controller/signup');
const { doLogin } = require('./src/controller/loginuser');
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

  const oAuth2Client = new OAuth2Client(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URL
);

  const corsOptions ={
    credentials:true,  //access-control-allow-credentials:true
    methods: "GET, POST, PATCH, DELETE, PUT, OPTIONS",
    origin: ['http://localhost:8080', 'http://localhost:8083',
      'http://localhost','http://localhost:81',
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
const appRouter = require("./src/routers/appRouters.js");
const hotelInfoRouters = require("./src/routers/hotelInfoRouters.js");
const { checkAuthenticated } = require('./src/middlewares/auth.js');
const {checkRequestAuthenticated} = require("./src/middlewares/userAuth.js")
const stripe = require('stripe')(process.env.STRIPE_PAYMENT_SECRET_KEY);
//code for using implemented routes
app.use("/api", appRouter);

// Connect to MongoDBl
mongoose.connect(process.env.MONGO_DB_URI, 
  {serverApi: { version: '1', strict: true, deprecationErrors: true } 
   });

const conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', function () {
console.log('Connected to MongoDB successfully!');
const db = conn.db;

  // Create a new GridFSBucket instance
  bucket = new GridFSBucket(db, {
    bucketName: 'tourImages',
  });

});

app.post("/api/signup", async(req,res) =>{

 const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline', // Request a refresh token
        scope: ['https://www.googleapis.com/auth/userinfo.profile', 
          'https://www.googleapis.com/auth/userinfo.email'],
    });
    const {access_token} = req.body;
    if(!access_token)
    {
        console.log('sign up token not received');
         res.status(400).send({ message: "No signup token found",
                            "access_token":access_token});

    }
    if(access_token)
    {
       session.signuptoken = access_token;
     //To be changed next
      session.access_token = access_token;
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
                            "access_token":access_token,code: "Y"});
                        }
                        else if(result === 'E')
                        {
                        res.status(200).send({message: "Account already exists.Please try logging in.",
                            "access_token":access_token,
                          code: "E"
                          });
                        }else
                        {
                           res.status(400).send({message: "Account signup failed. Try again .",
                            "access_token":access_token,code: "N"});
                        }
        }else{
         
          console.log('Token not found..');
          res.status(400).send({message: "Account signup failed"});
        }
    }});
      
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

    // --- Passport SAML Strategy Setup ---
passport.use(new SamlStrategy(
  {
   // --- KEY CONFIGURATION FIELDS ---
    entryPoint: process.env.SSO_SAML_ENTRYPOINT_URL, // This is the IdP SSO URL
    issuer: process.env.SSO_SAML_ISSUER, // Your Service Provider (SP) identifier
    path: process.env.SSO_CALLBACK_URL, // Your app's assertion consumer service URL
    // --- Security configurations ---
    cert: fs.readFileSync(__dirname + '/certs/dev-da1syrfigotxjolb.pem', 'utf-8'), // Your SP private key
    validateInResponseTo: true,
  },
  function(profile, done) {
    // User validation logic here
    // The 'profile' object contains attributes returned by the IdP
    return done(null, profile);
  }
));

// Routes
app.get('/auth',
  passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }),
  function(req, res) {
    res.redirect('/');
  }
);


app.post('/auth/callback', 
  passport.authenticate('saml', { failureRedirect: '/' }),
  function(req, res) {
    // On success, generate a token (e.g., JWT) and redirect to the React Native deep link
    // Generate the token
    let payload = req.body;
const appToken = jwt.sign(payload, secretKey, options);
  console.log('appToken...',appToken)
    res.redirect(`yourapp://sso-callback?token=${appToken}`); //
});

// --- Serialize/Deserialize User (for sessions) ---
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// --- this method performs the user login ---

app.post("/api/loginUser", checkRequestAuthenticated,async(req,res) =>{

 const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline', // Request a refresh token
        scope: ['https://www.googleapis.com/auth/userinfo.profile', 
          'https://www.googleapis.com/auth/userinfo.email'],
    });
    const {access_token} = req.body;
    

      console.log('session token...',access_token)
      
       session.logintoken = access_token;
       console.log('session token...',session.logintoken)
     //To be changed next
     // session.access_token = access_token;
       console.log('saving login access token to session...',session.logintoken);
         if(!session.logintoken)
         {
           throw new Error("No Login token found...");
         }
     const result =  await doLogin(req,res);
     
     if(result)
     {
          console.log('result is....',result);
          if(result === 'Y')
                        {
                        res.status(200).send({ message: "Login successful",
                            "access_token":access_token,code: "Y"});
                        }
          else if(result === 'NF')
            {
               res.status(200).send({message: "You haven't signed up yet. Please sign up first",
                            "access_token":access_token,code: "NF"});
          }else
                        {
                           res.status(200).send({message: "Login failed. Try again",
                            "access_token":req.body.access_token,code: "N"});
                        }
        }else{
         
          console.log('Token not found..');
          res.status(400).send({message: "User Login failed, Try again"});
        }
    });

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
  const response = await axios.post(GOOGLE_ACCESS_TOKEN_URL, {
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
          console.log(err.stack);
          res.status(404).send("errormessage: cannot find auth keycloak token ");
        }
});
//This method finds the upcoming popular events using gemini AI
app.post("/api/findUpcomingEvents",checkRequestAuthenticated, async(req,res) =>{

    if (!GOOGLE_GEMINI_API_KEY) {
          console.log("API_KEY not found in .env file. Please ensure it's set.");
          process.exit(1); // Exit if API key is missing
        }
        const genAI = new GoogleGenerativeAI(GOOGLE_GEMINI_API_KEY);

       
         const {prompt,modelname} = req.body;
          // Choose the model (e.g., "gemini-pro" for text-only)
          const model = genAI.getGenerativeModel({ model: modelname });

          // Start a chat or send a one-off prompt
               
          console.log('prompt....',prompt);
          const result = await model.generateContent(prompt);
         
          
          if(result){
             const response = await result.response;
             if(response){
                   const text = response.text();
                   console.log('response from Gemini AI...',text);
                  res.status(200).send(text);
                }
              }
                else{
                  console.log('response from Gemini AI...',text);
                    res.status(404).send(
                {
                  "errormessage":"could not find a response from Gemini AI "+text});
                }
              
})


app.post('/api/handleToken',checkRequestAuthenticated,async(req,res) =>{
  let { email,mobile } = req.body;
   
    
  if(!email && !mobile)
  {
     res.status(400).send({"error":"No email/mobile found"})
  }
  else if(session && session.access_token)
  {

    res.status(200).send({"access_token":session.access_token});
  }
else{
   await axios.post(process.env.BASE_APP_URI+"/token").then(
      response => {
        console.log('response....',response)
        console.log('access token....',response.data.access_token)
        session.access_token = response.data.access_token;
        console.log('session access token...',session.access_token);
          res.status(200).send({"access_token":session.access_token});
      }
    ).catch(error =>
    {
        logNginx("error in receiving token....",error);
        res.status(401).send({"error":"Invalid token found"});
    });
  }
})


app.post('/api/validateTokenWithSession',checkRequestAuthenticated,async(req,res) =>{
  let { access_token } = req.body;
  if(!access_token)
  {
     res.status(400).send({"error":"No access  token found"})
  }
  else if(session && session.access_token === access_token)
  {
    res.status(200).send({"isValidRequest":"Y"});
  }
else
  {
   res.status(400).send({"isValidRequest":"N"});
  }
})
//This method pulls the image as base64 buffer from the SF bucket 
app.get("/api/getImageFromDB/:fileId/:bucketname",checkRequestAuthenticated, async(req,res)=>{
   let { fileId,bucketname } = req.params;
  if(!fileId)
  {
     res.status(400).send({"error":"No fileId found"})
  }
  console.log('fileID is ...',fileId)
   // Convert the string fileId to a MongoDB ObjectId
    const objectFileId  = new ObjectId(fileId);
    // Open a download stream for the specified file ID
     const bucket = new mongoose.mongo.GridFSBucket(conn.db, { bucketName: bucketname });
      const downloadStream = bucket.openDownloadStream(objectFileId);
      // Set content type and disposition headers for the client
      const chunks = [];
      downloadStream.on("data", (chunk) => chunks.push(chunk));
      downloadStream.on("end", () => {
        const buffer = Buffer.concat(chunks);
        const base64Image = `data:image/png;base64,${buffer.toString("base64")}`;
        res.json({ image: base64Image });
      });
     
     downloadStream.on("error", (error) => {
        console.error("Error during download:", error);
        res.status(404).send("File not found or an error occurred.");
      });

})
//Initiates Payment process
app.post('/api/create-payment-intent', async (req, res) => {
  try{
  const {amount,currency} = req.body;
  let destinationAccountId = '104901503247';
  console.log('req body....',req.body);
    //  const paymentIntent = await stripe.paymentIntents.create({
    //     //amount: amount,
    //     amount: 100,
    //     currency: currency,
    //     payment_method_types: ['card'],
    //      automatic_payment_methods: {
    //     enabled: true,
    //   },
    //    transfer_data: {
    //     destination: destinationAccountId, 
    //   },
    //    // Optionally, collect an application fee for your platform
    //   application_fee_amount: 100,
    //  });

     const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
       currency: currency,
      automatic_payment_methods: {
        enabled: true,
      }      
     });
      // Send the client secret to the client
    res.json({
      clientSecret: paymentIntent.client_secret
    });
  }catch(err){
   logNginx("error in create payment api....",err);
   console.log(err.stack)
   console.log(err.message)
    res.status(500).json({
      error: err.message
    });
  }
});


//Webhook that confirms stripe payment complete

app.post('/api/stripe-webhook', express.raw({type: 'application/json'}), (req, res) => {
  

   const sig = req.headers['stripe-signature'];
  let event;
  const endpointSecret = process.env.STRIPE_PAYMENT_WEBHOOK_SIGNING_SECRET; // Get this from your Stripe Dashboard

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    // Invalid signature
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

   // Handle the event
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    // CRITICAL: Update your database to mark the order as paid
    console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
    // Example: updateOrderInDB(paymentIntent.id, 'paid');
  } else {
    console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.status(200).json({ received: true });
})

// Define routes and middleware
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

