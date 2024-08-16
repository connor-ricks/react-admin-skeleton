import React from 'react';
import {
  IconNotes,
  IconCalendarStats,
  IconGauge,
  IconPresentationAnalytics,
} from '@tabler/icons-react';

import { AccountProvider } from '@client/AccountProvider';
import { CompanyProvider } from '@client/CompanyProvider';
import { UserProvider } from '@client/UserProvider';
import { VersionProvider } from '@client/VersionProvider';
import { getAccount } from '@com/account';
import { getCompany } from '@com/company';
import { getUser } from '@com/user';
import { getVersion } from '@com/version';
import Dashboard from '@components/Dashboard';
import { validateSession } from '@server/authentication/session';

import IMenu from '@models/menu';

/**
 * The layout for the dashboard.
 * @param {Object} props - The props for the component.
 * @param {React.JSX.Element} props.children - The children of the component.
 * @returns {Promise<React.JSX.Element>}
 */
export default async function DashboardLayout({ children }) {
  // Get the account and username from the session.
  const session = await validateSession();

  // Get the version information.
  const version = await getVersion();

  // Get the company information.
  const company = await getCompany();

  // Get the account informations.
  const account = await getAccount(session.account);

  // Get the user information.
  const user = await getUser(session.account, session.username);

  // Create the menu items.
  /** @type {IMenu} */
  const menu = {
    items: [
      {
        label: 'Dashboard',
        icon: <IconGauge />,
        path: '/',
        suffix: undefined,
        children: undefined,
      },
      {
        label: 'Reports',
        icon: <IconNotes />,
        path: '/reports',
        suffix: undefined,
        children: [
          {
            label: 'Report 1',
            icon: undefined,
            path: '/1',
            suffix: undefined,
            children: undefined,
          },
          {
            label: 'Report 2',
            icon: undefined,
            path: '/2',
            suffix: undefined,
            children: undefined,
          },
          {
            label: 'Report 3',
            icon: undefined,
            path: '/3',
            suffix: undefined,
            children: undefined,
          },
        ],
      },
      {
        label: 'Analytics',
        icon: <IconPresentationAnalytics />,
        path: '/analytics',
        suffix: undefined,
        children: undefined,
      },
      {
        label: 'Appointments',
        icon: <IconCalendarStats />,
        path: '/appointments',
        suffix: undefined,
        children: [
          {
            label: 'Upcoming',
            icon: undefined,
            path: '/upcoming',
            suffix: undefined,
            children: [
              {
                label: 'Tomorrow',
                icon: undefined,
                path: '/tomorrow',
                suffix: undefined,
                children: undefined,
              },
            ],
          },
          {
            label: 'Past',
            icon: undefined,
            path: '/past',
            suffix: undefined,
            children: undefined,
          },
        ],
      },
    ],
  };

  return (
    <VersionProvider version={version}>
      <CompanyProvider company={company}>
        <AccountProvider account={account}>
          <UserProvider user={user}>
            <Dashboard menu={menu}>{children}</Dashboard>
          </UserProvider>
        </AccountProvider>
      </CompanyProvider>
    </VersionProvider>
  );
}
