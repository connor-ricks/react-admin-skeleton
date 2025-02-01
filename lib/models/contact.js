/**
 * Represents a contact person or department.
 * @interface
 */
export default class IContact {
  /**
   * The primary contact's name.
   * @type {string}
   */
  primary;

  /**
   * The secondary contact's name.
   * @type {string | undefined}
   * @default undefined
   */
  secondary;

  /**
   * The phone number associated with the contact.
   * @type {string | undefined}
   * @default undefined
   */
  phone;

  /**
   * The fax number associated with the contact.
   * @type {string | undefined}
   * @default undefined
   */
  fax;

  /**
   * The email address associated with the contact.
   * @type {string | undefined}
   * @default undefined
   */
  email;
}
