import { IPermissionValue } from '@models/permission';
import IUser from '@models/user';

/**
 * Returns true if the provided user has any of the provided permissions.
 * @param {IUser} user - The user to check for permissions.
 * @param {Array<IPermissionValue>} permissions - The permissions that would provide access.
 * @returns {boolean}
 */
export function userHasPermission(user, permissions) {
  return permissions.some((permission) => user?.permissions[permission.key]);
}
