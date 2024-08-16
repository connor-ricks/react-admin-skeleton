'use server';
import { redirect } from 'next/navigation';
import { validateCredentials } from '@com/authentication';
import {
  ServerActionResponse,
  ServerActionError,
  asServerAction,
} from '@server/actions/utilities';
import {
  createSession,
  deleteSession,
  refreshSession,
} from '@server/authentication/session';

// Attempts to log the user in, creating a session if successful and redirecting to the home page.
export const login = asServerAction(
  async (account, username, password, remember) => {
    if (await validateCredentials(account, username, password)) {
      await createSession(account, username, remember);
      redirect('/');
    } else {
      throw new ServerActionError('Unable to verify credentials.');
    }
  }
);

// Attempts to refresh the user's session, redirecting to the login page if unsuccessful.
export const refresh = asServerAction(async () => {
  try {
    await refreshSession();
    return ServerActionResponse.success();
  } catch (error) {
    redirect('/login');
  }
});

// Attempts to log the user out, deleting the session and redirecting to the login page.
export const logout = asServerAction(async () => {
  await deleteSession();
  redirect('/login');
});
