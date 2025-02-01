import React from 'react';
import { Anchor, Breadcrumbs, Paper, Stack, Text } from '@mantine/core';

import { getUser } from '@com/users';
import { NoPermissions, NotFound, ServerError } from '@components/EmptyStates';
import UserManagement from '@components/User/UserManagement';
import UserPermissions from '@components/User/UserPemissions';
import UserOverview from '@components/User/UserOverview';
import { userHasPermission } from '@server/authentication/permissions';
import PermissionsError from '@models/permissions-error';
import IPermission from '@models/permission';

/**
 * A page for viewing a single user associated with an account.
 * @returns {Promise<React.ReactNode >}
 */
export default async function UserPage({ params }) {
  try {
    const { username } = await params;
    const user = await getUser(username);
    const self = await getUser();

    const canSelfManageUsers = userHasPermission(self, [
      IPermission.ADMIN,
      IPermission.USERS_MANAGE,
    ]);

    if (!user) {
      return (
        <NotFound
          title={`"${username}" does not exist.`}
          description={`There is no user with the username "${username}" associated with this account. If you think this is an error, please contact support.`}
        />
      );
    }

    return (
      <Stack style={{ width: 'fit-content' }}>
        {canSelfManageUsers ? (
          <Breadcrumbs>
            <Anchor href="/users">Users</Anchor>
            <Text>{user.username}</Text>
          </Breadcrumbs>
        ) : null}
        <Paper p="lg">
          <UserOverview self={self} user={user} />
        </Paper>
        <Paper p="lg">
          <UserPermissions self={self} user={user} />
        </Paper>
        <UserManagement self={self} user={user} />
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
