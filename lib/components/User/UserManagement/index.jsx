'use client';
import React from 'react';
import { Button, Group } from '@mantine/core';
import { userHasPermission } from '@server/authentication/permissions';
import { logout } from '@server/actions/authentication';

import IUser from '@models/user';
import IPermission from '@models/permission';
import { IconLogout, IconTrash } from '@tabler/icons-react';

/**
 * Displays available management options for user.
 * @param {Object} props - The props for the component.
 * @param {IUser} props.self - The current user.
 * @param {IUser} props.user - The user currently being viewed.
 * @returns {React.ReactNode}
 */
export default function UserManagement({ self, user }) {
  // Check if the user being viewed is the current user.
  const isSelf = self.username === user.username;

  // Check if the current user has permission to manage other users.
  const canSelfManageUsers = userHasPermission(self, [
    IPermission.ADMIN,
    IPermission.USERS_MANAGE,
  ]);

  // Check if the user being viewed is an admin.
  const isThisUserAdmin = userHasPermission(user, [IPermission.ADMIN]);

  // Check if the current user can manage the user being viewed.
  const canSelfManageThisUser =
    canSelfManageUsers && !isSelf && !isThisUserAdmin;

  return (
    <Group justify="flex-end">
      {isSelf ? (
        <Button
          color="red"
          leftSection={<IconLogout size={18} />}
          onClick={() => logout()}
        >
          Sign Out
        </Button>
      ) : null}
      {canSelfManageThisUser ? (
        <Button color="red" leftSection={<IconTrash size={18} />}>
          Delete
        </Button>
      ) : null}
    </Group>
  );
}
