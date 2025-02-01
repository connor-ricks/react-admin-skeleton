'use client';
import React from 'react';
import classes from '../DashboardNavbar.module.css';
import { useRouter } from 'next/navigation';
import {
  Avatar,
  Code,
  Divider,
  Group,
  Stack,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';

import IUser from '@models/user';
import IVersion from '@models/version';

/**
 * The footer for the dashboard navbar.
 * @param {Object} props - The props for the component.
 * @param {IUser} props.user - The current user.
 * @param {IVersion} props.version - The version information.
 * @param {boolean} props.mobileOpened - Whether the mobile menu is opened.
 * @param {Function} props.toggleMobile - Function to toggle mobile menu.
 * @returns {React.ReactNode}
 */
export default function DashboardNavbarFooter({
  user,
  version,
  mobileOpened,
  toggleMobile,
}) {
  const router = useRouter();

  return (
    <Stack gap={0}>
      <UnstyledButton
        p="md"
        className={classes.hover}
        onClick={() => {
          if (mobileOpened) {
            toggleMobile();
          }

          router.push('/users/' + user.username);
        }}
      >
        <Group justify="space-between" wrap="nowrap" gap="xs">
          <Avatar
            size="md"
            variant="filled"
            color="initials"
            name={user.name}
          />

          <Stack
            gap={0}
            style={{ flexGrow: 1, flexShrink: 1, overflow: 'hidden' }}
          >
            <Group
              gap="xs"
              style={{ flexGrow: 1, flexShrink: 1, overflow: 'hidden' }}
              wrap="nowrap"
            >
              <Text size="sm" truncate="end">
                {user.name}
              </Text>
            </Group>

            <Text size="xs" c="dimmed" truncate="end">
              {user.email}
            </Text>
          </Stack>

          <IconChevronRight size={16} />
        </Group>
      </UnstyledButton>
      <Divider m={0} />
      <Group p="xs" justify="space-evenly">
        <Text c="dimmed" ta="center" size="xs" fw="bold">
          Website <Code c="dimmed"> v{version.site}</Code>
        </Text>

        <Text c="dimmed" ta="center" size="xs" fw="bold">
          ConnectCOM <Code c="dimmed">v{version.com}</Code>
        </Text>
      </Group>
    </Stack>
  );
}
