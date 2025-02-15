'use server';
import {
  ServerActionResponse,
  asServerAction,
} from '@server/actions/utilities';
import { createUser, deleteUsers, resetPassword } from '@com/users';

// Attempts to add a new user to the account.
export const addUser = asServerAction(
  async ({ firstName, lastName, username, email, password, permissions }) => {
    const user = await createUser({
      firstName,
      lastName,
      username,
      email,
      password,
      permissions,
    });

    return ServerActionResponse.success({ payload: user });
  }
);

// Attempts to remove a user from the account.
export const removeUsers = asServerAction(async (usernames) => {
  await deleteUsers(usernames);
  return ServerActionResponse.success();
});

/// Attempts to change the password of a user.
export const changePassword = asServerAction(async (username, password) => {
  await resetPassword(username, password);
  return ServerActionResponse.success();
});
