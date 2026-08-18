/**
 * Secure Crypto Utility using Web Crypto API (SHA-256)
 * Prevents storing plaintext passwords in application memory or local storage.
 */

const SALT = 'HappyHearts_Preschool_Security_Salt_2026';

export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + SALT);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const computedHash = await hashPassword(password);
  return computedHash === hash;
}

export interface ResetToken {
  token: string;
  email: string;
  expiresAt: number; // Timestamp
  used: boolean;
}

export function generateResetToken(email: string): ResetToken {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  const token = Array.from(array, b => b.toString(16).padStart(2, '0')).join('');
  
  return {
    token,
    email,
    expiresAt: Date.now() + 15 * 60 * 1000, // 15 minutes validity
    used: false
  };
}
