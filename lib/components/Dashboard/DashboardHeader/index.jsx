'use client';
import React from 'react';
import { Burger, Divider, Group, Text, Title } from '@mantine/core';

import ICompany from '@models/company';

/**
 * Dashboard header component.
 * @param {Object} props - The props for the component.
 * @param {ICompany} props.company - The company information
 * @param {Function} props.toggleMobile - Function to toggle mobile menu.
 * @param {boolean} props.mobileOpened - Whether the mobile menu is opened.
 * @param {Function} props.toggleDesktop - Function to toggle desktop menu.
 * @param {boolean} props.desktopOpened - Whether the desktop menu is opened.
 * @returns {React.ReactNode}
 */
export default function DashboardHeader({
  company,
  toggleMobile,
  mobileOpened,
  toggleDesktop,
  desktopOpened,
}) {
  return (
    <Group
      h="100%"
      px="md"
      style={{
        backgroundColor:
          'light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-8))',
      }}
      wrap="nowrap"
    >
      <Group style={{ flexShrink: 0 }}>
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
      </Group>

      <Group
        gap="xs"
        style={{ overflow: 'hidden' }}
        flex={1}
        justify="space-between"
        wrap="nowrap"
      >
        <Text
          size="xl"
          fw={800}
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {company.name}
        </Text>
        <Title order={2} fw={800}>
          <Text component="span" c="blue.9" fw={900} inherit>
            C
          </Text>
          <Text component="span" c="blue.3" fw={900} inherit>
            W
          </Text>
        </Title>
      </Group>
    </Group>
  );
}
