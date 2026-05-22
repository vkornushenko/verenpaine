'use client';

import styles from '@/components/Readings.module.css';
import { type Measurement } from '@/types/types';
import Reading from './Reading';
import { useEffect, useState } from 'react';

type ReadingsProps = {
  readings: Measurement[];
};

const options: Intl.DateTimeFormatOptions = {
  day: '2-digit',
  month: '2-digit',
  year: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
};

export default function Readings({ readings }: ReadingsProps) {
  const [localReadings, setLocalReadings] = useState<Measurement[] | null>(
    null,
  );

  useEffect(() => {
    const localReadings = readings.map((reading) => ({
      ...reading,
      date: new Date(reading.date).toLocaleString(undefined, options),
    }));
    // eslint-disable-next-line
    setLocalReadings(localReadings);
  }, [readings]);

  console.count('Readings rendered');
  // console.log(localReadings);

  // conditional message
  let uxMessage;
  if (!localReadings) {
    uxMessage = 'Loading readings...';
  }
  if (localReadings && localReadings.length === 0) {
    uxMessage = 'No readings found';
  }

  return (
    <>
      {localReadings && localReadings.length > 0 ? (
        <>
          <div className={styles.header}>
            <h2>Recent Readings</h2>
          </div>
          <ul className={styles.readingsList}>
            {localReadings.map((reading) => (
              <Reading key={reading._id} reading={reading} />
            ))}
          </ul>
        </>
      ) : (
        <p className={styles.uxMessage}>{uxMessage}</p>
      )}
    </>
  );
}
