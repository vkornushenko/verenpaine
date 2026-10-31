import AccountCard from '@/components/AccountCard';
import { getReadings } from '@/services/measurements';
import { getUser } from '@/services/user';
import { redirect } from 'next/navigation';

export default async function AccountPage() {
  const [user, readings] = await Promise.all([
    getUser(),
    getReadings({
      perPage: 1,
      sort: 'asc',
    }),
  ]);
  if (!user || !readings) redirect('/login');

  return (
    <AccountCard
      user={user}
      totalMeasurements={readings.totalMeasurements}
      firstReading={readings.data[0]?.date}
    />
  );
}
