'use client';
import classes from './DashboardNavbarMenuItem.module.css';
import React, { useState } from 'react';
import { NavLink, ThemeIcon } from '@mantine/core';
import { usePathname, useRouter } from 'next/navigation';

import IMenuItem from '@models/menu-item';

/**
 * A menu item in the dashboard navbar menu.
 * @param {Object} props - The props for the component.
 * @param {IMenuItem} props.item - The menu item used to configure this component.
 * @param {string} props.base - The base path for the menu item.
 * @returns {React.JSX.Element}
 */
export default function DashboardNavbarMenuItem({ item, base }) {
  const path = usePathname();
  const router = useRouter();
  const fullPath = base + item.path;

  const isActive =
    item.path === '/' ? path === '/' : item.path && path.startsWith(fullPath);

  const [opened, setIsOpened] = useState(
    isActive && item.children !== undefined
  );

  return (
    <NavLink
      py="md"
      fw={600}
      key={fullPath}
      href={item.children ? null : fullPath}
      active={isActive}
      variant={
        isActive ? (item.children !== undefined ? 'subtle' : 'light') : null
      }
      defaultOpened={isActive && item.children !== undefined}
      opened={opened}
      className={classes.hover}
      onClick={() => setIsOpened(!opened)}
      label={item.label}
      leftSection={
        item.icon ? (
          <ThemeIcon
            variant="light"
            size={30}
            styles={{
              root: { padding: 4 },
            }}
          >
            {item.icon}
          </ThemeIcon>
        ) : null
      }
    >
      {item.children?.map((child) => {
        return DashboardNavbarMenuItem({ item: child, base: fullPath });
      })}
    </NavLink>
  );
}
