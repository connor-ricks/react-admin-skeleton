'use client';
import React from 'react';
import { Burger, Divider, Group, Text, Title } from '@mantine/core';

import { useCompanyContext } from '@client/CompanyProvider';

/**
 * Dashboard Header component.
 * @param {Object} props - The props for the component.
 * @param {Function} props.toggleMobile - Function to toggle mobile menu.
 * @param {boolean} props.mobileOpened - Whether the mobile menu is opened.
 * @param {Function} props.toggleDesktop - Function to toggle desktop menu.
 * @param {boolean} props.desktopOpened - Whether the desktop menu is opened.
 * @returns
 */
export default function DashboardHeader({
  toggleMobile,
  mobileOpened,
  toggleDesktop,
  desktopOpened,
}) {
  const company = useCompanyContext();

  return (
    <Group
      h="100%"
      px="md"
      justify="space-between"
      style={{
        backgroundColor:
          'light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-8))',
      }}
    >
      <Group>
        <Burger
          opened={mobileOpened}
          onClick={() => toggleMobile()}
          hiddenFrom="sm"
          size="sm"
        />
        <Burger
          opened={desktopOpened}
          onClick={() => toggleDesktop()}
          visibleFrom="sm"
          size="sm"
        />
        <Divider orientation="vertical" />
        <Title order={2} fw={800}>
          {company.name}
        </Title>
      </Group>
      <Group>
        <Title order={2} fw={800}>
          <Text component="span" c="blue.9" fw={900} inherit>
            Connect
          </Text>
          <Text component="span" c="blue.3" fw={900} inherit>
            Web
          </Text>
        </Title>
      </Group>
    </Group>
  );
}
