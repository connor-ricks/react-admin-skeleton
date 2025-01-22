'use client';
import React from 'react';
import { ScrollArea, Stack } from '@mantine/core';

import IMenu from '@models/menu';
import DashboardNavbarMenuItem from './DashboardNavbarMenuItem';

/**
 * The menu for the dashboard navbar.
 * @param {Object} props - The props for the component.
 * @param {IMenu} props.menu - The menu object used to configure the menu.
 * @returns {React.JSX.Element}
 */
export default function DashboardNavbarMenu({ menu }) {
  return (
    <ScrollArea flex={1}>
      <Stack gap={0}>
        {menu.items?.map((item) => {
          return (
            <DashboardNavbarMenuItem key={item.path} item={item} base="" />
          );
        })}
      </Stack>
    </ScrollArea>
  );
}
