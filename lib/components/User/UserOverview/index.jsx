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
 * @param {boolean} props.isSelf - A boolean stating whether or not the user is viewing themselves.
 * @param {boolean} props.canSelfManageUser - A boolean stating whether or not the user can manage the user being viewed.
 * @param {IUser} props.user - The user currently being viewed.
 * @returns {React.ReactNode}
 */
export default function UserOverview({ isSelf, canSelfManageUser, user }) {
  return (
    <Group gap="xl" justify="space-between" align="top">
      <Group>
        <Avatar size={48} variant="filled" color="initials" name={user.name} />
        <Stack gap={0}>
          <Group>
            <Text size="xl">{user.name}</Text>
            {isSelf ? (
              <Badge variant="light">You</Badge>
            ) : user.permissions[IPermission.OWNER.key] ? (
              <Badge color="red">Owner</Badge>
            ) : null}
          </Group>
          <Text size="md" color="dimmed">
            {user.email}
          </Text>
          <Text size="sm" color="dimmed">
            {user.username}
          </Text>
        </Stack>
      </Group>
      {canSelfManageUser ? (
        <Button size="xs" leftSection={<IconEdit size={18} />}>
          Edit
        </Button>
      ) : null}
    </Group>
  );
}
