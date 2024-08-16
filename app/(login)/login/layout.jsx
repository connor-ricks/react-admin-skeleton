import React from 'react';
import { CompanyProvider } from '@client/CompanyProvider';
import { VersionProvider } from '@client/VersionProvider';
import { getCompany } from '@com/company';
import { getVersion } from '@com/version';

/**
 * The layout for the login page.
 * @param {Object} props - The props for the component.
 * @param {React.JSX.Element} props.children - The children of the component.
 * @returns {Promise<React.JSX.Element>}
 */
export default async function LoginLayout({ children }) {
  // Get the version information.
  const version = await getVersion();
  // Get the company information.
  const company = await getCompany();

  return (
    <VersionProvider version={version}>
      <CompanyProvider company={company}>{children}</CompanyProvider>
    </VersionProvider>
  );
}
