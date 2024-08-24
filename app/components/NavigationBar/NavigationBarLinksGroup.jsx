import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  Text,
  UnstyledButton,
  rem,
} from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';

import classes from './NavigationBarLinksGroup.module.css';

export default function NavigationBarLinksGroup({
  icon: Icon,
  label,
  initiallyOpened,
  link,
  links,
  path,
}) {
  const hasLinks = Array.isArray(links);

  const router = useRouter();
  const [opened, setOpened] = useState(initiallyOpened || false);

  const items = (hasLinks ? links : []).map((child) => {
    const isSelected = path.startsWith(link + child.link);
    return (
      <Text
        className={[isSelected ? classes.selected : null, classes.link]}
        href={child.link}
        key={child.label}
        onClick={() => router.push(link + child.link)}
      >
        {child.label}
      </Text>
    );
  });

  const isChildSelected =
    (hasLinks ? links : []).find((l) => {
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
          if (hasLinks) {
            setOpened((o) => !o);
          } else {
            router.push(link);
          }
        }}
        className={[
          classes.control,
          isSelected ? classes.selected : null,
          isChildSelected ? classes.childSelected : null,
        ]}
      >
        <Group justify="space-between" gap={0}>
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <ThemeIcon variant="light" size={30}>
              <Icon style={{ width: rem(18), height: rem(18) }} />
            </ThemeIcon>
            <Box ml="md">{label}</Box>
          </Box>
          {hasLinks && (
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
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}
