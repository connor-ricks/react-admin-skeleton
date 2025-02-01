'use client';
import classes from './ServerError.module.css';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Container, Group, Text, Title } from '@mantine/core';

/**
 * A component that informs the user that there was an internal server error.
 * @param {Object} props - The props for the component.
 * @param {Error} props.error - The error that occurred.
 * @returns {React.ReactNode}
 */
export default function ServerError({ error }) {
  const router = useRouter();

  // Refresh the site to attempt the site in hopes of resolving the error.
  useEffect(() => {
    router.refresh();
  }, []);

  if (process.env.NODE_ENV !== 'production') {
    throw error;
  }

  return (
    <Container>
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>Something unexpected happened</Title>
          <Text
            c="dimmed"
            size="lg"
            ta="center"
            className={classes.description}
          >
            An internal server error occurred. Please try again later. If the
            issue persists, please contact support.
          </Text>
          <Group justify="center">
            <Button onClick={() => router.back()}>Go back</Button>
          </Group>
        </div>
      </div>
    </Container>
  );
}
