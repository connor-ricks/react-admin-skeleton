/**
 * Represents a permission value, including its key and description.
 * @interface
 */
export class IPermissionValue {
  /** @type {string} - The unique identifier for the permission. */
  key;
  /** @type {string} - The name of the permission. */
  name;
  /** @type {string} - The description for the permission. */
  description;
}

/**
 * A mapping of predefined permission keys to their values.
 * This ensures that every key is dynamically inferred from the `IPermission` object.
 * @typedef {Record<keyof typeof IPermission, IPermissionValue>}
 */
const IPermission = {
  OWNER: {
    key: 'owner',
    name: 'Owner',
    description: 'Full access to all permission. (Cannot be deleted)',
  },
  USERS_MANAGE: {
    key: 'users.manage',
    name: 'Manage Users',
    description:
      'Create, edit and delete users associated with this account. (Cannot create, edit or delete owners.)',
  },
  ACCOUNT_METADATA_EDIT: {
    key: 'account.metadata.edit',
    name: 'Manage Account Information',
    description: 'View and edit the metadata associated with this account.',
  },
  SELF_METADATA_EDIT: {
    key: 'self.metadata.edit',
    name: 'Manage Personal Information',
    description: 'Edit their own metadata. (name, username, email etc...)',
  },
};

export default IPermission;
