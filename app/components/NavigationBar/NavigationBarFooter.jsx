import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Avatar,
  Button,
  Group,
  Popover,
  rem,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';
import classes from './NavigationBarFooter.module.css';

export default function NavigationBarFooter() {
  const [isConfirmingLogout, setIsConfirmingLogout] = useState(false);
  const router = useRouter();

  async function logout() {
    const response = await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  }

  return (
    <Popover
      opened={isConfirmingLogout}
      onChange={setIsConfirmingLogout}
      withArrow
    >
      <UnstyledButton
        className={classes.user}
        onClick={() => setIsConfirmingLogout(true)}
      >
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

          <Popover.Target>
            <IconLogout
              style={{ width: rem(22), height: rem(22) }}
              stroke={1.5}
              color="red"
            />
          </Popover.Target>
        </Group>
      </UnstyledButton>

      <Popover.Dropdown>
        <Group gap="xs">
          <Text size="sm" fw={500}>
            Are you sure?
          </Text>
          <Group gap={0}>
            <Button onClick={() => logout()} color="red" variant="subtle">
              Yes
            </Button>
            <Button
              onClick={() => setIsConfirmingLogout(false)}
              variant="subtle"
            >
              No
            </Button>
          </Group>
        </Group>
      </Popover.Dropdown>
    </Popover>
  );
}
