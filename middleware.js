import 'server-only';
import { NextResponse } from 'next/server';
import { activeSession } from 'app/authentication/session';

const publicRoutes = ['/login'];

export default async function middleware(request) {
  const path = request.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(path);
  const session = await activeSession();

  if (session && path === '/login') {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  } else if (!session && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  } else {
    return NextResponse.next();
  }
}

// Added to bottom of middleware.ts
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
