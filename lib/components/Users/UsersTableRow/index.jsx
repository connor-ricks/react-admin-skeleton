'use client';
import React from 'react';
import {
  Anchor,
  Badge,
  Checkbox,
  Group,
  Table,
  Text,
  Avatar,
} from '@mantine/core';

import IUser from '@models/user';
import { useRouter } from 'next/navigation';
import IPermission from '@models/permission';
/**
 * A row in the users table.
 * @param {Object} props - The props for the component.
 * @param {IUser} props.self - The current user.
 * @param {IUser} props.user - The user to render in the row.
 * @param {(boolean, IUser) => Void} props.onSelect - The function to call when the user is selected.
 * @param {boolean} props.isSelected - Whether the user is selected.
 * @returns {React.ReactNode}
 */
export default function UsersTableRow({ self, user, isSelected, onSelect }) {
  const router = useRouter();

  function onNavigateToUser() {
    router.push(`/users/${user.username}`);
  }

  return (
    <Table.Tr
      key={user.username}
      bg={isSelected ? 'var(--mantine-color-blue-light)' : undefined}
    >
      <Table.Td>
        <Checkbox
          aria-label="Select row"
          checked={isSelected}
          onChange={(event) => onSelect(event.currentTarget.checked, user)}
        />
      </Table.Td>
      <Table.Td>
        <Group wrap="nowrap">
          <Avatar
            size="md"
            variant="filled"
            color="initials"
            name={user.name}
          />
          <Anchor onClick={onNavigateToUser} underline="hover">
            <Text fw={500} style={{ whiteSpace: 'nowrap' }}>
              {user.name}
            </Text>
          </Anchor>
          {self.username === user.username ? (
            <Badge size="sm" variant="light" style={{ flexShrink: 0 }}>
              You
            </Badge>
          ) : user.permissions[IPermission.OWNER.key] ? (
            <Badge size="sm" color="red" style={{ flexShrink: 0 }}>
              Owner
            </Badge>
          ) : null}
        </Group>
      </Table.Td>
      <Table.Td>{user.username}</Table.Td>
      <Table.Td>
        <Text c="dimmed">{user.email.toLowerCase()}</Text>
      </Table.Td>
      <Table.Td>
        <Badge
          style={{ cursor: 'pointer' }}
          variant="light"
          onClick={onNavigateToUser}
        >
          {Object.keys(user.permissions).length} Permissions
        </Badge>
      </Table.Td>
    </Table.Tr>
  );
}
