'use client';
import React, { useState } from 'react';
import { Button, Group } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { logout } from '@server/actions/authentication';

import IUser from '@models/user';
import {
  IconLock,
  IconLogout,
  IconPassword,
  IconTrash,
} from '@tabler/icons-react';
import { removeUsers } from '@server/actions/users';
import { useRouter } from 'next/navigation';
import ResetPasswordModal from '../ResetPasswordModal';

/**
 * Displays available management options for user.
 * @param {Object} props - The props for the component.
 * @param {boolean} props.isSelf - A boolean stating whether or not the user is viewing themselves.
 * @param {boolean} props.canSelfManageUser - A boolean stating whether or not the user can manage the user being viewed.
 * @param {IUser} props.user - The user currently being viewed.
 * @returns {React.ReactNode}
 */
export default function UserManagement({ isSelf, canSelfManageUser, user }) {
  const router = useRouter();
  const [isDeletingUser, setDeletingUser] = useState(false);
  const [isResettingPassword, setResettingPassword] = useState(false);

  async function onDeleteUser() {
    setDeletingUser(true);
    const response = await removeUsers([user.username]);
    if (response.success) {
      notifications.show({
        position: 'top-right',
        title: 'Users deleted',
        message: 'Users have been deleted successfully.',
        color: 'teal',
      });

      router.push('/users');
    } else {
      notifications.show({
        position: 'top-right',
        title: 'Unable to delete users',
        message: response.message,
        color: 'red',
      });
    }
    setDeletingUser(false);
  }

  return (
    <>
      <ResetPasswordModal
        opened={isResettingPassword}
        onClose={() => setResettingPassword(false)}
        isSelf={isSelf}
        user={user}
      />
      <Group justify="flex-end">
        {(canSelfManageUser && !isSelf) || isSelf ? (
          <>
            <Button
              color="yellow"
              leftSection={<IconLock size={18} />}
              onClick={() => setResettingPassword(true)}
            >
              Reset Password
            </Button>
          </>
        ) : null}
        {isSelf ? (
          <Button
            color="red"
            leftSection={<IconLogout size={18} />}
            onClick={() => logout()}
          >
            Sign Out
          </Button>
        ) : null}
        {canSelfManageUser && !isSelf ? (
          <Button
            color="red"
            leftSection={<IconTrash size={18} />}
            onClick={onDeleteUser}
          >
            Delete
          </Button>
        ) : null}
      </Group>
    </>
  );
}
