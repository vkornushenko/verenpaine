import MeasurementChart from '@/components/MeasurementChart';
import AnalyticsReadingsFilter from '@/components/AnalyticsReadingsFilter';
import Card from '@/components/UI/Card';
import { getAllReadings } from '@/services/measurements';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Measurement analytics',
};

export default async function Analytics({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; to?: string }>;
}) {
  const { from, to } = await searchParams;
  const readings = await getAllReadings({ start: from, end: to });
  if (!readings) redirect('/login');

  return (
    <Card>
      <AnalyticsReadingsFilter />
      {readings.length > 0 ? (
        <MeasurementChart measurements={readings} from={from} to={to} />
      ) : (
        <p>No measurements found for this time range.</p>
      )}
    </Card>
  );
}
