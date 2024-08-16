import React, { useState } from 'react';
import classes from './NavigationBarLinksGroup.module.css';
import { useRouter } from 'next/navigation';
import {
  Box,
  Collapse,
  Group,
  rem,
  Text,
  ThemeIcon,
  UnstyledButton,
} from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';

export default function NavigationBarLinksGroup({
  icon,
  label,
  initiallyOpened,
  link,
  links,
  path,
}) {
  const router = useRouter();
  const [opened, setOpened] = useState(initiallyOpened || false);

  const hasChildren = Array.isArray(links);
  const children = (hasChildren ? links : []).map((child) => {
    const isSelected = path.startsWith(link + child.link);
    return (
      <Text
        key={child.label}
        className={`${isSelected ? classes.selected : null} ${classes.link}`}
        onClick={() => router.push(link + child.link)}
      >
        {child.label}
      </Text>
    );
  });

  const isChildSelected =
    (hasChildren ? links : []).find((l) => {
      return path.startsWith(link + l.link);
    }) != undefined;

  const isSelected =
    link === '/'
      ? path === link
      : link && path.startsWith(link) && !isChildSelected;

  return (
    <>
      <UnstyledButton
        onClick={() => {
          if (hasChildren) {
            setOpened((o) => !o);
          } else {
            router.push(link);
          }
        }}
        className={`${classes.control} ${
          isSelected ? classes.selected : null
        } ${isChildSelected ? classes.childSelected : null}`}
      >
        <Group justify="space-between" gap={0}>
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <ThemeIcon
              variant="light"
              size={30}
              styles={{
                root: { padding: 4 },
              }}
            >
              {icon}
            </ThemeIcon>
            <Box ml="md">{label}</Box>
          </Box>
          {hasChildren && (
            <IconChevronRight
              className={classes.chevron}
              stroke={1.5}
              style={{
                width: rem(16),
                height: rem(16),
                transform: opened ? 'rotate(-90deg)' : 'none',
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasChildren ? <Collapse in={opened}>{children}</Collapse> : null}
    </>
  );
}
