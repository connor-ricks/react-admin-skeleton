import React from 'react';
import { getVersion } from '@com/version';
import { getAccount } from '@com/account';
import { getCompany } from '@com/company';
import { getUser } from '@com/users';
import Dashboard from '@components/Dashboard';
import { ServerError } from '@components/EmptyStates';

/**
 * The layout for the dashboard.
 * @param {Object} props - The props for the component.
 * @param {React.ReactNode} props.children - The children of the component.
 * @returns {Promise<React.ReactNode >}
 */
export default async function DashboardLayout({ children }) {
  try {
    // Get the version information.
    const version = await getVersion();

    // Get the company information.
    const company = await getCompany();

    // Get the account information.
    const account = await getAccount();

    // Get the current user.
    const user = await getUser();

    return (
      <Dashboard
        version={version}
        company={company}
        account={account}
        user={user}
      >
        {children}
      </Dashboard>
    );
  } catch (error) {
    return <ServerError error={error} />;
  }
}
