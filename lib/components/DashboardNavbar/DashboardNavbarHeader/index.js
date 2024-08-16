'use client';
import React from 'react';
import { Code, Group, Text } from '@mantine/core';

/**
 * The header for the dashboard navbar.
 * @returns {React.JSX.Element}
 */
export default function DashboardNavbarHeader() {
  return (
    <Group p="md" justify="space-between">
      <Text size="xl" fw="bold">
        Connect CMS
      </Text>
      <Code c="dimmed" style={{ marginTop: 5 }} fw={700}>
        v0.0.1
      </Code>
    </Group>
  );
}
