import IAddress from '@models/address';
import IContact from '@models/contact';

/**
 * Represents the company.
 * @interface
 */
export default class ICompany {
  /**
   * The name of the company.
   * @type {string}
   */
  name;

  /**
   * The address of the company.
   * @type {IAddress}
   */
  address;

  /**
   * The contact information for the company.
   * @type {IContact}
   */
  contact;
}
