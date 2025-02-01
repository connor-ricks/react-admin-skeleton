'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import classes from '../DashboardNavbar.module.css';
import { Avatar, Group, Stack, Text, UnstyledButton } from '@mantine/core';
import { IconBuildingStore, IconChevronRight } from '@tabler/icons-react';

import IAccount from '@models/account';

/**
 * The header for the dashboard navbar.
 * @param {Object} props - The props for the component.
 * @param {IAccount} props.account - The account information.
 * @param {boolean} props.mobileOpened - Whether the mobile menu is opened.
 * @param {Function} props.toggleMobile - Function to toggle mobile menu.
 * @returns {React.ReactNode}
 */
export default function DashboardNavbarHeader({
  account,
  mobileOpened,
  toggleMobile,
}) {
  const router = useRouter();

  return (
    <UnstyledButton
      p="md"
      className={classes.hover}
      onClick={() => {
        if (mobileOpened) {
          toggleMobile();
        }

        router.push('/account');
      }}
    >
      <Group justify="space-between">
        <Group gap="xs">
          <Avatar variant="filled" radius="xl">
            <IconBuildingStore size={20} />
          </Avatar>

          <Stack gap={0}>
            <Text size="lg" fw={500}>
              {account.name}
            </Text>

            <Text c="dimmed" size="md">
              {account.number}
            </Text>
          </Stack>
        </Group>
        <IconChevronRight size={16} />
      </Group>
    </UnstyledButton>
  );
}
