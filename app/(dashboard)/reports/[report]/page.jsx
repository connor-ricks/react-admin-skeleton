import React from 'react';
import { Text } from '@mantine/core';

/**
 * An individual report page.
 * @returns {Promise<React.JSX.Element>}
 */
export default async function ReportPage(props) {
  const params = await props.params;
  return <Text>Report {params.report}</Text>;
}
