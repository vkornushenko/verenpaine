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
      <div className={styles.table}>
        <div>Reading id:</div>
        <div> {readingId}</div>
        <div>Date:</div>
        <div>{localDateTime}</div>
        <div>Sys:</div>
        <div>{readingData.systolic}</div>
        <div>Dia:</div>
        <div>{readingData.diastolic}</div>
        <div>Pulse:</div>
        <div>{readingData.pulse}</div>
      </div>
      <div className={styles.measurementNav}>
        <DeleteButton id={readingId} />
      </div>
    </Card>
  );
}
