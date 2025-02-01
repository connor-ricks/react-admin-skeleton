'use client';
import React, { useState } from 'react';
import {
  Alert,
  Button,
  Checkbox,
  Group,
  Paper,
  PasswordInput,
  Popover,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconInfoCircle, IconPhone, IconMail } from '@tabler/icons-react';

import { login } from '@server/actions/authentication';

/**
 * The login form allowing the user to authenticate.
 * @param {Object} props - The props for the component.
 * @param {Object} props.company - The company of the site..
 * @returns {React.ReactNode}
 */
export default function LoginForm({ company }) {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState(null);

  const form = useForm({
    initialValues: {
      account: '',
      username: '',
      password: '',
      shouldRemember: true,
    },
  });

  async function onLogin(values) {
    setIsLoggingIn(true);

    const { account, username, password, shouldRemember } = values;
    const response = await login(account, username, password, shouldRemember);
    if (!response.success) {
      setError(response.message);
    } else {
      // No-Op: The action already redirects to the dashboard on success.
    }

    setIsLoggingIn(false);
  }

  return (
    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
      <Title order={3} ta="center">
        Sign In
      </Title>

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

      <form onSubmit={form.onSubmit((values) => onLogin(values))}>
        <TextInput
          key={form.key('account')}
          {...form.getInputProps('account')}
          label="Account"
          placeholder="Your account"
          required
        />
        <TextInput
          key={form.key('username')}
          {...form.getInputProps('username')}
          label="Username"
          placeholder="Your username"
          required
          mt="md"
        />
        <PasswordInput
          key={form.key('password')}
          {...form.getInputProps('password')}
          label="Password"
          placeholder="Your password"
          required
          mt="md"
        />
        <Group justify="space-between" mt="lg">
          <Checkbox
            key={form.key('shouldRemember')}
            {...form.getInputProps('shouldRemember', {
              type: 'checkbox',
            })}
            label="Remember me"
          />
        </Group>
        <Button loading={isLoggingIn} type="submit" fullWidth mt="xl">
          Sign in
        </Button>
      </form>

      <Popover width={300} shadow="md" withArrow>
        <Popover.Target>
          <Group justify="center" mt="md">
            <Button c="dimmed" variant="transparent">
              Create Account
            </Button>
          </Group>
        </Popover.Target>
        <Popover.Dropdown>
          <Text size="sm">
            If you would like to create an account, or you're having trouble
            accessing your account, please contact us.
          </Text>
          <Stack mt="sm" gap="xs">
            <Group gap="xs">
              <IconMail size={18} /> <Text>{company.contact.email}</Text>
            </Group>
            <Group gap="xs">
              <IconPhone size={18} /> <Text>{company.contact.phone}</Text>
            </Group>
          </Stack>
        </Popover.Dropdown>
      </Popover>
    </Paper>
  );
}
