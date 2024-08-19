import React from 'react';
import { ColorSchemeScript } from '@mantine/core';

import App from './app';

export const metadata = {
  title: 'Blisset | Login',
};

export default function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <App>{children}</App>
      </body>
    </html>
  );
}
