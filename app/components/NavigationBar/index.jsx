import { Group, ScrollArea, Code, rem } from '@mantine/core';

import {
  IconNotes,
  IconCalendarStats,
  IconGauge,
  IconPresentationAnalytics,
  IconFileAnalytics,
} from '@tabler/icons-react';

import classes from './NavigationBar.module.css';
import NavigationBarLinksGroup from './NavigationBarLinksGroup';
import NavigationBarFooter from './NavigationBarFooter';
import { Logo } from './logo';

const mockdata = [
  { label: 'Dashboard', icon: IconGauge },
  {
    label: 'Reports',
    icon: IconNotes,
    initiallyOpened: false,
    links: [
      { label: 'Report 1', link: '/' },
      { label: 'Report 2', link: '/' },
      { label: 'Report 3', link: '/' },
    ],
  },
  { label: 'Analytics', icon: IconPresentationAnalytics },
  { label: 'Contracts', icon: IconFileAnalytics },
  {
    label: 'Settings',
    icon: IconCalendarStats,
    links: [
      { label: 'Settings 1', link: '/' },
      { label: 'Settings 2', link: '/' },
    ],
  },
];

export default function NavigationBar() {
  const links = mockdata.map((item) => (
    <NavigationBarLinksGroup {...item} key={item.label} />
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Group justify="space-between">
          <Logo style={{ width: rem(120) }} />
          <Code fw={700}>v3.1.2</Code>
        </Group>
      </div>

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>

      <div className={classes.footer}>
        <NavigationBarFooter />
      </div>
    </nav>
  );
}
