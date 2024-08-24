'use client';

import React, { useContext } from 'react';
import { ActionIcon } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';
import ColorSchemeContext from '@contexts/ColorSchemeContext';

export default function ThemeButton() {
  const colorSchemeContext = useContext(ColorSchemeContext);
  const dark = colorSchemeContext.colorScheme === 'dark';

  return (
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
  );
}
