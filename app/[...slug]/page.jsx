'use client';
import React from 'react';
import classes from './PageNotFound.module.css';
import { Button, Container, Group, Text, Title } from '@mantine/core';
import { useRouter } from 'next/navigation';

export default function PageNotFound() {
  const router = useRouter();
  return (
    <Container>
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>Nothing to see here</Title>
          <Text
            c="dimmed"
            size="lg"
            ta="center"
            className={classes.description}
          >
            Page you are trying to open does not exist. You may have mistyped
            the address, or the page has been moved to another URL. If you think
            this is an error contact support.
          </Text>
          <Group justify="center">
            <Button onClick={() => router.push('/')} size="md">
              View Dashboard
            </Button>
          </Group>
        </div>
      </div>
    </Container>
  );
}
