import 'server-only';
import { cookies } from 'next/headers';
import {
  refreshTokenKey,
  refreshTokenAge,
  accessTokenKey,
  accessTokenAge,
} from './constants';

// Retrieves the access token from cookies.
export function getAccessToken() {
  const accessToken = cookies().get(accessTokenKey)?.value;
  return accessToken;
}

// Retrieves the refresh token from cookies.
export function getRefreshToken() {
  const refreshToken = cookies().get(refreshTokenKey)?.value;
  return refreshToken;
}

// Sets the access token to cookies.
export function setAccessToken(token, remember) {
  cookies().set(accessTokenKey, token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: remember ? accessTokenAge : 0,
    path: '/',
  });
}

// Sets the refresh token to cookies.
export function setRefreshToken(token, remember) {
  cookies().set(refreshTokenKey, token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: remember ? refreshTokenAge : 0,
    path: '/',
  });
}

// Deletes the access token from cookies.
export function deleteAccessToken() {
  cookies().delete(accessTokenKey);
}

// Deletes the refresh token from cookies.
export function deleteRefreshToken() {
  cookies().delete(refreshTokenKey);
}
