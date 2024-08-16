import 'server-only';
import { SignJWT, jwtVerify } from 'jose';
import {
  COOKIES_ACCESS_TOKEN_KEY,
  COOKIES_REFRESH_TOKEN_KEY,
} from '@server/authentication/cookies';

import IToken from '@models/token';

const JWT_AUTHENTICATION_SECRET = process.env.JWT_AUTHENTICATION_SECRET;

// MARK: Creating Tokens

/**
 * Creates a new token with the specified payload and age.
 * @param {IToken} payload
 * @param {number} age
 * @throws {Error}
 * @returns {Promise<string>}
 */
export async function createToken(payload, age) {
  const now = Math.floor(Date.now() / 1000);
  // @ts-ignore
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setExpirationTime(now + age)
    .setIssuedAt(now)
    .setNotBefore(now)
    .sign(new TextEncoder().encode(JWT_AUTHENTICATION_SECRET));

  return token;
}

// MARK: Access Token

/**
 * Decodes the provided access token, returning the decoded payload.
 * @param {string} token
 * @throws {Error}
 * @returns {Promise<IToken>}
 */
export async function decodeAccessToken(token) {
  if (token == undefined) {
    throw new Error('No access token provided!');
  }

  const { payload } = await jwtVerify(
    token,
    new TextEncoder().encode(JWT_AUTHENTICATION_SECRET)
  );

  if (payload.type !== COOKIES_ACCESS_TOKEN_KEY) {
    throw new Error('Provided token type was not an access token!');
  }

  // @ts-ignore
  return payload;
}

// MARK: Refresh Token

/**
 * Decodes the provided refresh token, returning the decoded payload.
 * @param {string} token
 * @throws {Error}
 * @returns {Promise<IToken>}
 */
export async function decodeRefreshToken(token) {
  if (token == undefined) {
    throw new Error('No refresh token provided!');
  }

  const { payload } = await jwtVerify(
    token,
    new TextEncoder().encode(JWT_AUTHENTICATION_SECRET)
  );

  if (payload.type !== COOKIES_REFRESH_TOKEN_KEY) {
    throw new Error('Provided token type was not a refresh token.');
  }

  // @ts-ignore
  return payload;
}
