'use client';
import classes from './NoPermissions.module.css';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Container, Group, Text, Title } from '@mantine/core';

/**
 * A component that informs the user that they are lacking permissions to view the resource.
 * @returns {React.ReactNode}
 * @param {Object} props - The props for the component.
 * @param {React.ReactNode | string | undefined} [props.title] - The title of the component.
 * @param {React.ReactNode | string} props.description - The description of the component.
 * @param {React.ReactNode | undefined} [props.children] - The button for the component.
 */
export default function NoPermissions({ title, description, children }) {
  const router = useRouter();
  title = title === undefined ? 'Permissions denied' : title;
  children =
    children === undefined ? (
      <Button onClick={() => router.back()}>Go back</Button>
    ) : (
      children
    );

  // Refresh the site to attempt an update to the user's permissions.
  useEffect(() => {
    router.refresh();
  }, []);

  return (
    <Container>
      <div className={classes.inner}>
        <div className={classes.content}>
          {typeof title === 'string' ? (
            <Title className={classes.title}>{title}</Title>
          ) : (
            title
          )}
          {typeof description === 'string' ? (
            <Text
              c="dimmed"
              size="lg"
              ta="center"
              className={classes.description}
            >
              {description}
            </Text>
          ) : (
            description
          )}

          {children ? <Group justify="center">{children}</Group> : null}
        </div>
      </div>
    </Container>
  );
}
