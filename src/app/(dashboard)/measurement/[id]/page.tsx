
import { getMeasurementById } from '@/services/measurements';
import ReadingCard from '@/components/ReadingCard';
import { redirect } from 'next/navigation';

type ReadingPageParams = Promise<{ id: string }>;

export default async function ReadingPage({ params }: { params: ReadingPageParams }) {
  const { id } = await params;
  const readingData = await getMeasurementById(id);
  if (!readingData) redirect('/login');

  return (
    <ReadingCard readingId={id} readingData={readingData}/>
  );
}
