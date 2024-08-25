'use client';
import React, { useContext } from 'react';
import { Burger, Group, Text } from '@mantine/core';
import ThemeButton from '@components/ThemeButton';
import ColorSchemeContext from '@contexts/ColorSchemeContext';

export default function Header({
  toggleMobile,
  mobileOpened,
  toggleDesktop,
  desktopOpened,
}) {
  const colorSchemeContext = useContext(ColorSchemeContext);
  const dark = colorSchemeContext.colorScheme === 'dark';

  return (
    <Group h="100%" px="md" justify="space-between">
      <Group>
        <Burger
          opened={mobileOpened}
          onClick={toggleMobile}
          hiddenFrom="sm"
          size="sm"
        />
        <Burger
          opened={desktopOpened}
          onClick={toggleDesktop}
          visibleFrom="sm"
          size="sm"
        />
        <Text size="xl" fw={700}>
          Blisset
        </Text>
      </Group>
      <ThemeButton />
    </Group>
  );
}
