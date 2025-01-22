import 'server-only';

import { NextResponse } from 'next/server';

import {
  COOKIES_ACCESS_TOKEN_KEY,
  COOKIES_REFRESH_TOKEN_KEY,
} from '@server/authentication/cookies';
import {
  decodeAccessToken,
  decodeRefreshToken,
} from '@server/authentication/jwt';

import ISession from '@models/session';

export default async function middleware(request) {
  try {
    const { cookies = undefined, session } = await authenticate(request);

    const response = next(request, true, session);
    if (cookies) {
      response.headers.set('Set-Cookie', cookies);
    }

    return response;
  } catch (error) {
    const response = next(request, false, undefined);
    return response;
  }
}

/**
 * Moves the request onwards to the next appropriate route.
 * @param {import('next/server').NextRequest} request
 * @param {boolean} isAuthenticated
 * @param {ISession | undefined} session
 * @returns  {import('next/server').NextResponse}
 */
function next(request, isAuthenticated, session) {
  const headers = new Headers(request.headers);

  if (session) {
    // This allows us to pass critical information in cases where the middleware
    // has just refreshed and thew new session is not yet available on this current request.
    // These headers are only available on the server side and pass information to the server component.
    headers.set('session', JSON.stringify(session));
  }

  const isPathLogin = request.nextUrl.pathname === '/login';
  switch (`${isPathLogin}-${isAuthenticated}`) {
    case 'true-true':
      return NextResponse.redirect(new URL('/', request.nextUrl));
    case 'false-false':
      return NextResponse.redirect(new URL('/login', request.nextUrl));
    case 'true-false':
      // return NextResponse.next();
      return NextResponse.next({ request: { headers } });
    case 'false-true':
      // return NextResponse.next();
      return NextResponse.next({ request: { headers } });
  }
}

/**
 * Validates the session and attempts to refresh it if necessary.
 * @param {import('next/server').NextRequest} request
 * @returns {Promise<{ cookies: string | undefined, session: ISession}>} info
 */
async function authenticate(request) {
  try {
    // Validate current session.
    const access = request.cookies.get(COOKIES_ACCESS_TOKEN_KEY).value;
    const token = await decodeAccessToken(access);
    return {
      cookies: undefined,
      session: {
        account: token.account,
        username: token.username,
      },
    };
  } catch (error) {
    // Attempt to refresh session.
    const refresh = request.cookies.get(COOKIES_REFRESH_TOKEN_KEY)?.value;
    const token = await decodeRefreshToken(refresh);
    const url = `${request.nextUrl.origin}/api/auth/refresh`;
    const response = await fetch(url, {
      method: 'POST',
      headers: new Headers(request.headers),
      credentials: 'same-origin',
    });

    if (!response.ok) {
      throw new Error('Failed to refresh session');
    } else {
      return {
        cookies: response.headers.get('Set-Cookie'),
        session: {
          account: token.account,
          username: token.username,
        },
      };
    }
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|favicon.svg|sitemap.xml|robots.txt).*)',
  ],
};
