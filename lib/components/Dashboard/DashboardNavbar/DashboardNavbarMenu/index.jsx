'use client';
import React from 'react';
import { ScrollArea, Stack } from '@mantine/core';

import IMenuItem from '@models/menu-item';
import DashboardNavbarMenuItem from './DashboardNavbarMenuItem';

/**
 * The menu for the dashboard navbar.
 * @param {Object} props - The props for the component.
 * @param {Array<IMenuItem>} props.items - The menu items for navigation.
 * @param {boolean} props.mobileOpened - Whether the mobile menu is opened.
 * @param {Function} props.toggleMobile - Function to toggle mobile menu.
 * @returns {React.ReactNode}
 */
export default function DashboardNavbarMenu({
  items,
  mobileOpened,
  toggleMobile,
}) {
  return (
    <ScrollArea flex={1}>
      <Stack gap={0}>
        {items?.map((item) => {
          return (
            <DashboardNavbarMenuItem
              key={item.path}
              item={item}
              base=""
              mobileOpened={mobileOpened}
              toggleMobile={toggleMobile}
            />
          );
        })}
      </Stack>
    </ScrollArea>
  );
}
