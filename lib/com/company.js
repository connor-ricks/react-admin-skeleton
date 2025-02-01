import 'server-only';
import { getDB } from '@com/utilities/db';
import ICompany from '@models/company';

/**
 * Retrieves the company information from the COM.
 * @returns {Promise<ICompany>}
 */
export async function getCompany() {
  // TODO: <Deborah> Replace this function with actual fetching of user data from the database.
  const data = await getDB();
  return data.company.metadata;
}
