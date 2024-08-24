'use client';
import '@mantine/core/styles.css';
import React, { useState } from 'react';
import { MantineProvider } from '@mantine/core';
import ColorSchemeContext from '@contexts/ColorSchemeContext';
import { theme } from 'theme';

export default function App({ children }) {
  const [colorScheme, setColorScheme] = useState(
    localStorage.getItem('theme') ?? 'light'
  );

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
