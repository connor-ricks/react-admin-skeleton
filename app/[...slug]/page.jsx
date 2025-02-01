'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@mantine/core';

import { NotFound } from '@components/EmptyStates';

/**
 * A component that informs the user that the page they are trying to visit does not exist.
 * @returns {React.ReactNode}
 */
export default function NotFoundPage() {
  const router = useRouter();

  return (
    <NotFound
      title="Nothing to see here"
      description="The page you are trying to visit does not exist. You may have mistyped the address, or the page has been moved to another URL. If you think this is an error contact support."
    >
      <Button onClick={() => router.push('/')} size="md">
        Back to Dashboard
      </Button>
    </NotFound>
  );
}
