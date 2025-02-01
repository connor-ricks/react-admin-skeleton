import 'server-only';
import { getDB } from '@com/utilities/db';
import { validateSession } from '@server/authentication/session';

import IAccount from '@models/account';

/**
 * Retrieves the account information for the current user from the COM.
 * @throws {Error} If the current session isn't valid.
 * @returns {Promise<IAccount>}
 */
export async function getAccount() {
  const token = await validateSession();
  // TODO: <Deborah> Replace this function with actual fetching of user data from the database.
  const data = await getDB();
  return data.accounts[token.account].metadata;
}
