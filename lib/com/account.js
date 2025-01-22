import 'server-only';
import IAccount from '@models/account';

/**
 * Retrieves the user information from the COM using the current session.
 * @param {string} account
 * @returns {Promise<IAccount>}
 */
export async function getAccount(account) {
  // Replace this with actual account retrieval logic from the COM.
  return {
    number: '01234',
    name: 'Currylicious',
    createdAt: new Date('2024-11-18T15:30:00'),
    accountAddress: {
      street: '123 Main St',
      street2: undefined,
      city: 'Anytown',
      state: 'CA',
      zip: '12345',
    },
    accountContact: {
      primary: 'Deborah Ricks',
      secondary: undefined,
      phone: '(555) 555-5555',
      fax: undefined,
      email: 'admin@currylicious.com',
    },
    billingAddress: undefined,
    billingContact: undefined,
  };
}
