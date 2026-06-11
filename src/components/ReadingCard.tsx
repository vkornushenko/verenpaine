'use client';

import styles from '@/components/ReadingCard.module.css';
import { Measurement } from '@/types/types';
import Card from '@/components/UI/Card';
import { useLocalDate } from '@/hooks/useLocalDate';
import DeleteButton from '@/components/UI/buttons/DeleteButton';

type ReadingCardProps = {
  readingId: string;
  readingData: Measurement;
};

export default function ReadingCard({
  readingId,
  readingData,
}: ReadingCardProps) {
  const localDateTime = useLocalDate(readingData.date);
  return (
    <Card>
      <h2>Reading</h2>
      <div>
        <p>reading id: {readingId}</p>
        <p>date: {localDateTime}</p>
        <p>sys: {readingData.systolic}</p>
        <p>dia: {readingData.diastolic}</p>
        <p>pulse: {readingData.pulse}</p>
      </div>
      <div className={styles.measurementNav}>
        <DeleteButton id={readingId} />
      </div>
    </Card>
  );
}
