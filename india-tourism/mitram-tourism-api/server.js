const express = require('express');
const crypto = require('crypto');
const querystring = require('querystring');
const axios = require('axios');
// Generate a 32-byte (256-bit) master key (store this securely in your .env file)

const app = express();
const cors = require('cors');
const session = require('express-session');
//loads environment variables from .env file into process.env
require("dotenv").config();

const PORT = process.env.PORT || 3050;
const masterKey = crypto.randomBytes(32);
//Route for handling user registration and login
const appRouter = require("./src/routers/hotelInfoRouters.js");

// Define a base route

  const corsOptions ={
    credentials:true,  //access-control-allow-credentials:true
    methods: "GET, POST, PATCH, DELETE, PUT, OPTIONS",
    origin: ['http://mitramtourism.tk','http://mitramtourism.com',
      'http://localhost:8080', 'http://localhost:8083',
      'http://localhost','http://localhost:81',
      'http://localhost:8090',
      'https://accounts.google.com'] ,// Whitelist the domains you want to allow
      allowedHeaders: "Content-Type, Authorization",
    optionSuccessStatus:200,
 }
 app.use(cors(corsOptions));
// ✅ Place middleware BEFORE your routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({secret:'xcfsaqarpl',// A secret used to sign the session ID cookie
  resave: false ,// Don't save session if unmodified
  saveUninitialized: true,// Don't save uninitialized sessions
  cookie: { maxAge: 3600000 } // Example: session expires in 1 hour
}));
//code for using implemented routes
app.use("/api", appRouter);
const secretKey = 'xcfsaqarpl'; 
const options = {
    expiresIn: '1h' // Token expires in 1 hour
};

app.get('/', (req, res) => {
  res.send('Hello World from Express!');
});
app.post('/api/encrypt',(req,res) =>{
  const {decodedValue, enc_algo} = req.body;
  try{
    console.log('1. Save in API .env -> MASTER_KEY=' + masterKey.toString('hex'));
      // Always generate a unique 12-byte Initialization Vector (IV) per encryption
      const iv = crypto.randomBytes(12);
     // const ENC_MASTER_KEY = Buffer.from(process.env.MASTER_KEY, 'hex'); 
      const cipher = crypto.createCipheriv(enc_algo, masterKey, iv);

       let encrypted = Buffer.concat([
    cipher.update(decodedValue, 'utf8'),
    cipher.final(),
  ]);
      const authTag = cipher.getAuthTag();

      // Pack [IV (12B) + AuthTag (16B) + Ciphertext] into one portable string

      let encryptedKey = Buffer.concat([iv, authTag, encrypted]).toString('base64url');

      res.status(200).send({"encrypted_Key":encryptedKey});
  }
  catch(err){
     console.log(err.stack);
        res.status(400).send(
                {"error":"Failed to encrypt"});
  }
});


app.post('/api/decrypt',(req,res) =>{
  const {encryptedPayload,decr_algo} = req.body;
  try{
     const DEC_MASTER_KEY = Buffer.from(process.env.MASTER_KEY, 'hex'); 
    const [ivHex, authTagHex, encryptedText] = encryptedPayload.split(':');
        const authTag = Buffer.from(authTagHex, 'hex');
    
  const iv = Buffer.from(ivHex, 'hex');
  
    const decipher = crypto.createDecipheriv(decr_algo, DEC_MASTER_KEY, iv);
    
    // ✅ Must set the auth tag before calling final()
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

      res.status(200).send({"decrypted_Key":decrypted});
  }
  catch(err){
     console.log(err.stack);
        res.status(400).send(
                {"error":"Failed to decrypt"});
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
// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
