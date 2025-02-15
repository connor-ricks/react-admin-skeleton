import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import React from 'react';
import {
  ColorSchemeScript,
  mantineHtmlProps,
  MantineProvider,
} from '@mantine/core';
import { Notifications } from '@mantine/notifications';

import { theme } from '../theme';

/**
 * The root layout for the website.
 * @param {Object} props - The props for the component.
 * @param {React.ReactNode} props.children - The children of the component.
 * @returns {Promise<React.ReactNode >}
 */
export default async function RootLayout({ children }) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <Notifications />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
