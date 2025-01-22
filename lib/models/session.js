/**
 * Represents a session passed from the middleware to the server.
 * @interface
 */
export default class ISession {
  /**
   * The account number that the user belongs to.
   * @type {string}
   */
  account;

  /**
   * The username of the user.
   * @type {string}
   */
  username;
}
