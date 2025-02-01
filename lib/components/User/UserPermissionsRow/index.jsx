'use client';
import React from 'react';
import { Badge, Text, Table } from '@mantine/core';

import IUser from '@models/user';
import { IPermissionValue } from '@models/permission';
import { userHasPermission } from '@server/authentication/permissions';

/**
 * A table row that displays a single user permission.
 * @param {Object} props - The props for the component.
 * @param {IPermissionValue} props.permission - The permission for the row.
 * @param {IUser} props.user - The user currently being viewed.
 * @returns {React.ReactNode}
 */
export default function UserPermissionsRow({ permission, user }) {
  const hasPermission = userHasPermission(user, [permission]);
  return (
    <Table.Tr key={permission.key}>
      <Table.Td>
        <Badge
          style={{ display: 'inline-block' }}
          color={hasPermission ? 'teal' : 'red'}
          variant={hasPermission ? 'filled' : 'outline'}
        >
          {permission.key}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Text c="dimmed">{permission.description}</Text>
      </Table.Td>
    </Table.Tr>
  );
}
