const crypto = require('crypto');
// Define the encryption algorithm
const algorithm = 'aes-256-cbc-sach';

// Generate a random 32-byte key (for AES-256)
const key = crypto.randomBytes(32);

// Generate a random 16-byte initialization vector (IV)
const iv = crypto.randomBytes(16);


//loads environment variables from .env file into process.env
require("dotenv").config();
function encrypt(text) {
  // Create a cipher object with the algorithm, key, and IV
  let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);

  // Update the cipher with the text and finalize the encryption
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  // Return the IV and encrypted data as hexadecimal strings
  return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

/**
 * Decrypts encrypted data.
 * @param {object} text - An object containing the IV and encrypted data in hexadecimal format.
 * @returns {string} The decrypted string.
 */
function decrypt(encryptedHex) {
  // Convert the IV and encrypted data back to Buffers
  const encryptedBuffer = Buffer.from(encryptedHex, 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));

  let decrypted = decipher.update(encryptedBuffer);
 // decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString('utf8');
}

 function generateOTP()
 {
     // Generates a random integer between 100000 (inclusive) and 999999 (inclusive)
  return crypto.randomInt(100000, 999999); 
 }


  function generateBookingId()
 {
     // Generates a random integer between 100000 (inclusive) and 999999 (inclusive)
  return crypto.randomInt(10000000, 99999999); 
 }
 module.exports = {
  generateOTP: generateOTP,
  generateBookingId:generateBookingId,
  decrypt: decrypt,
  encrypt: encrypt
};