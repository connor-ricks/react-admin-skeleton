'use client';
import React from 'react';
import classes from './DashboardNavbarFooter.module.css';
import { Avatar, Group, Menu, Text, UnstyledButton } from '@mantine/core';
import {
  IconDotsVertical,
  IconLogout,
  IconMessage,
  IconSettings,
} from '@tabler/icons-react';

import { useUserContext } from '@client/UserProvider';
import { logout } from '@server/actions/authentication';

/**
 * The footer for the dashboard navbar.
 * @returns {React.JSX.Element}
 */
export default function DashboardNavbarFooter() {
  const user = useUserContext();

  async function onLogout() {
    await logout();
  }

  return (
    <Menu position="right-end" width={180}>
      <Menu.Target>
        <UnstyledButton p="md" className={classes.hover}>
          <Group>
            <Avatar radius="xl" />

            <div style={{ flex: 1 }}>
              <Text size="sm" fw={500}>
                {user.name}
              </Text>

              <Text c="dimmed" size="xs">
                {user.email}
              </Text>
            </div>
            <IconDotsVertical />
          </Group>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item leftSection={<IconSettings size={14} />}>Settings</Menu.Item>
        <Menu.Item leftSection={<IconMessage size={14} />}>Messages</Menu.Item>

        <Menu.Divider />

        <Menu.Item
          color="red"
          leftSection={<IconLogout size={14} />}
          onClick={onLogout}
        >
          Sign out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
