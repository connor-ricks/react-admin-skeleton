import 'server-only';
import { getDB, setDB } from '@com/utilities/db';
import PermissionsError from '@models/permissions-error';
import { deleteSession, validateSession } from '@server/authentication/session';

import IUser from '@models/user';
import IPermission from '@models/permission';
import { userHasPermission } from '@server/authentication/permissions';
import { logout } from '@server/actions/authentication';
import { redirect } from 'next/navigation';

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
      IPermission.OWNER,
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
      IPermission.OWNER,
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

/**
 * Adds a new user to the account using the current session.
 * @param {Object} props - The props for the function.
 * @param {string} props.firstName - The first name of the user to add.
 * @param {string} props.lastName - The last name of the user to add.
 * @param {string} props.username - The username of the user to add.
 * @param {string} props.email - The email of the user to add.
 * @param {string} props.password - The password of the user to add.
 * @param {Object} props.permissions - The permissions of the user to add.
 * @throws {Error} If the current session does not have permission to create other users.
 * @returns {Promise<IUser | undefined>}
 */
export async function createUser({
  firstName,
  lastName,
  username,
  email,
  password,
  permissions,
}) {
  const token = await validateSession();

  // TODO: <Deborah> Replace this function with actual fetching of current user data from the database.
  const data = await getDB();
  const currentUser = data.users[token.account][token.username].metadata;

  if (
    userHasPermission(currentUser, [
      IPermission.OWNER,
      IPermission.USERS_MANAGE,
    ])
  ) {
    if (data.users[token.account]?.[username] === undefined) {
      // Define the new user.
      const user = {
        metadata: {
          account: token.account,
          username,
          name: `${firstName} ${lastName}`.trim(),
          email,
          permissions,
        },
      };

      // Set the user data.
      data.users[token.account][username] = user;
      // Set the credentials
      data.credentials[token.account][username] = password;
      await setDB(data);

      return user.metadata;
    } else {
      throw new PermissionsError('A user with that username already exists.');
    }
  } else {
    throw new PermissionsError('You do not have permission to add users.');
  }
}

/**
 * Deletes users from the account using the current session.
 * @param {Array<string>} usernames - The usernames of the users to delete.
 * @throws {Error} If the current session does not have permission to delete other users.
 * @returns {Promise<void>}
 */
export async function deleteUsers(usernames) {
  const token = await validateSession();

  // TODO: <Deborah> Replace this function with actual fetching of current user data from the database.
  const data = await getDB();
  const currentUser = data.users[token.account][token.username].metadata;

  if (
    userHasPermission(currentUser, [
      IPermission.OWNER,
      IPermission.USERS_MANAGE,
    ])
  ) {
    for (const username of usernames) {
      if (
        data.users[token.account][username]?.metadata?.permissions?.[
          IPermission.OWNER.key
        ]
      ) {
        throw new PermissionsError('You cannot delete an owner user.');
      }
    }

    for (const username of usernames) {
      delete data.users[token.account][username];
      delete data.credentials[token.account][username];
    }

    await setDB(data);
  } else {
    throw new PermissionsError('You do not have permission to delete users.');
  }
}

/**
 * Resets the password for a user using the current session.
 * @param {string} username - The username of the users to reset.
 * @throws {Error} If the current session does not have permission to reset the password.
 * @returns {Promise<void>}
 */
export async function resetPassword(username, password) {
  const token = await validateSession();

  // TODO: <Deborah> Replace this function with actual fetching of current user data from the database.
  const data = await getDB();
  const currentUser = data.users[token.account][token.username].metadata;
  const isSelf = username === token.username;
  const selfHasPermissionsToManageUsers = userHasPermission(currentUser, [
    IPermission.OWNER,
    IPermission.USERS_MANAGE,
  ]);

  if (isSelf || selfHasPermissionsToManageUsers) {
    data.credentials[token.account][username] = password;
    if (isSelf) {
      // If the password is being reset for the current user, delete the session
      await deleteSession();
      redirect('/login');
    } else {
      // If the password is being reset for another user, remove their refresh token
      // to force them to reauthenticate after expiry.
      data.users[token.account][username].token = null;
    }
    await setDB(data);
  } else {
    throw new PermissionsError(
      'You do not have permission to reset the password.'
    );
  }
}
