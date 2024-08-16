'use client';
import React from 'react';
import { Burger, Divider, Group, Text } from '@mantine/core';
import ThemeButton from '@components/ThemeButton';

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
  return (
    <Group h="100%" px="md" justify="space-between">
      <Group>
        <Burger
          opened={mobileOpened}
          onClick={() => toggleMobile()}
          hiddenFrom="sm"
          size="sm"
        />
        <Burger
          opened={desktopOpened}
          onClick={() => toggleDesktop}
          visibleFrom="sm"
          size="sm"
        />
        <Divider orientation="vertical" />
        <Text size="xl" fw="bold">
          🍛 Curry Couriers
        </Text>
      </Group>
      <ThemeButton />
    </Group>
  );
}
