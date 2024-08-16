import 'server-only';
import { cookies } from 'next/headers';

// MARK: Constants

export const COOKIES_ACCESS_TOKEN_KEY = 'session.access_token';
export const COOKIES_ACCESS_TOKEN_AGE = 60 * 60; // 1 Hour Access Expiration.
export const COOKIES_REFRESH_TOKEN_KEY = 'session.refresh_token';
export const COOKIES_REFRESH_TOKEN_AGE = 30 * 24 * 60 * 60; // 30 Day Refresh Expiration.

// MARK: Access Token

/**
 * Gets the access token from cookies.
 * @throws {Error}
 * @returns {Promise<string | undefined>}
 */
export async function getCookiesAccessToken() {
  const store = await cookies();
  return store.get(COOKIES_ACCESS_TOKEN_KEY)?.value;
}

/**
 * Sets the access token in cookies.
 * @param {string} token
 * @param {boolean} remember
 * @throws {Error}
 * @returns {Promise<void>}
 */
export async function setCookiesAccessToken(token, remember) {
  const store = await cookies();
  store.set(COOKIES_ACCESS_TOKEN_KEY, token, {
    httpOnly: true,
    secure: false, // true, TODO: <Connor> This should be secure but it doesn't work on Safari unless it is false.
    sameSite: 'strict',
    maxAge: remember ? COOKIES_ACCESS_TOKEN_AGE : null,
    path: '/',
  });
}

/**
 * Deletes the access token from cookies.
 * @throws {Error}
 * @returns {Promise<void>}
 */
export async function deleteCookiesAccessToken() {
  const store = await cookies();
  store.delete(COOKIES_ACCESS_TOKEN_KEY);
}

// MARK: Refresh Token

/**
 * Gets the refresh token from cookies.
 * @throws {Error}
 * @returns {Promise<string | undefined>}
 */
export async function getCookiesRefreshToken() {
  const store = await cookies();
  return store.get(COOKIES_REFRESH_TOKEN_KEY)?.value;
}

/**
 * Sets the refresh token in cookies.
 * @param {string} token
 * @param {boolean} remember
 * @throws {Error}
 * @returns {Promise<void>}
 */
export async function setCookiesRefreshToken(token, remember) {
  const store = await cookies();
  store.set(COOKIES_REFRESH_TOKEN_KEY, token, {
    httpOnly: true,
    secure: false, // true, TODO: <Connor> This should be secure but it doesn't work on Safari unless it is false.
    sameSite: 'strict',
    maxAge: remember ? COOKIES_REFRESH_TOKEN_AGE : null,
    path: '/',
  });
}

/**
 * Deletes the refresh token from cookies.
 * @throws {Error}
 * @returns {Promise<void>}
 */
export async function deleteCookiesRefreshToken() {
  const store = await cookies();
  store.delete(COOKIES_REFRESH_TOKEN_KEY);
}
