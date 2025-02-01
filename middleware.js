import 'server-only';

import { NextRequest, NextResponse } from 'next/server';

import {
  COOKIES_ACCESS_TOKEN_KEY,
  COOKIES_REFRESH_TOKEN_KEY,
} from '@server/authentication/cookies';
import {
  decodeAccessToken,
  decodeRefreshToken,
} from '@server/authentication/jwt';

export default async function middleware(request) {
  try {
    const result = await authenticate(request);
    const response = nextAuthenticated(request, result?.token);

    if (result?.cookies) {
      response.headers.set('Set-Cookie', result.cookies);
    }

    return response;
  } catch (error) {
    return nextUnauthenticated(request);
  }
}

/**
 * Moves the request onwards given that they are authenticated.
 * @param {NextRequest} request
 * @param {string | undefined} token
 * @returns  {NextResponse}
 */
function nextAuthenticated(request, token) {
  if (request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  } else {
    return NextResponse.next({ headers: { token } });
  }
}

/**
 * Moves the request onwards given that they are not authenticated.
 * @param {NextRequest} request
 * @returns  {NextResponse}
 */
function nextUnauthenticated(request) {
  if (request.nextUrl.pathname === '/login') {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }
}

/**
 * Validates the session and attempts to refresh it if necessary.
 * @param {NextRequest} request
 * @returns {Promise<{ cookies: string, token: string } | undefined>} info
 */
async function authenticate(request) {
  try {
    // Validate current session.
    const access = request.cookies.get(COOKIES_ACCESS_TOKEN_KEY).value;
    await decodeAccessToken(access);
    return undefined;
  } catch (error) {
    // Attempt to refresh session.
    const refresh = request.cookies.get(COOKIES_REFRESH_TOKEN_KEY)?.value;
    await decodeRefreshToken(refresh);
    const url = `${request.nextUrl.origin}/api/auth/refresh`;
    const response = await fetch(url, {
      method: 'POST',
      headers: new Headers(request.headers),
      credentials: 'same-origin',
    });

    if (!response.ok) {
      throw new Error('Failed to refresh session');
    } else {
      const body = await response.json();
      return {
        cookies: response.headers.get('Set-Cookie'),
        token: body.access,
      };
    }
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|favicon.svg|sitemap.xml|robots.txt).*)',
  ],
};
