import 'server-only';
import {
  accessTokenAge,
  accessTokenKey,
  refreshTokenAge,
  refreshTokenKey,
} from '@authentication/constants';
import * as cookies from '@authentication/cookies';
import * as jwt from '@authentication/jwt';
import * as com from '@com/authentication';

// Creates an active session for the provided username.
export async function createSession(username, remember) {
  const accessToken = await jwt.signToken(
    { username, type: accessTokenKey },
    accessTokenAge
  );
  cookies.setAccessToken(accessToken, remember);

  const refreshToken = await jwt.signToken(
    { username, type: refreshTokenKey },
    refreshTokenAge
  );
  cookies.setRefreshToken(refreshToken, remember);

  com.assignRefreshToken(username, refreshToken);
}

// Returns the decoded active session if one exists or null.
export async function activeSession() {
  const accessToken = cookies.getAccessToken();
  const payload = await jwt.verifyToken(accessToken);
  if (payload == null) {
    return null;
  }

  if (payload.type !== accessTokenKey) {
    console.error('Token type was not an access token!');
    return null;
  }

  return payload;
}

// Renews the current active session, if one exists.
// (Returns a Boolean that provides context of whether or not the refresh succeeded or not.)
export async function refreshSession() {
  const refreshToken = cookies.getRefreshToken();
  const payload = await jwt.verifyToken(refreshToken);
  if (payload == null) {
    return false;
  }

  if (payload.type !== refreshTokenKey) {
    console.error('Token type was not a refresh token!');
    return false;
  }

  if (com.validateRefreshToken(username, refreshToken)) {
    await createSession(payload.username, payload.remember);
    return true;
  } else {
    return false;
  }
}

// Removes existing refresh tokens from the database and clears the user's session.
export async function deleteSession() {
  const accessToken = cookies.getAccessToken();
  const payload = await jwt.verifyToken(accessToken);
  com.unassignRefreshToken(payload.username);
  cookies.deleteAccessToken();
  cookies.deleteRefreshToken();
}
