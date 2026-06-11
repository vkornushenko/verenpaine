import Readings from '@/components/Readings';
import NewReadingForm from '@/components/NewReadingForm';
import Card from '@/components/UI/Card';
import { getReadings } from '@/services/measurements';
import { Activity } from 'react';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {

  const params = await searchParams;

  const page = Number(params.page ?? 1);
  const perPage = 25;
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1).toISOString();
  const end = new Date(now.getFullYear() + 1, 0, 1).toISOString();

  const { data, totalMeasurements } = await getReadings({
    page,
    perPage,
    start,
    end,
    sort: 'desc',
  });

  return (
    <>
      <Card>
        <NewReadingForm />
      </Card>
      <Activity mode={data ? 'visible' : 'hidden'}>
        <Card>
          <Readings
            readings={data}
            readingsCount={totalMeasurements}
            page={page}
            perPage={perPage}
          />
        </Card>
      </Activity>
    </>
  );
}
