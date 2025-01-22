'use client';
import React from 'react';
import { Affix, AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import DashboardHeader from './DashboardHeader';
import DashboardNavbar from './DashboardNavbar';
import ThemeButton from '@components/ThemeButton';
import IMenu from '@models/menu';

/**
 * The main dashboard component.
 * @param {Object} props
 * @param {IMenu} props.menu - The menu object used to configure the dashboard's menu.
 * @param {React.JSX.Element} props.children - The dashboard's content.
 * @returns {React.JSX.Element}
 */
export default function Dashboard({ menu, children }) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <>
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
        styles={{
          root: {
            backgroundColor:
              'light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-9))',
          },
        }}
      >
        <AppShell.Header>
          <DashboardHeader
            toggleDesktop={toggleDesktop}
            desktopOpened={desktopOpened}
            toggleMobile={toggleMobile}
            mobileOpened={mobileOpened}
          />
        </AppShell.Header>
        <AppShell.Navbar>
          <DashboardNavbar menu={menu} />
        </AppShell.Navbar>
        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>
      <Affix position={{ bottom: 20, right: 20 }}>
        <ThemeButton />
      </Affix>
    </>
  );
}
