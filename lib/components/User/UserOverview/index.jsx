'use client';
import React from 'react';
import { Avatar, Badge, Button, Group, Stack, Text } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';
import { userHasPermission } from '@server/authentication/permissions';
import IUser from '@models/user';
import IPermission from '@models/permission';

/**
 * Displays an overview of a user.
 * @param {Object} props - The props for the component.
 * @param {IUser} props.self - The current user.
 * @param {IUser} props.user - The user currently being viewed.
 * @returns {React.ReactNode}
 */
export default function UserOverview({ self, user }) {
  // Check if the user being viewed is the current user.
  const isSelf = self.username === user.username;

  // Check if the current user has permission to manage other users.
  const canSelfManageUsers = userHasPermission(self, [
    IPermission.ADMIN,
    IPermission.USERS_MANAGE,
  ]);

  // Check if the current user has permission to manage themselves.
  const canSelfManageSelf = userHasPermission(self, [
    IPermission.SELF_METADATA_EDIT,
  ]);

  // Check if the user being viewed is an admin.
  const isThisUserAdmin = userHasPermission(user, [IPermission.ADMIN]);

  // Check if the current user can manage the user being viewed.
  const canSelfManageThisUser =
    (canSelfManageUsers && !isThisUserAdmin) || (isSelf && canSelfManageSelf);

  return (
    <Group gap="xl" justify="space-between" align="top">
      <Group>
        <Avatar size={48} variant="filled" color="initials" name={user.name} />
        <Stack gap={0}>
          <Group>
            <Text size="xl">{user.name}</Text>
            {isSelf ? <Badge variant="light">You</Badge> : null}
          </Group>
          <Text size="md" color="dimmed">
            {user.email}
          </Text>
          <Text size="sm" color="dimmed">
            {user.username}
          </Text>
        </Stack>
      </Group>
      {canSelfManageThisUser ? (
        <Button size="xs" leftSection={<IconEdit size={18} />}>
          Edit
        </Button>
      ) : null}
    </Group>
  );
}
