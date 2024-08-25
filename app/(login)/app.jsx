'use client';
import '@mantine/core/styles.css';
import React from 'react';
import { MantineProvider } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import ColorSchemeContext from '@contexts/ColorSchemeContext';
import { theme } from 'theme';

export default function App({ children }) {
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: 'theme',
    defaultValue: 'light',
  });

  return (
    <ColorSchemeContext.Provider
      value={{
        colorScheme,
        onChange: (value) => {
          localStorage.setItem('theme', value);
          setColorScheme(value);
        },
      }}
    >
      <MantineProvider forceColorScheme={colorScheme} theme={theme}>
        {children}
      </MantineProvider>
    </ColorSchemeContext.Provider>
  );
}
