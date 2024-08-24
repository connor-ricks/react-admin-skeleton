import 'server-only';
import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
import {
  assignRefreshToken,
  unassignRefreshToken,
  validateRefreshToken,
} from 'app/com';

const secret = process.env.AUTHENTICATION_SECRET;

const refreshTokenKey = 'session.refresh_token';
const refreshTokenAge = 7 * 24 * 60 * 60; // 7 Day Refresh Expiration.

const accessTokenKey = 'session.access_token';
const accessTokenAge = 60 * 60; // 1 Hour Access Expiration.

/// Creates an active session for the provided username.
export async function createSession(username, remember) {
  async function sign(payload, age) {
    const now = Math.floor(Date.now() / 1000);
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      .setExpirationTime(now + age)
      .setIssuedAt(now)
      .setNotBefore(now)
      .sign(new TextEncoder().encode(secret));

    cookies().set(payload.type, token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: remember ? age : 0,
      path: '/',
    });

    return token;
  }

  const accessToken = await sign(
    { username, type: accessTokenKey },
    accessTokenAge
  );

  const refreshToken = await sign(
    { username, type: refreshTokenKey },
    refreshTokenAge
  );

  assignRefreshToken(username, refreshToken);
}

/// Returns the decoded active session if one exists or null.
export async function activeSession() {
  try {
    const accessToken = cookies().get(accessTokenKey)?.value;
    if (accessToken == null) {
      return null;
    }

    const { payload } = await jwtVerify(
      accessToken,
      new TextEncoder().encode(secret)
    );

    if (payload.type !== accessTokenKey) {
      console.error('Token type was not an access token!');
      return null;
    }

    return payload;
  } catch (error) {
    console.error(error);
    return null;
  }
}

/// Renews the current active session, if one exists.
/// (Returns a Boolean that provides context of whether or not the refresh succeeded or not.)
export async function refreshSession() {
  const refreshToken = cookies().get(refreshTokenKey).value;
  const { payload } = await jwtVerify(
    refreshToken,
    new TextEncoder().encode(secret)
  );

  if (payload.type !== refreshTokenKey) {
    console.error('Token type was not a refresh token!');
    return false;
  }

  if (validateRefreshToken(username, refreshToken)) {
    await createSession(payload.username, payload.remember);
    return true;
  } else {
    return false;
  }
}

/// Removes existing refresh tokens from the database and clears the user's session.
export async function deleteSession() {
  const accessToken = cookies().get(accessTokenKey).value;
  cookies().delete(accessTokenKey);
  cookies().delete(refreshTokenKey);

  try {
    const { payload } = await jwtVerify(
      accessToken,
      new TextEncoder().encode(secret)
    );
    unassignRefreshToken(payload.username);
  } catch (error) {}
}
