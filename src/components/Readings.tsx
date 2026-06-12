'use client';

import styles from '@/components/Readings.module.css';
import { type Measurement } from '@/types/types';
import { useEffect, useState } from 'react';
import Link from 'next/link';

type ReadingsProps = {
  readings: Measurement[];
  readingsCount: number;
  page: number;
  perPage: number;
};

const options: Intl.DateTimeFormatOptions = {
  day: '2-digit',
  month: 'short',
  // year: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
};

export default function Readings({
  readings,
  readingsCount,
  page,
  perPage,
}: ReadingsProps) {
  // local stands for local timeZone
  const [localReadings, setLocalReadings] = useState<Measurement[] | null>(
    null,
  );

  const pages = Array.from(
    { length: Math.ceil(readingsCount / perPage) },
    (_, i) => i + 1,
  );

  useEffect(() => {
    const localReadings = readings.map((reading) => ({
      ...reading,
      date: new Date(reading.date).toLocaleString(undefined, options),
    }));
    // eslint-disable-next-line
    setLocalReadings(localReadings);
  }, [readings]);

  // conditional message
  let uxMessage;
  if (!localReadings) {
    uxMessage = 'Loading readings...';
  }
  if (localReadings && localReadings.length === 0) {
    uxMessage = 'No readings found';
  }

  const pageListOffset =
    pages.length > 5 && page > 3
      ? -30 * (Math.min(page, pages.length - 2) - 3)
      : 0;

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
              <li key={reading._id} className={styles.reading_list_item}>
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

          {pages.length > 1 ? (
            <div className={styles.page_list_container}>
              <ul
                className={styles.pageList}
                style={{ left: `${pageListOffset}px` }}
              >
                {pages.map((p) => (
                  <li key={p}>
                    <Link
                      href={`/?page=${p}#readings`}
                      className={`${styles.link} ${p === page ? styles.currentPage : ''}`}
                    >
                      <strong>{p}</strong>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : undefined}
        </>
      ) : (
        <p className={styles.uxMessage}>{uxMessage}</p>
      )}
    </>
  );
}
