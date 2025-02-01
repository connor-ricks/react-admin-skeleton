'use client';
import React from 'react';
import { Button, Table } from '@mantine/core';
import {
  IconChevronDown,
  IconChevronUp,
  IconSelector,
} from '@tabler/icons-react';
/**
 * A header column for the users table.
 * @param {Object} props - The props for the component.
 * @param {string} props.name - The name of the header.
 * @param {string} props.sortKey - The sort key of the header.
 * @param {string} props.selectedSortKey - The currently selected sort key.
 * @param {boolean} props.isReversed - Whether the sort is reversed.
 * @param {(string) => void} props.onSortBy - The function to call when the header is clicked.
 * @returns {React.ReactNode}
 */
export default function UsersTableHeader({
  name,
  sortKey,
  selectedSortKey,
  isReversed,
  onSortBy,
}) {
  const icon =
    selectedSortKey === sortKey ? (
      isReversed ? (
        <IconChevronUp size={18} />
      ) : (
        <IconChevronDown size={18} />
      )
    ) : (
      <IconSelector size={18} />
    );

  return (
    <Table.Th>
      <Button
        px="xs"
        color="gray"
        fullWidth
        variant="subtle"
        radius={0}
        justify="space-between"
        rightSection={icon}
        onClick={() => onSortBy(sortKey)}
      >
        {name}
      </Button>
    </Table.Th>
  );
}
