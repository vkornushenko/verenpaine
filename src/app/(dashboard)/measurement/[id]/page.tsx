
import { getMeasurementById } from '@/services/measurements';
import ReadingCard from '@/components/ReadingCard';

type Params = Promise<{ id: string }>;

export default async function ReadingPage({ params }: { params: Params }) {
  const { id } = await params;
  const readingData = await getMeasurementById(id);

  return (
    <ReadingCard readingId={id} readingData={readingData}/>
  );
}
