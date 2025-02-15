import React from 'react';
import { Anchor, Breadcrumbs, Paper, Stack, Text } from '@mantine/core';

import { getUser } from '@com/users';
import { NoPermissions, NotFound, ServerError } from '@components/EmptyStates';
import UserManagement from '@components/User/UserManagement';
import UserPermissions from '@components/User/UserPermissions';
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
    // The username of the user being viewed.
    const { username } = await params;

    // The user being viewed.
    const user = await getUser(username);

    // The current user.
    const self = await getUser();

    // Check if the user being viewed is the current user.
    const isSelf = self.username === user.username;

    // Check if the current is an owner.
    const isUserOwner = userHasPermission(user, [IPermission.OWNER]);

    // Check if the current user has permission to manage other users.
    const canSelfManageUsers = userHasPermission(self, [
      IPermission.OWNER,
      IPermission.USERS_MANAGE,
    ]);

    // Check if the current user has permission to manage themselves.
    const canSelfManageSelf = userHasPermission(self, [
      IPermission.SELF_METADATA_EDIT,
    ]);

    // Check if the current user can manage the user metadata being viewed.
    const canSelfManagerUserMetadata =
      (canSelfManageUsers && !isSelf && !isUserOwner) ||
      (canSelfManageSelf && isSelf);

    // Check if the current user can manage the user permissions being viewed.
    const canSelfManageUserPermissions =
      canSelfManageUsers && !isSelf && !isUserOwner;

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
          <UserOverview
            isSelf={isSelf}
            canSelfManageUser={canSelfManagerUserMetadata}
            user={user}
          />
        </Paper>
        <Paper p="lg">
          <UserPermissions
            isSelf={isSelf}
            canSelfManageUser={canSelfManageUserPermissions}
            user={user}
          />
        </Paper>
        <UserManagement
          isSelf={isSelf}
          canSelfManageUser={canSelfManageUserPermissions}
          user={user}
        />
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
