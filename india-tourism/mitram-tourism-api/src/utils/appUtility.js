const crypto = require('crypto');
// Define the encryption algorithm
const algorithm = 'aes-256-cbc-sach';

// Generate a random 32-byte key (for AES-256)
const key = crypto.randomBytes(32);

// Generate a random 16-byte initialization vector (IV)
const iv = crypto.randomBytes(16);


//loads environment variables from .env file into process.env
require("dotenv").config();

// Load the exact same Master Key from your .env file
const MASTER_KEY = Buffer.from(process.env.MASTER_KEY, 'hex');
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
function decrypt(encryptedBase64Url,decryption_algo) {
 const raw = Buffer.from(encryptedBase64Url, 'base64url');

  // Unpack the embedded IV, AuthTag, and Ciphertext
  const iv = raw.subarray(0, 12);
  const authTag = raw.subarray(12, 28);
  const ciphertext = raw.subarray(28);

  const decipher = crypto.createDecipheriv(decryption_algo, MASTER_KEY, iv);
  decipher.setAuthTag(authTag);

  const decrypted = Buffer.concat([
    decipher.update(ciphertext),
    decipher.final(),
  ]);

  return decrypted.toString('utf8');
}

 function generateOTP()
 {
     // Generates a random integer between 100000 (inclusive) and 999999 (inclusive)
  return crypto.randomInt(100000, 999999); 
 }

 function generateDeviceID()
 {
     // Generates a random integer between 100000 (inclusive) and 999999 (inclusive)
  return crypto.randomInt(10000000, 99999999); 
 }

  function generateBookingId()
 {
     // Generates a random integer between 100000 (inclusive) and 999999 (inclusive)
  return crypto.randomInt(10000000, 99999999); 
 }
 module.exports = {
  generateOTP: generateOTP,
  generateBookingId:generateBookingId,
  generateDeviceID:generateDeviceID,
  decrypt: decrypt,
  encrypt: encrypt
};