import 'server-only';
import fs from 'fs/promises';

// Temporary stored credentials since we don't have a COM.
const credentials = {
  account: 'account',
  username: 'username',
  password: 'password',
};

// Path to temporary DB since we don't have a COM.
const db = './lib/com/utilities/db.json';

// Get temporary DB since we don't have a COM.
async function getDB() {
  const raw = await fs.readFile(db, 'utf-8');
  const data = JSON.parse(raw);
  return data;
}

// Set temporary DB since we don't have a COM.
async function setDB(data) {
  const raw = JSON.stringify(data);
  await fs.writeFile(db, raw);
}

/**
 * Checks if the provided credentials are valid.
 * @param {string} account
 * @param {string} username
 * @param {string} password
 * @throws {Error}
 * @returns {Promise<boolean>}
 */
export async function validateCredentials(account, username, password) {
  // Replace this with a COM call that validates the credentials.
  return (
    credentials.account == account &&
    credentials.username == username &&
    credentials.password == password
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
  // Replace this with a COM call that checks the refresh token exists and is valid.
  // - May need to store multiple refresh tokens for multiple devices being logged in at the same time.
  let data = await getDB();
  const key = `${account}-${username}`;
  // Return whether the token exists in the user's tokens.
  return key in data.users && token in data.users[key].tokens;
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
  // Replace this with a COM call that adds the refresh token to the database for the provided username.
  let data = await getDB();
  const key = `${account}-${username}`;
  data.users[key] = data.users[key] || { tokens: {} };
  data.users[key].tokens[token] = true;
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
  // Replace this with a COM call that deletes the refresh token from the database.
  let data = await getDB();
  const key = `${account}-${username}`;
  delete data.users[key].tokens[token];
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
