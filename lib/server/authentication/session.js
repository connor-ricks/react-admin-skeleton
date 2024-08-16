import 'server-only';
import {
  assignRefreshToken,
  unassignRefreshToken,
  validateRefreshToken,
} from '@com/authentication';
import {
  COOKIES_ACCESS_TOKEN_AGE,
  COOKIES_ACCESS_TOKEN_KEY,
  COOKIES_REFRESH_TOKEN_AGE,
  COOKIES_REFRESH_TOKEN_KEY,
  getCookiesAccessToken,
  getCookiesRefreshToken,
  deleteCookiesAccessToken,
  deleteCookiesRefreshToken,
  setCookiesAccessToken,
  setCookiesRefreshToken,
} from '@server/authentication/cookies';
import {
  createToken,
  decodeAccessToken,
  decodeRefreshToken,
} from '@server/authentication/jwt';

import IToken from '@models/token';

/**
 * Creates a new session, setting an access and refresh tokens on the response.
 * @param {string} username
 * @param {boolean} remember
 * @throws {Error}
 * @returns {Promise<void>}
 */
export async function createSession(account, username, remember) {
  const access = await createToken(
    { account, username, remember, type: COOKIES_ACCESS_TOKEN_KEY },
    COOKIES_ACCESS_TOKEN_AGE
  );

  const refresh = await createToken(
    { account, username, remember, type: COOKIES_REFRESH_TOKEN_KEY },
    COOKIES_REFRESH_TOKEN_AGE
  );

  await assignRefreshToken(account, username, refresh);
  await setCookiesAccessToken(access, remember);
  await setCookiesRefreshToken(refresh, remember);
}

/**
 * Validates the current active session, throwing an error if invalid.
 * @throws {Error}
 * @returns {Promise<IToken>}
 */
export async function validateSession() {
  const access = await getCookiesAccessToken();
  return await decodeAccessToken(access);
}

/**
 * Renews the current active session, setting the new access and refresh tokens.
 * @throws {Error}
 * @returns {Promise<void>}
 */
export async function refreshSession() {
  const refresh = await getCookiesRefreshToken();
  const { account, username, remember } = await decodeRefreshToken(refresh);
  if (await validateRefreshToken(account, username, refresh)) {
    await createSession(account, username, remember);
  } else {
    throw new Error('Unable to validate refresh token.');
  }
}

/**
 * Deletes the current active session, clearing the user's session.
 * @throws {Error}
 * @returns {Promise<void>}
 */
export async function deleteSession() {
  const access = await getCookiesAccessToken();
  const refresh = await getCookiesRefreshToken();
  const { account, username } = await decodeAccessToken(access);
  await unassignRefreshToken(account, username, refresh);
  await deleteCookiesAccessToken();
  await deleteCookiesRefreshToken();
}
