import 'server-only';
import { getDB } from '@com/utilities/db';
import IVersion from '@models/version';

/**
 * Retrieves the version information from the COM.
 * @returns {Promise<IVersion>}
 */
export async function getVersion() {
  // TODO: <Deborah> Replace this function with actual fetching of version data from the database.
  const data = await getDB();
  return {
    com: data.com,
    site: data.site,
  };
}
