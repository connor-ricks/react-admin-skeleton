'use client';

import { Group, ScrollArea, Code, rem } from '@mantine/core';
import { usePathname } from 'next/navigation';

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
  { label: 'Dashboard', icon: IconGauge, link: '/' },
  {
    label: 'Reports',
    icon: IconNotes,
    initiallyOpened: false,
    link: '/reports',
    links: [
      { label: 'Report 1', link: '/1' },
      { label: 'Report 2', link: '/2' },
      { label: 'Report 3', link: '/3' },
    ],
  },
  { label: 'Analytics', icon: IconPresentationAnalytics, link: '/analytics' },
  {
    label: 'Appointments',
    icon: IconCalendarStats,
    link: '/appointments',
    links: [
      { label: 'Upcoming', link: '/upcoming' },
      { label: 'Past', link: '/past' },
    ],
  },
];

export default function NavigationBar() {
  const path = usePathname();

  const links = mockdata.map((item) => (
    <NavigationBarLinksGroup {...item} key={item.label} path={path} />
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
