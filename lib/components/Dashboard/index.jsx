'use client';
import React from 'react';
import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import DashboardHeader from '@components/DashboardHeader';
import DashboardNavbar from '@components/DashboardNavbar';
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
  );
}
