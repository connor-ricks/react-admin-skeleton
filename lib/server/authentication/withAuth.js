import 'server-only';
import { NextResponse } from 'next/server';
import { validateAPIKey } from '@com/authentication';
import { validateSession } from '@server/authentication/session';

// Wraps an api route in an auth check that validates either an api key or a session exist.
export function withAuth(handler) {
  return async function (request, ...args) {
    const url = new URL(request.url);
    const key = url.searchParams.get('api_key') ?? null;
    if ((await isValidSession()) || (await isValidAPIKey(key))) {
      return handler(request, ...args);
    }

    return new NextResponse(null, { status: 401 });
  };
}

/**
 * Returns true if there is a valid session.
 * @returns {Promise<boolean>}
 */
async function isValidSession() {
  try {
    await validateSession();
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Returns true if there is a valid api key.
 * @param {string} key
 * @returns {Promise<boolean>}
 */
async function isValidAPIKey(key) {
  try {
    return await validateAPIKey(key);
  } catch (error) {
    return false;
  }
}
