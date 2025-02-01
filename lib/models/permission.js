/**
 * Represents a permission value, including its key and description.
 * @interface
 */
export class IPermissionValue {
  /** @type {string} - The unique identifier for the permission. */
  key;
  /** @type {string} - The description for the permission. */
  description;
}

/**
 * A mapping of predefined permission keys to their values.
 * This ensures that every key is dynamically inferred from the `IPermission` object.
 * @typedef {Record<keyof typeof IPermission, IPermissionValue>}
 */
const IPermission = {
  ADMIN: {
    key: 'admin',
    description: 'Full access to all permission. (Cannot be deleted)',
  },
  USERS_MANAGE: {
    key: 'users.manage',
    description:
      'Create, edit and delete users associated with this account. (Cannot create, edit or delete admins.)',
  },
  ACCOUNT_METADATA_EDIT: {
    key: 'account.metadata.edit',
    description: 'View and edit the metadata associated with this account.',
  },
  SELF_METADATA_EDIT: {
    key: 'self.metadata.edit',
    description: 'Edit their own metadata. (name, username, email etc...)',
  },
};

export default IPermission;
