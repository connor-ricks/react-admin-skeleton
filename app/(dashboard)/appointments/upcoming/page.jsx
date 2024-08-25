import { Text } from '@mantine/core';

export default function UpcomingPage({ appointments }) {
  return <Text>Upcoming Appointments: {appointments.length}</Text>;
}

export const getServerSideProps = async () => {
  return {
    props: {
      appointments: [1, 2, 3, 4, 5],
    },
  };
};
