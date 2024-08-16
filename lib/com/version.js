import 'server-only';
import IVersion from '@models/version';

/**
 * Retrieves the version information from the COM.
 * @returns {Promise<IVersion>}
 */
export async function getVersion() {
  // Replace this with actual version retrieval logic from the COM.
  return {
    com: '0.5.0',
    site: '0.1.3',
  };
}
