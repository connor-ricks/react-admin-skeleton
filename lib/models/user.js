import IPermission, { IPermissionValue } from '@models/permission';

/**
 * Represents a user associated with an account.
 * @interface
 */
export default class IUser {
  /**
   * The account the user belongs to.
   * @type {string}
   */
  account;

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

  /**
   * The permissions associated with the user.
   * @type {Map<typeof IPermission[keyof typeof IPermission], IPermissionValue>}
   */
  permissions;
}
