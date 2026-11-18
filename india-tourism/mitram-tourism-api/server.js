const express = require('express');
const crypto = require('crypto');

// Generate a 32-byte (256-bit) master key (store this securely in your .env file)

const app = express();
//loads environment variables from .env file into process.env
require("dotenv").config();
// ✅ Place middleware BEFORE your routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3050;
const masterKey = crypto.randomBytes(32);
//Route for handling user registration and login
const appRouter = require("./src/routers/hotelInfoRouters.js");
//code for using implemented routes
app.use("/api", appRouter);
// Define a base route
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
// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
