'use client';

import styles from '@/components/Readings.module.css';
import { type Measurement } from '@/types/types';
import { useEffect, useState } from 'react';
import Link from 'next/link';

type ReadingsProps = {
  readings: Measurement[];
};

const options: Intl.DateTimeFormatOptions = {
  day: '2-digit',
  month: 'short',
  // year: '2-digit',
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
          <h2>Recent Readings</h2>
          <ul className={styles.readings_table}>
            <li className={`${styles.row} ${styles.header}`}>
              <span>date / time</span>
              <span className={styles.value}>sys</span>
              <span className={styles.value}>dia</span>
              <span className={styles.value}>pulse</span>
            </li>
            {localReadings.map((reading) => (
              <li
                key={reading._id}
                className={styles.reading_list_item}
                
              >
                <Link
                  className={`${styles.row} ${styles.reading}`}
                  href={`/measurement/${reading._id}`}
                >
                  <span>{reading.date}</span>
                  <span className={styles.value}>{reading.systolic}</span>
                  <span className={styles.value}>{reading.diastolic}</span>
                  <span className={styles.value}>{reading.pulse}</span>
                </Link>
              </li>
            ))}

            {/* {localReadings.map((reading) => (
              <Reading key={reading._id} reading={reading} />
            ))} */}
          </ul>
        </>
      ) : (
        <p className={styles.uxMessage}>{uxMessage}</p>
      )}
    </>
  );
}
