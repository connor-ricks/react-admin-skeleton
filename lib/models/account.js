import IAddress from '@models/address';
import IContact from '@models/contact';

/**
 * Represents a customer account.
 * @interface
 */
export default class IAccount {
  /**
   * The account number for the account.
   * @type {string}
   */
  number;

  /**
   * The name of the account.
   * @type {string}
   */
  name;

  /**
   * The date when the account was created.
   * @type {Date}
   */
  createdAt;

  /**
   * The address associated with the account.
   * @type {IAddress}
   */
  accountAddress;

  /**
   * The contact information associated with the account.
   * @type {IContact}
   */
  accountContact;

  /**
   * The billing address associated with the account.
   * @type {IAddress | undefined}
   * @default undefined
   */
  billingAddress;

  /**
   * The contact information associated with the billing address.
   * @type {IContact | undefined}
   * @default undefined
   */
  billingContact;
}
