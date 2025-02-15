import React from 'react';
import Link from 'next/link';
import { Affix, Code, Container, Text, Title } from '@mantine/core';

import { getCompany } from '@com/company';
import { getVersion } from '@com/version';
import { ServerError } from '@components/EmptyStates';
import LoginForm from '@components/LoginForm';
import ThemeButton from '@components/ThemeButton';

/**
 * The login page.
 * @returns {Promise<React.ReactNode>}
 */
export default async function LoginPage() {
  try {
    // Get the company information.
    const company = await getCompany();

    // Get the version information.
    const version = await getVersion();

    return (
      <>
        <Container size={420} my={40}>
          <Title order={1} ta="center">
            {company.name}
          </Title>

          <LoginForm company={company} />

          <Text c="dimmed" mt="sm" ta="center" size="xs" fw="bold">
            Website{' '}
            <Code c="dimmed" mr="xs">
              v{version.site}
            </Code>
            ConnectCOM <Code c="dimmed">v{version.com}</Code>
          </Text>

          <Text c="dimmed" mt="sm" ta="center" size="xs">
            © Copyright {new Date().getFullYear()},{' '}
            <Link href="http://www.scsco.com">
              Support Center Services LLC.
            </Link>{' '}
            All rights reserved.
          </Text>
        </Container>

        <Affix position={{ bottom: 20, right: 20 }}>
          <ThemeButton />
        </Affix>
      </>
    );
  } catch (error) {
    return <ServerError error={error} />;
  }
}
