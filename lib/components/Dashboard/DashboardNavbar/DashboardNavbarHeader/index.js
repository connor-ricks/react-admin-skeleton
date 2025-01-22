'use client';
import React from 'react';
import classes from './DashboardNavbarHeader.module.css';
import { Avatar, Group, Text, Title, UnstyledButton } from '@mantine/core';
import { useAccountContext } from '@client/AccountProvider';

import { IconBuildingStore, IconChevronRight } from '@tabler/icons-react';

/**
 * The header for the dashboard navbar.
 * @returns {React.JSX.Element}
 */
export default function DashboardNavbarHeader() {
  const account = useAccountContext();
  return (
    <UnstyledButton p="md" className={classes.hover}>
      <Group>
        <Avatar variant="filled" radius="xl">
          <IconBuildingStore size={20} />
        </Avatar>

        <div style={{ flex: 1 }}>
          <Text size="lg" fw={500}>
            {account.name}
          </Text>

          <Text c="dimmed" size="md">
            {account.number}
          </Text>
        </div>
        <IconChevronRight size={16} />
      </Group>
    </UnstyledButton>
  );
}
