'use client';

import styles from '@/components/Readings.module.css';
import {
  type AverageMeasurements,
  type Measurement,
} from '@/types/types';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import MeasurementDateFilter from '@/components/MeasurementDateFilter';
import { formatLocalDate } from '@/lib/date';

type ReadingsProps = {
  readings: Measurement[];
  readingsCount: number;
  page: number;
  perPage: number;
  averages: AverageMeasurements;
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
  averages,
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
      date: formatLocalDate(reading.date, options),
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

  // Helper
  const searchParams = useSearchParams();
  function createQueryString(params: Record<string, string | number>) {
    const current = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      current.set(key, String(value));
    });

    return current.toString();
  }

  const from = searchParams.get('from');
  const to = searchParams.get('to');
  const analyticsParams = new URLSearchParams();
  if (from) analyticsParams.set('from', from);
  if (to) analyticsParams.set('to', to);
  const analyticsHref = analyticsParams.size
    ? `/analytics?${analyticsParams.toString()}`
    : '/analytics';

  return (
    <>
      <MeasurementDateFilter title='Recent Readings' />
      {localReadings && localReadings.length > 0 ? (
        <>
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
            <li
              className={`${styles.row} ${styles.average_row}`}
              aria-label='Average measurements'
            >
              <span className={styles.average_label}>
                <Link
                  href={analyticsHref}
                  className={styles.average_link}
                >
                  Average measurements
                  <small>Across {averages.measurementCount} readings</small>
                </Link>
              </span>
              <span className={styles.value}>
                <strong>
                  {averages.systolic === null
                    ? '—'
                    : Math.round(averages.systolic)}
                </strong>
              </span>
              <span className={styles.value}>
                <strong>
                  {averages.diastolic === null
                    ? '—'
                    : Math.round(averages.diastolic)}
                </strong>
              </span>
              <span className={styles.value}>
                <strong>
                  {averages.pulse === null
                    ? '—'
                    : Math.round(averages.pulse)}
                </strong>
              </span>
            </li>
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
                      // href={`/?page=${p}#readings`}
                      href={`/?${createQueryString({ page: p })}#readings`}
                      className={`${styles.link} ${p === page ? styles.currentPage : ''}`}
                    >
                      {p}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : undefined}
        </>
      ) : (
        <>
          <p className={styles.uxMessage}>{uxMessage}</p>
          <p className={styles.average_empty}>No readings to average</p>
        </>
      )}
    </>
  );
}
