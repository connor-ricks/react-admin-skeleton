import 'server-only';
import { getDB, setDB } from '@com/utilities/db';

/**
 * Checks if the provided credentials are valid.
 * @param {string} account
 * @param {string} username
 * @param {string} password
 * @throws {Error}
 * @returns {Promise<boolean>}
 */
export async function validateCredentials(account, username, password) {
  // TODO: <Deborah> Replace this with a COM call that validates the credentials.
  //                 Maybe the database stores the hash, and this program creates it.
  let data = await getDB();
  const credentials = data.credentials;
  return (
    credentials &&
    credentials[account] &&
    credentials[account][username] &&
    credentials[account][username] === password
  );
}

/**
 * Checks if the refresh token for the user is valid.
 * @param {string} account
 * @param {string} username
 * @param {string} token
 * @throws {Error}
 * @returns {Promise<boolean>}
 */
export async function validateRefreshToken(account, username, token) {
  // TODO: <Deborah> Replace this with a COM call that validates the refresh token for the provided
  //                 credentials. The database should store multiple refresh tokens so users can be
  //                 logged in from multiple devices.
  let data = await getDB();
  return (
    data.users &&
    data.users[account] &&
    data.users[account][username] &&
    data.users[account][username].token === token
  );
}

/**
 * Assigns a new refresh token to the user.
 * @param {string} account
 * @param {string} username
 * @param {string} token
 * @throws {Error}
 * @returns {Promise<void>}
 */
export async function assignRefreshToken(account, username, token) {
  // TODO: <Deborah> Replace this with a COM call that stores the refresh token for the provided
  //                 credentials. The database should store multiple refresh tokens so users can be
  //                 logged in from multiple devices.
  let data = await getDB();
  data.users = data.users ?? {};
  data.users[account] = data.users[account] ?? {};
  data.users[account][username] = data.users[account][username] ?? {};
  data.users[account][username].token = token;
  await setDB(data);
}

/**
 * Unassigns a refresh token from the user.
 * @param {string} account
 * @param {string} username
 * @param {string} token
 * @throws {Error}
 * @returns {Promise<void>}
 */
export async function unassignRefreshToken(account, username, token) {
  // TODO: <Deborah> Replace this with a COM call that deletes the refresh token for the provided
  //                 credentials. The database should store multiple refresh tokens so users can be
  //                 logged in from multiple devices.
  let data = await getDB();
  if (data?.users?.[account]?.[username]?.token !== undefined) {
    delete data.users[account][username].token;
  }
  await setDB(data);
}

/**
 * Checks if the API key is valid.
 * @param {string} key
 * @throws {Error}
 * @returns {Promise<boolean>}
 */
export async function validateAPIKey(key) {
  // Replace this with a COM call that checks the API key exists and is valid.
  let data = await getDB();
  return key in data.keys;
}
