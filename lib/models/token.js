/**
 * Represents an authentication token
 * @interface
 * @extends import("jose").JWTPayload
 */
export default class IToken {
  /**
   * The account associated with the token.
   * @type {string}
   */
  account;

  /**
   * The username associated with the token.
   * @type {string}
   */
  username;

  /**
   * Whether the token should be remembered or not.
   * @type {boolean}
   */
  shouldRemember;

  /**
   * The type of token.
   * @type {string}
   */
  type;
}
