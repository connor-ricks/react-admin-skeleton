'use client';
import classes from './ThemeButton.module.css';
import React from 'react';
import { useMantineColorScheme, ActionIcon } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';

export default function ThemeButton() {
  const { toggleColorScheme } = useMantineColorScheme();
  return (
    <>
      <ActionIcon
        className={classes.light}
        color="indigo"
        onClick={toggleColorScheme}
        title="Toggle color scheme"
      >
        <IconMoon className={classes.themeIcon} />
      </ActionIcon>
      <ActionIcon
        className={classes.dark}
        color="yellow"
        onClick={toggleColorScheme}
        title="Toggle color scheme"
      >
        <IconSun className={classes.themeIcon} />
      </ActionIcon>
    </>
  );
}
