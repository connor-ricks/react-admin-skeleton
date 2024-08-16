'use client';
import React, { useState } from 'react';
import { NavLink, ScrollArea, Stack, ThemeIcon } from '@mantine/core';
import { usePathname, useRouter } from 'next/navigation';

import IMenu from '@models/menu';
import IMenuItem from '@models/menu-item';
import DashboardNavbarMenuItem from './DashboardNavbarMenuItem';

/**
 * The menu for the dashboard navbar.
 * @param {Object} props - The props for the component.
 * @param {IMenu} props.menu - The menu object used to configure the menu.
 * @returns {React.JSX.Element}
 */
export default function DashboardNavbarMenu({ menu }) {
  return (
    <Stack flex={1}>
      <ScrollArea>
        {menu.items?.map((item) => {
          return (
            <DashboardNavbarMenuItem key={item.path} item={item} base="" />
          );
        })}
      </ScrollArea>
    </Stack>
  );
}
