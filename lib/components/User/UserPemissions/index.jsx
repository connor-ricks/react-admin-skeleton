'use client';
import React from 'react';
import { Button, Group, Stack, Title, Table } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';

import IUser from '@models/user';
import IPermission from '@models/permission';
import { userHasPermission } from '@server/authentication/permissions';
import UserPermissionsRow from '../UserPermissionsRow';

/**
 * A table that displays all the permissions for a user.
 * @param {Object} props - The props for the component.
 * @param {IUser} props.self - The current user.
 * @param {IUser} props.user - The user currently being viewed.
 * @returns {React.ReactNode}
 */
export default function UserPermissions({ self, user }) {
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

  const rows = Object.keys(IPermission).map((key) => {
    return (
      <UserPermissionsRow key={key} permission={IPermission[key]} user={user} />
    );
  });

  return (
    <Stack>
      <Group justify="space-between">
        <Title order={3}>Permissions</Title>
        {canSelfManageThisUser ? (
          <Button size="xs" leftSection={<IconEdit size={18} />}>
            Edit
          </Button>
        ) : null}
      </Group>
      <Table>
        <Table.Thead>
          <Table.Tr pb="xs">
            <Table.Th>Key</Table.Th>
            <Table.Th>Description</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Stack>
  );
}
