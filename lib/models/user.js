/**
 * Represents a user associated with an account.
 * @interface
 */
export default class IUser {
  /**
   * The unique identifier for the user.
   * @type {string}
   */
  username;

  /**
   * The name of the user.
   * @type {string}
   */
  name;

  /**
   * The email address of the user.
   * @type {string}
   */
  email;
}
