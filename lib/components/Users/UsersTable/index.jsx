'use client';
import React, { useState } from 'react';
import {
  Button,
  Checkbox,
  Group,
  Stack,
  Table,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useDisclosure } from '@mantine/hooks';
import IUser from '@models/user';
import { IconSearch, IconTrash, IconUserPlus } from '@tabler/icons-react';

import UsersTableRow from '../UsersTableRow';
import UsersTableHeader from '../UsersTableHeader';
import AddUserModal from '../AddUserModal';
import { removeUsers } from '@server/actions/users';

/**
 * A table displaying all the users associated with an account.
 * @param {Object} props - The props for the component.
 * @param {IUser} props.self - The current user.
 * @param {Array<IUser>} props.users - The users associated with the account.
 * @returns {React.ReactNode}
 */
export default function UsersTable({ self, users: initialUsers }) {
  const [users, setUsers] = useState(initialUsers);

  // State for the add user modal.
  const [
    addUserModalOpened,
    { open: openAddUserModal, close: closeAddUserModal },
  ] = useDisclosure(false);
  // State for the selected users.
  const [selection, setSelection] = useState({});
  // State for deleting users progress.
  const [isDeletingUsers, setDeletingUsers] = useState(false);
  // State for the search.
  const [search, setSearch] = useState('');
  // State for the sort key.
  const [sortBy, setSortBy] = useState('name');
  // State for the sort direction.
  const [reverseSort, setReverseSort] = useState(false);

  const selectionLength = Object.keys(selection).length;

  // Updates the selected users when a user is selected or deselected.
  function onSelectUser(isSelected, user) {
    const updatedSelection = { ...selection };
    if (isSelected) {
      updatedSelection[user.username] = true;
    } else {
      delete updatedSelection[user.username];
    }

    setSelection(updatedSelection);
  }

  // Updates the selected users when all users are selected or deselected.
  function onSelectAllUsers(isSelected) {
    const updatedSelection = {};
    if (isSelected) {
      for (const user of users) {
        updatedSelection[user.username] = true;
      }
    }

    setSelection(updatedSelection);
  }

  function onNewUserAdded(user) {
    setUsers([...users, user]);
    closeAddUserModal();
  }

  async function onDeleteUsers() {
    const usernames = Object.keys(selection);
    setDeletingUsers(true);
    const response = await removeUsers(usernames);
    if (response.success) {
      notifications.show({
        position: 'top-right',
        title: 'Users deleted',
        message: 'Users have been deleted successfully.',
        color: 'teal',
      });

      setUsers(users.filter((user) => !usernames.includes(user.username)));
    } else {
      notifications.show({
        position: 'top-right',
        title: 'Unable to delete users',
        message: response.message,
        color: 'red',
      });
    }
    setDeletingUsers(false);
  }

  // Updates the sort key and direction when a column header is clicked.
  function onSortBy(key) {
    if (key === sortBy) {
      setReverseSort(!reverseSort);
    } else {
      setSortBy(key);
      setReverseSort(false);
    }
  }

  const rows = users
    // Filter by search.
    .filter((user) => {
      return (
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.username.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
      );
    })
    // Sort by sortBy.
    .sort((a, b) => {
      if (sortBy === 'permissions') {
        // Sort by the number of permissions.
        const aPermissions = Object.keys(a.permissions).length;
        const bPermissions = Object.keys(b.permissions).length;
        return (aPermissions - bPermissions) * (reverseSort ? -1 : 1);
      } else {
        // Sort by the alphabet.
        const aValue = a[sortBy].toLowerCase();
        const bValue = b[sortBy].toLowerCase();
        return aValue.localeCompare(bValue) * (reverseSort ? -1 : 1);
      }
    })
    // Map users to rows.
    .map((user) => {
      const isSelected = selection[user.username] === true;
      return (
        <UsersTableRow
          key={user.username}
          self={self}
          user={user}
          isSelected={isSelected}
          onSelect={onSelectUser}
        />
      );
    });

  return (
    <>
      <AddUserModal
        opened={addUserModalOpened}
        onClose={closeAddUserModal}
        onSuccess={onNewUserAdded}
      />
      <Stack gap="xs">
        <Group justify="space-between">
          <Title order={3}>Users</Title>
          <Button
            leftSection={<IconUserPlus size={18} />}
            size="xs"
            onClick={openAddUserModal}
          >
            Add User
          </Button>
        </Group>
        <Group justify="space-between">
          <Group>
            <TextInput
              value={search}
              onChange={(event) => setSearch(event.currentTarget.value)}
              leftSection={<IconSearch size={18} />}
              placeholder="Search"
            />
            <Text c="dimmed">{users.length} Total users</Text>
          </Group>
          {selectionLength > 0 ? (
            <Button
              loading={isDeletingUsers}
              color="red"
              leftSection={<IconTrash size={18} />}
              size="xs"
              onClick={onDeleteUsers}
            >
              Delete {selectionLength} User
              {selectionLength > 1 ? 's' : ''}
            </Button>
          ) : null}
        </Group>
        <Table.ScrollContainer minWidth={500} style={{ flex: 1 }}>
          <Table
            verticalSpacing="md"
            horizontalSpacing="md"
            highlightOnHover
            highlightOnHoverColor="light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-8))"
          >
            <Table.Thead>
              <Table.Tr>
                <Table.Th>
                  <Checkbox
                    aria-label="Select row"
                    checked={selectionLength === users.length}
                    indeterminate={
                      selectionLength > 0 && !(selectionLength === users.length)
                    }
                    onChange={(event) =>
                      onSelectAllUsers(event.currentTarget.checked)
                    }
                  />
                </Table.Th>
                <UsersTableHeader
                  name="Name"
                  sortKey="name"
                  selectedSortKey={sortBy}
                  isReversed={reverseSort}
                  onSortBy={onSortBy}
                />
                <UsersTableHeader
                  name="Username"
                  sortKey="username"
                  selectedSortKey={sortBy}
                  isReversed={reverseSort}
                  onSortBy={onSortBy}
                />
                <UsersTableHeader
                  name="Email"
                  sortKey="email"
                  selectedSortKey={sortBy}
                  isReversed={reverseSort}
                  onSortBy={onSortBy}
                />
                <UsersTableHeader
                  name="Permissions"
                  sortKey="permissions"
                  selectedSortKey={sortBy}
                  isReversed={reverseSort}
                  onSortBy={onSortBy}
                />
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Stack>
    </>
  );
}
