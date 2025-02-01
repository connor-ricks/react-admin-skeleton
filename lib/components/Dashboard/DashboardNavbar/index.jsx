'use client';
import React, { useEffect, version } from 'react';
import { Divider, Stack } from '@mantine/core';

import IMenuItem from '@models/menu-item';

import DashboardNavbarHeader from './DashboardNavbarHeader';
import DashboardNavbarMenu from './DashboardNavbarMenu';
import DashboardNavbarFooter from './DashboardNavbarFooter';
import IUser from '@models/user';
import IAccount from '@models/account';
import IVersion from '@models/version';

/**
 * Dashboard Navbar component.
 * @param {Object} props - The props for the component.
 * @param {IUser} props.user - The current user.
 * @param {IAccount} props.account - The account information.
 * @param {IVersion} props.version - The version information.
 * @param {Array<IMenuItem>} props.items - The menu items for navigation.
 * @param {boolean} props.mobileOpened - Whether the mobile menu is opened.
 * @param {Function} props.toggleMobile - Function to toggle mobile menu.
 * @returns {React.ReactNode}
 */
export default function DashboardNavbar({
  user,
  account,
  version,
  items,
  mobileOpened,
  toggleMobile,
}) {
  return (
    <Stack
      flex={1}
      gap={0}
      style={{
        backgroundColor:
          'light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-7))',
      }}
    >
      <DashboardNavbarHeader
        account={account}
        mobileOpened={mobileOpened}
        toggleMobile={toggleMobile}
      />
      <Divider />
      <DashboardNavbarMenu
        items={items}
        mobileOpened={mobileOpened}
        toggleMobile={toggleMobile}
      />
      <Divider />
      <DashboardNavbarFooter
        user={user}
        version={version}
        mobileOpened={mobileOpened}
        toggleMobile={toggleMobile}
      />
    </Stack>
  );
}
