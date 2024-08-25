import 'server-only';
import { SignJWT, jwtVerify } from 'jose';

const secret = process.env.AUTHENTICATION_SECRET;

// Verifies the provided token, returning the decoded payload if valid or null if invalid.
export async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret)
    );

    return payload;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Signs the provided payload with the specified age, creating a JWT token.
export async function signToken(payload, age) {
  const now = Math.floor(Date.now() / 1000);
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setExpirationTime(now + age)
    .setIssuedAt(now)
    .setNotBefore(now)
    .sign(new TextEncoder().encode(secret));

  return token;
}
