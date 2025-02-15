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
import { IconInfoCircle, IconUserPlus, IconX } from '@tabler/icons-react';
import IPermission from '@models/permission';
import { addUser } from '@server/actions/users';

/**
 * A modal for adding a new user.
 * @param {Object} props - The props for the component.
 * @param {boolean} props.opened - Whether the modal is opened.
 * @param {() => void} props.onClose - The function to call when the modal is closed.
 * @param {(IUser) => void} props.onSuccess - The function to call when the modal successfully adds a user.
 * @returns {React.ReactNode}
 */
export default function AddUserModal({ opened, onClose, onSuccess }) {
  return (
    <Modal opened={opened} onClose={onClose} size="lg" withCloseButton={false}>
      <AddUserModalContent onClose={onClose} onSuccess={onSuccess} />
    </Modal>
  );
}

/**
 *
 * @param {Object} props
 * @param {() => void} props.onClose - The function to call when the modal is closed.
 * @param {(IUser) => void} props.onSuccess - The function to call when the modal successfully adds a user.
 * @returns {React.ReactNode}
 */
function AddUserModalContent({ onClose, onSuccess }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      permissions: Object.keys(IPermission).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {}),
    },
    validate: {
      firstName: (value) =>
        value.trim().length < 0 ? 'First name must not be empty.' : null,
      lastName: (value) =>
        value.trim().length < 0 ? 'Last name must not be empty.' : null,
      username: (value) =>
        value.length < 3 ? 'Username must have at least 3 letters.' : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) =>
        value.length < 6
          ? 'Password must be at least 6 characters long.'
          : null,
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords do not match.' : null,
    },
  });

  async function onAddUser(values) {
    setIsLoading(true);
    const submission = { ...values };
    /// Add all the permissions selected using their key values.
    const permissions = Object.keys(values.permissions).reduce((acc, key) => {
      if (values.permissions[key] == true) {
        acc[IPermission[key].key] = true;
      }
      return acc;
    }, {});
    submission.permissions = permissions;
    const response = await addUser(submission);
    if (response.success) {
      notifications.show({
        title: 'User Added',
        message: `User '${values.username}' has been added successfully.`,
        position: 'top-right',
        color: 'teal',
      });
      onSuccess(response.payload);
    } else {
      setError(response.message);
    }
    setIsLoading(false);
  }

  return (
    <Stack>
      <Group justify="space-between">
        <Title order={3}>Add User</Title>
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
      <form onSubmit={form.onSubmit((values) => onAddUser(values))}>
        <Paper withBorder>
          <Title m="md" order={4}>
            User Info
          </Title>
          <Divider mb={0} pb={0} />
          <Stack p="md" gap="md">
            <Group grow>
              <TextInput
                key={form.key('firstName')}
                {...form.getInputProps('firstName')}
                label="First Name"
                placeholder="First Name"
                required
              />
              <TextInput
                key={form.key('lastName')}
                {...form.getInputProps('lastName')}
                label="Last Name"
                placeholder="Last Name"
                required
              />
            </Group>
            <TextInput
              key={form.key('username')}
              {...form.getInputProps('username')}
              label="Username"
              placeholder="Username"
              required
            />
            <TextInput
              key={form.key('email')}
              {...form.getInputProps('email')}
              label="Email"
              placeholder="Email"
              required
            />
            <PasswordInput
              key={form.key('password')}
              {...form.getInputProps('password')}
              label="Password"
              placeholder="Your password"
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

        <Paper withBorder mt="md">
          <Title m="md" order={4}>
            Permissions
          </Title>
          {Object.keys(IPermission).map((key) => {
            const permission = IPermission[key];
            if (permission.key === IPermission.OWNER.key) {
              return null;
            } else {
              return (
                <Stack key={permission.key} gap={0}>
                  <Divider mb={0} pb={0} />
                  <Stack gap={0} p="md">
                    <Group wrap="nowrap" justify="space-between">
                      <Stack p="xs" gap="xs">
                        <Badge variant="filled">{permission.key}</Badge>
                        <Text c="dimmed">{permission.description}</Text>
                      </Stack>
                      <Checkbox
                        key={form.key(`permissions.${key}`)}
                        {...form.getInputProps(`permissions.${key}`, {
                          type: 'checkbox',
                        })}
                      />
                    </Group>
                  </Stack>
                </Stack>
              );
            }
          })}
        </Paper>

        <Group justify="flex-end" mt="md">
          <Button
            leftSection={<IconUserPlus size={18} />}
            loading={isLoading}
            type="submit"
          >
            Add User
          </Button>
        </Group>
      </form>
    </Stack>
  );
}
