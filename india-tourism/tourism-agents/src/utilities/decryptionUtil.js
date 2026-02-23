const crypto = require('crypto');
// Define the encryption algorithm
const algorithm = 'aes-256-gcm';
const secretKey = 'xcfsaqarplrft';

// Generate a random 32-byte key (for AES-256)
const key = crypto.createHash('sha256').update(String(secretKey)).digest('base64').substring(0, 32);

// Generate a random 16-byte initialization vector (IV)
const iv = crypto.randomBytes(16);
/**
 * Decrypts encrypted data.
 * @param {object} text - An object containing the IV and encrypted data in hexadecimal format.
 * @returns {string} The decrypted string.
 */
function decrypt(encryptedHex) {
    // Split the IV and the actual encrypted text
  const [ivHex, encryptedText] = encryptedHex.split(':');
   const iv = Buffer.from(ivHex, 'hex');
   const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey), iv);

 let decrypted = decipher.update(encryptedText, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');

  return decrypted;
}

module.exports = {
   decrypt: decrypt
};