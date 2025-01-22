'use client';
import React, { useEffect } from 'react';
import { Divider, Stack } from '@mantine/core';

import IMenu from '@models/menu';

import DashboardNavbarHeader from './DashboardNavbarHeader';
import DashboardNavbarMenu from './DashboardNavbarMenu';
import DashboardNavbarFooter from './DashboardNavbarFooter';

/**
 * Dashboard Navbar component.
 * @param {Object} props - The props for the component.
 * @param {IMenu} props.menu - The menu object used to configure the dashboard's menu.
 * @returns {React.JSX.Element}
 */
export default function DashboardNavbar({ menu }) {
  return (
    <Stack
      flex={1}
      gap={0}
      style={{
        backgroundColor:
          'light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-7))',
      }}
    >
      <DashboardNavbarHeader />
      <Divider />
      <DashboardNavbarMenu menu={menu} />
      <Divider />
      <DashboardNavbarFooter />
    </Stack>
  );
}
