'use client';

import React, { useContext } from 'react';
import { ActionIcon, Burger, Group, Text } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';
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
      <ActionIcon
        color={dark ? 'yellow' : 'indigo'}
        onClick={() => colorSchemeContext.onChange(dark ? 'light' : 'dark')}
        title="Toggle color scheme"
      >
        {dark ? (
          <IconSun style={{ width: '70%', height: '70%' }} />
        ) : (
          <IconMoon style={{ width: '70%', height: '70%' }} />
        )}
      </ActionIcon>
    </Group>
  );
}
