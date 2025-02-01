import React from 'react';
import { Text } from '@mantine/core';
import { getAccount } from '@com/account';

/**
 * A page for viewing account information.
 * @returns {Promise<React.ReactNode >}
 */
export default async function AccountPage() {
  // Get the account information.
  const account = await getAccount();

  return <Text>{account.name}</Text>;
}
