import Readings from '@/components/Readings';
import NewReadingForm from '@/components/NewReadingForm';
import Card from '@/components/UI/Card';
import { getAverageReadings, getReadings } from '@/services/measurements';
import { Activity } from 'react';
import { redirect } from 'next/navigation';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page: string; from?: string; to?: string; perPage?: string }>;
}) {

  const params = await searchParams;

  const page = Number(params.page ?? 1);
  const perPage = Number(params.perPage ?? 10);
  // const now = new Date();
  const start = params.from;
  const end = params.to;

  const [readings, averages] = await Promise.all([
    getReadings({
      page,
      perPage,
      start,
      end,
      sort: 'desc',
    }),
    getAverageReadings({ start, end }),
  ]);
  if (!readings || !averages) redirect('/login');
  const { data, totalMeasurements } = readings;

  return (
    <>
      <Card>
        <NewReadingForm />
      </Card>
      <Activity mode={data ? 'visible' : 'hidden'}>
        <Card id='readings'>
          <Readings
            readings={data}
            readingsCount={totalMeasurements}
            page={page}
            perPage={perPage}
            averages={averages}
          />
        </Card>
      </Activity>
    </>
  );
}
