import 'server-only';
import { getDB } from '@com/utilities/db';
import PermissionsError from '@models/permissions-error';
import { validateSession } from '@server/authentication/session';

import IUser from '@models/user';
import IPermission from '@models/permission';
import { userHasPermission } from '@server/authentication/permissions';

/**
 * Retrieves all users information from the COM using the current session.
 * @throws {Error} If the current session does not have permission to view other users.
 * @returns {Promise<Array<IUser>>}
 */
export async function getUsers() {
  // Validate the current session, and get the current user.
  const currentUser = await getUser();

  if (
    userHasPermission(currentUser, [
      IPermission.ADMIN,
      IPermission.USERS_MANAGE,
    ])
  ) {
    // The user has permission to view other users, return the requested user.
    const data = await getDB();
    const keys = Object.keys(data.users[currentUser.account]);

    return keys.map((key) => {
      return data.users[currentUser.account][key].metadata;
    });
  } else {
    throw new PermissionsError(
      'You do not have permission to view other users.'
    );
  }
}

/**
 * Retrieves the user information from the COM using the current session.
 * @param {string | undefined} username - The username of the user to retrieve. If not provided, the current user's information is returned.
 * @throws {Error} If the current session does not have permission to view other users.
 * @returns {Promise<IUser | undefined>}
 */
export async function getUser(username = undefined) {
  const token = await validateSession();
  username = username ?? token.username;

  // TODO: <Deborah> Replace this function with actual fetching of current user data from the database.
  const data = await getDB();
  const currentUser = data.users[token.account][token.username].metadata;

  if (token.username === username) {
    // The user is asking for themselves, return them.
    return currentUser;
  } else if (
    userHasPermission(currentUser, [
      IPermission.ADMIN,
      IPermission.USERS_MANAGE,
    ])
  ) {
    // The user has permission to view other users, return the requested user.
    return data.users?.[token.account]?.[username]?.metadata;
  } else {
    throw new PermissionsError(
      'You do not have permission to view other users.'
    );
  }
}
