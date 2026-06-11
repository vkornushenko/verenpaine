import AccountCard from '@/components/AccountCard';
import { getReadings } from '@/services/measurements';
import { getUser } from '@/services/user';

export default async function AccountPage() {
  const user = await getUser();

  const { totalMeasurements, data } = await getReadings({
    perPage: 1,
    sort: 'asc',
  });

  return (
    <AccountCard
      user={user}
      totalMeasurements={totalMeasurements}
      firstReading={data[0].date}
    />
  );
}
