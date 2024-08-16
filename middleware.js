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

export default async function middleware(request) {
  try {
    const cookies = await authenticate(request);
    const response = next(request, true);
    if (cookies) {
      response.headers.set('Set-Cookie', cookies);
    }
    return response;
  } catch (error) {
    const response = next(request, false);
    return response;
  }
}

function next(request, isAuthenticated) {
  const isPathLogin = request.nextUrl.pathname === '/login';
  switch (`${isPathLogin}-${isAuthenticated}`) {
    case 'true-true':
      return NextResponse.redirect(new URL('/', request.nextUrl));
    case 'false-false':
      return NextResponse.redirect(new URL('/login', request.nextUrl));
    case 'true-false':
      return NextResponse.next();
    case 'false-true':
      return NextResponse.next();
  }
}

async function authenticate(request) {
  try {
    const access = request.cookies.get(COOKIES_ACCESS_TOKEN_KEY).value;
    await decodeAccessToken(access);
    return null;
  } catch (error) {
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
    }

    return response.ok ? response.headers.get('Set-Cookie') : null;
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|favicon.svg|sitemap.xml|robots.txt).*)',
  ],
};
