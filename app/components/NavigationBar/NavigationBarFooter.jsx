import { UnstyledButton, Group, Avatar, Text, rem } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import classes from './NavigationBarFooter.module.css';

export default function NavigationBarFooter() {
  return (
    <UnstyledButton className={classes.user}>
      <Group>
        <Avatar radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            Deborah Ricks
          </Text>

          <Text c="dimmed" size="xs">
            deborah.ricks@blissetllc.net
          </Text>
        </div>

        <IconChevronRight
          style={{ width: rem(14), height: rem(14) }}
          stroke={1.5}
        />
      </Group>
    </UnstyledButton>
  );
}
