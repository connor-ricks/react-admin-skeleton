'use client';
import '@mantine/core/styles.css';
import React, { useState } from 'react';
import { AppShell, MantineProvider } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import Header from '@components/Header';
import NavigationBar from '@components/NavigationBar';
import ColorSchemeContext from '@contexts/ColorSchemeContext';
import { theme } from '../theme';

export default function App({ children }) {
  const [colorScheme, setColorScheme] = useState('light');
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <ColorSchemeContext.Provider
      value={{ colorScheme, onChange: setColorScheme }}
    >
      <MantineProvider forceColorScheme={colorScheme} theme={theme}>
        <AppShell
          header={{ height: 60 }}
          padding="md"
          navbar={{
            width: 300,
            breakpoint: 'sm',
            collapsed: {
              mobile: !mobileOpened,
              desktop: !desktopOpened,
            },
          }}
        >
          <AppShell.Header>
            <Header
              toggleDesktop={toggleDesktop}
              desktopOpened={desktopOpened}
              toggleMobile={toggleMobile}
              mobileOpened={mobileOpened}
            />
          </AppShell.Header>
          <AppShell.Navbar>
            <NavigationBar />
          </AppShell.Navbar>
          <AppShell.Main>{children}</AppShell.Main>
        </AppShell>
      </MantineProvider>
    </ColorSchemeContext.Provider>
  );
}
