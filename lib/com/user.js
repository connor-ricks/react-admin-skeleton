import 'server-only';
import IUser from '@models/user';

/**
 * Retrieves the user information from the COM using the current session.
 * @param {string} account
 * @param {string} user
 * @returns {Promise<IUser>}
 */
export async function getUser(account, user) {
  // Replace this with actual user retrieval logic from the COM.
  return {
    username: 'Oshytoshy',
    name: 'Deborah Ricks',
    email: 'deborah.ricks@gmail.com',
  };
}
