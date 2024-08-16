import '@mantine/core/styles.css';
import React from 'react';
import {
  ColorSchemeScript,
  mantineHtmlProps,
  MantineProvider,
} from '@mantine/core';

import { theme } from '../theme';

/**
 * The root layout for the website.
 * @param {Object} props - The props for the component.
 * @param {React.JSX.Element} props.children - The children of the component.
 * @returns {Promise<React.JSX.Element>}
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
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </body>
    </html>
  );
}
