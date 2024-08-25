'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Affix,
  Alert,
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconInfoCircle } from '@tabler/icons-react';
import ThemeButton from '@components/ThemeButton';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
      remember: true,
    },
  });

  async function login(values) {
    setIsLoading(true);
    const { username, password, remember } = values;

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, remember }),
    });

    const body = await response.json();
    if (response.status === 200) {
      router.push(body.redirect);
    } else {
      setError(body.message);
    }

    setIsLoading(false);
  }

  return (
    <>
      <Container size={420} my={40}>
        <Title ta="center">Blisset!</Title>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          {error ? (
            <Alert
              variant="light"
              color="red"
              title={error}
              icon={<IconInfoCircle />}
              mb="sm"
            />
          ) : null}
          <form onSubmit={form.onSubmit((values) => login(values))}>
            <TextInput
              key={form.key('username')}
              {...form.getInputProps('username')}
              label="Username"
              placeholder="Your username"
              required
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
            <Button loading={isLoading} type="submit" fullWidth mt="xl">
              Sign in
            </Button>
          </form>
        </Paper>
      </Container>

      <Affix position={{ top: 20, right: 20 }}>
        <ThemeButton />
      </Affix>
    </>
  );
}
