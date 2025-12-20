import * as Crypto from 'expo-crypto';
import * as Random from 'expo-random';
import { Buffer } from 'buffer';

// Function to URL-encode a string in base64url format
function URLEncode(str) {
  return str
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

// Function to generate the code verifier
async function generateCodeVerifier() {
  // PKCE spec requires a minimum of 43 and a maximum of 128 characters for the code verifier.
  // 32 bytes (256 bits) is sufficient random data.
  const randomBytes = await Random.getRandomBytesAsync(32); 
  const base64String = Buffer.from(randomBytes).toString('base64');
  return URLEncode(base64String);
}

// Function to generate the code challenge from the code verifier using SHA-256
async function generateCodeChallenge(codeVerifier) {
  // Hash the code verifier using SHA-256
  const hash = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    codeVerifier,
    { encoding: Crypto.CryptoEncoding.BASE64 }
  );
  // Convert the hash to base64-url encoding
  return URLEncode(hash);
}

// Example usage in a component or function
export const getPKCE = async () => {
  try {
    const codeVerifier = await generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);

    console.log('Code Verifier:', codeVerifier);
    console.log('Code Challenge:', codeChallenge);

    // Store the codeVerifier securely (e.g., using expo-secure-store or AsyncStorage) 
    // to use later during the token exchange step.
    // The codeChallenge is sent in the initial authorization request URL.
    return { codeVerifier, codeChallenge };

  } catch (error) {
    console.error("Error generating PKCE codes:", error);
  }
};
