import crypto from 'crypto';

/**
 * Generates a signed reset token containing the user's email and an expiration timestamp.
 * Uses the NextAuth/AUTH_SECRET as the signing key.
 */
export function generateResetToken(email: string, expiry: number): string {
  const secret = process.env.AUTH_SECRET || '39662b2b1c4b4a1a8c0e6c6e3d2e1c1b';
  const data = `${email}:${expiry}`;
  const signature = crypto.createHmac('sha256', secret).update(data).digest('hex');
  return Buffer.from(`${data}:${signature}`).toString('base64url');
}

/**
 * Verifies a reset token's signature and expiration date.
 * Returns the email if the token is valid, or null if it is expired/invalid.
 */
export function verifyResetToken(token: string): string | null {
  try {
    const decoded = Buffer.from(token, 'base64url').toString('utf8');
    const parts = decoded.split(':');
    if (parts.length !== 3) return null;
    
    const [email, expiryStr, signature] = parts;
    const expiry = parseInt(expiryStr, 10);
    
    // Check if expired
    if (isNaN(expiry) || Date.now() > expiry) {
      return null;
    }
    
    const secret = process.env.AUTH_SECRET || '39662b2b1c4b4a1a8c0e6c6e3d2e1c1b';
    const expectedSignature = crypto.createHmac('sha256', secret).update(`${email}:${expiry}`).digest('hex');
    
    if (signature === expectedSignature) {
      return email;
    }
  } catch (e) {
    // Ignore decoding errors
  }
  return null;
}
