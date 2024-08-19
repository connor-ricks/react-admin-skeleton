'use client';

import React, { useState } from 'react';
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from '@mantine/core';
import { useForm } from '@mantine/form';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      remember: false,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) =>
        val.length <= 6
          ? 'Password should include at least 6 characters'
          : null,
    },
  });

  async function login(values) {
    const { email, password, remember } = values;
    setIsLoading(true);
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, remember }),
    });
    console.log('Response', await response.json());
    setIsLoading(false);
  }

  return (
    <Container size={420} my={40}>
      <Title ta="center">Blisset!</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor size="sm" component="button">
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit((values) => login(values))}>
          <TextInput
            key={form.key('email')}
            {...form.getInputProps('email')}
            label="Email"
            placeholder="you@blissetllc.com"
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
              {...form.getInputProps('remember', { type: 'checkbox' })}
              label="Remember me"
            />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button loading={isLoading} type="submit" fullWidth mt="xl">
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
