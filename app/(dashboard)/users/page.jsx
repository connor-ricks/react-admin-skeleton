import React from 'react';
import {
  Button,
  Group,
  Paper,
  Space,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';

import { getUser, getUsers } from '@com/users';
import { NotFound, NoPermissions, ServerError } from '@components/EmptyStates';
import PermissionsError from '@models/permissions-error';
import UsersTable from '@components/Users/UsersTable';
import { IconSearch, IconTrash, IconUserPlus } from '@tabler/icons-react';

/**
 * A page for viewing all users associated with an account.
 * @returns {Promise<React.ReactNode>}
 */
export default async function UsersPage() {
  try {
    const self = await getUser();
    const users = await getUsers();

    if (users.length === 0) {
      return (
        <NotFound
          title={'No users'}
          description="There no users associated with this account. If you think this is an error, please contact support."
        />
      );
    }

    return (
      <Stack style={{ maxWidth: 1000 }}>
        <Paper p="lg">
          <Stack>
            <Group justify="space-between">
              <Title order={3}>Users</Title>
              <Button leftSection={<IconUserPlus size={18} />} size="xs">
                Add User
              </Button>
            </Group>
            <UsersTable self={self} users={users} />
          </Stack>
        </Paper>
      </Stack>
    );
  } catch (error) {
    if (error instanceof PermissionsError) {
      return <NoPermissions description={error.message} />;
    } else {
      return <ServerError error={error} />;
    }
  }
}
