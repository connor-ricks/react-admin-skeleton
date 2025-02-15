'use client';
import React, { version } from 'react';
import { Affix, AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { IconHome, IconUsers } from '@tabler/icons-react';

import ThemeButton from '@components/ThemeButton';

import IAccount from '@models/account';
import ICompany from '@models/company';
import IMenuItem from '@models/menu-item';
import IPermission from '@models/permission';
import IUser from '@models/user';

import DashboardHeader from './DashboardHeader';
import DashboardNavbar from './DashboardNavbar';
import IVersion from '@models/version';
import { userHasPermission } from '@server/authentication/permissions';

/**
 * The main dashboard layout for authenticated sessions.
 * @param {Object} props - The props for the component.
 * @param {IUser} props.user - The current user.
 * @param {IAccount} props.account - The account information.
 * @param {ICompany} props.company - The company information.
 * @param {IVersion} props.version - The version information.
 * @param {React.ReactNode} props.children - The children of the component.
 * @returns {React.ReactNode}
 */
export default function Dashboard({
  user,
  account,
  company,
  version,
  children,
}) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  /** @type {Array<IMenuItem>} */
  let items = [
    {
      label: 'Home',
      icon: <IconHome />,
      path: '/',
      children: undefined,
    },
  ];

  if (userHasPermission(user, [IPermission.OWNER, IPermission.USERS_MANAGE])) {
    items.push({
      label: 'Users',
      icon: <IconUsers />,
      path: '/users',
      children: undefined,
    });
  }

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
            company={company}
            toggleDesktop={toggleDesktop}
            desktopOpened={desktopOpened}
            toggleMobile={toggleMobile}
            mobileOpened={mobileOpened}
          />
        </AppShell.Header>
        <AppShell.Navbar>
          <DashboardNavbar
            user={user}
            account={account}
            version={version}
            items={items}
            mobileOpened={mobileOpened}
            toggleMobile={toggleMobile}
          />
        </AppShell.Navbar>
        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>
      <Affix position={{ bottom: 20, right: 20 }}>
        <ThemeButton />
      </Affix>
    </>
  );
}
