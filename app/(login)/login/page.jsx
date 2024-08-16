'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import {
  Affix,
  Alert,
  Button,
  Checkbox,
  Code,
  Container,
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

import { useCompanyContext } from '@client/CompanyProvider';
import { useVersionContext } from '@client/VersionProvider';
import ThemeButton from '@components/ThemeButton';
import { login } from '@server/actions/authentication';

/**
 * The login page.
 * @returns {React.JSX.Element}
 */
export default function LoginPage() {
  const company = useCompanyContext();
  const version = useVersionContext();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState(null);

  const form = useForm({
    initialValues: {
      account: '',
      username: '',
      password: '',
      remember: true,
    },
  });

  async function onLogin(values) {
    setIsLoggingIn(true);

    const { account, username, password, remember } = values;
    const response = await login(account, username, password, remember);
    if (!response.success) {
      setError(response.message);
    } else {
      // No-Op: The action already redirects to the dashboard on success.
    }

    setIsLoggingIn(false);
  }

  return (
    <>
      <Container size={420} my={40}>
        <Title order={1} ta="center">
          {company.name}
        </Title>

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
                key={form.key('remember')}
                {...form.getInputProps('remember', {
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

        <Text c="dimmed" mt="sm" ta="center" size="xs" fw="bold">
          Website{' '}
          <Code c="dimmed" mr="xs">
            v{version.site}
          </Code>
          ConnectCom <Code c="dimmed">v{version.com}</Code>
        </Text>

        <Text c="dimmed" mt="sm" ta="center" size="xs">
          © Copyright {new Date().getFullYear()},{' '}
          <Link href="http://www.scsco.com">Support Center Services LLC.</Link>{' '}
          All rights reserved.
        </Text>
      </Container>

      <Affix position={{ top: 20, right: 20 }}>
        <ThemeButton />
      </Affix>
    </>
  );
}
