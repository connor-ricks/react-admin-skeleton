'use client';
import React, { useState } from 'react';
import {
  ActionIcon,
  Alert,
  Badge,
  Button,
  Checkbox,
  Divider,
  Group,
  Modal,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconInfoCircle, IconLock, IconX } from '@tabler/icons-react';
import IPermission from '@models/permission';
import { addUser, changePassword } from '@server/actions/users';
import IUser from '@models/user';

/**
 * A modal for adding a new user.
 * @param {Object} props - The props for the component.
 * @param {boolean} props.isSelf - Whether the password reset if for this user or not.
 * @param {IUser} props.user - The user to reset the password for.
 * @param {boolean} props.opened - Whether the modal is opened.
 * @param {() => void} props.onClose - The function to call when the modal is closed.
 * @returns {React.ReactNode}
 */
export default function ResetPasswordModal({ isSelf, user, opened, onClose }) {
  return (
    <Modal opened={opened} onClose={onClose} size="sm" withCloseButton={false}>
      <ResetPasswordModalContent
        isSelf={isSelf}
        user={user}
        onClose={onClose}
      />
    </Modal>
  );
}

/**
 *
 * @param {Object} props
 * @param {boolean} props.isSelf - Whether the password reset if for this user or not.
 * @param {IUser} props.user - The user to reset the password for.
 * @param {() => void} props.onClose - The function to call when the modal is closed.
 * @returns {React.ReactNode}
 */
function ResetPasswordModalContent({ isSelf, user, onClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const form = useForm({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validate: {
      password: (value) =>
        value.length < 6
          ? 'Password must be at least 6 characters long.'
          : null,
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords do not match.' : null,
    },
  });

  async function onResetPassword(values) {
    setIsLoading(true);
    const response = await changePassword(user.username, values.password);
    if (response.success) {
      if (!isSelf) {
        notifications.show({
          title: 'Reset Password',
          message: `User '${user.username}' has had their password reset successfully.`,
          position: 'top-right',
          color: 'teal',
        });
      }
      onClose();
    } else {
      setError(response.message);
    }

    setIsLoading(false);
  }

  return (
    <Stack>
      <Group justify="space-between">
        <Title order={3}>Reset Password</Title>
        <ActionIcon color="gray" variant="subtle" onClick={onClose}>
          <IconX size={18} />
        </ActionIcon>
      </Group>
      {error ? (
        <Alert
          mt="sm"
          variant="light"
          color="red"
          title={error}
          icon={<IconInfoCircle />}
          mb="sm"
        />
      ) : null}
      <form onSubmit={form.onSubmit((values) => onResetPassword(values))}>
        <Paper withBorder>
          {isSelf ? (
            <Text m="md">
              Resetting your password will sign you out of all devices that you
              are currently logged into.
            </Text>
          ) : (
            <Text m="md">
              {`Resetting the password for '${user.username}' will sign them out of all
            devices that they are currently logged into.`}
            </Text>
          )}
          <Divider mb={0} pb={0} />
          <Stack p="md" gap="md">
            <PasswordInput
              key={form.key('password')}
              {...form.getInputProps('password')}
              label="New Password"
              placeholder="New password"
              required
            />
            <PasswordInput
              key={form.key('confirmPassword')}
              {...form.getInputProps('confirmPassword')}
              label="Confirm Password"
              placeholder="Confirm Password"
              required
            />
          </Stack>
        </Paper>
        <Group justify="flex-end" mt="md">
          <Button
            leftSection={<IconLock size={18} />}
            loading={isLoading}
            type="submit"
          >
            Reset Password
          </Button>
        </Group>
      </form>
    </Stack>
  );
}
