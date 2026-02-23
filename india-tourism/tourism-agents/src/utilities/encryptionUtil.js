const crypto = require('crypto');
// Define the encryption algorithm
const algorithm = 'aes-256-gcm';
const KEY_LENGTH = 32; // for aes-256
const IV_LENGTH = 16;  // for cbc
const secretKey = crypto.randomBytes(KEY_LENGTH); 

// Generate a random 32-byte key (for AES-256)
const key = crypto.randomBytes(32);

// Generate a random 16-byte initialization vector (IV)
const iv = crypto.randomBytes(12);


//loads environment variables from .env file into process.env
require("dotenv").config();
function encrypt(text) {
  // Create a cipher object with the algorithm, key, and IV
  let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);

  // Update the cipher with the text and finalize the encryption
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted+= cipher.final('hex');
    const authTag = cipher.getAuthTag();
  // Return the IV and encrypted data as hexadecimal strings
  return   `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
}


function decrypt(encryptedData) {
    // Split the IV and the actual encrypted text
    const parts = encryptedData.split(':');
    if (parts.length !== 3) {
        throw new Error('Invalid encrypted data format');
    }
  const iv = Buffer.from(parts[0], 'hex');
  const authTag = Buffer.from(parts[1], 'hex');
  const cipherText = Buffer.from(parts[2], 'hex');

   const decipher = crypto.createDecipheriv(algorithm, key, iv);
   // Must set the authentication tag before updating the decipher
    decipher.setAuthTag(authTag);
  let decrypted = decipher.update(cipherText, 'hex', 'utf8');
   decrypted += decipher.final('utf8');

    return decrypted;
  }

module.exports = {
   encrypt: encrypt,
   decrypt: decrypt
};
