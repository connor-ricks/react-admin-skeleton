import 'server-only';
import ICompany from '@models/company';

/**
 * Retrieves the company information from the COM.
 * @returns {Promise<ICompany>}
 */
export async function getCompany() {
  // Replace this with actual company retrieval logic from the COM.
  return {
    name: '🍛 Curry Couriers',
    address: {
      street: '123 Main St',
      street2: undefined,
      city: 'Anytown',
      state: 'CA',
      zip: '12345',
    },
    contact: {
      primary: 'Admin',
      secondary: undefined,
      phone: '(555) 555-5555',
      fax: undefined,
      email: 'admin@currycouriers.com',
    },
  };
}
