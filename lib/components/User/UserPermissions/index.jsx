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
 * @param {boolean} props.isSelf - A boolean stating whether or not the user is viewing themselves.
 * @param {boolean} props.canSelfManageUser - A boolean stating whether or not the user can manage the user being viewed.
 * @param {IUser} props.user - The user currently being viewed.
 * @returns {React.ReactNode}
 */
export default function UserPermissions({ isSelf, canSelfManageUser, user }) {
  const rows = Object.keys(IPermission).map((key) => {
    return (
      <UserPermissionsRow key={key} permission={IPermission[key]} user={user} />
    );
  });

  return (
    <Stack>
      <Group justify="space-between">
        <Title order={3}>Permissions</Title>
        {canSelfManageUser ? (
          <Button size="xs" leftSection={<IconEdit size={18} />}>
            Edit
          </Button>
        ) : null}
      </Group>
      <Table>
        <Table.Thead>
          <Table.Tr pb="xs">
            <Table.Th>Name</Table.Th>
            <Table.Th>Description</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Stack>
  );
}
