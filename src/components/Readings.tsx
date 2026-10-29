'use client';

import styles from '@/components/Readings.module.css';
import { type FilterName, type Measurement } from '@/types/types';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { LuCalendarSearch, LuX } from 'react-icons/lu';
import { FaFilter } from 'react-icons/fa';
import OverlayFilter from './UI/OverlayFilter';
import { useSearchParams } from 'next/navigation';
import { useLocalDate } from '@/hooks/useLocalDate';

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

const optionsForFilter: Intl.DateTimeFormatOptions = {
  day: '2-digit',
  month: 'short',
  year: '2-digit',
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
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [presetFilterName, setPresetFilterName] = useState<FilterName>('');

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

  function toggleOverlayFilter() {
    setIsOpenFilter((prevState) => !prevState);
  }

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
  const hasFilterParams = searchParams.has('from') || searchParams.has('to');
  const hadFilterParams = useRef(hasFilterParams);
  const fromDate = useLocalDate(from ?? '', optionsForFilter);
  const toDate = useLocalDate(to ?? '', optionsForFilter);

  useEffect(() => {
    if (hadFilterParams.current && !hasFilterParams) {
      setPresetFilterName('');
    }

    hadFilterParams.current = hasFilterParams;
  }, [hasFilterParams]);

  return (
    <>
      <div className={styles.header_container}>
        <h2>Recent Readings</h2>
        <div
          className={styles.secondary_button}
          onClick={toggleOverlayFilter}
        >
          <p>Filter Readings</p>
          <LuCalendarSearch />
        </div>
      </div>

      {from && to && (
        <div className={styles.applied_filter_container}>
          <div className={styles.from_to_container}>
            <span>from:</span> {fromDate} <span>to:</span> {toDate}
          </div>
          <Link href={'/#readings'} className={`${styles.secondary_button} ${styles.accent_link}`}>
            <p>Reset filter</p>
            <LuX size={18}/>
          </Link>
        </div>
      )}
      {localReadings && localReadings.length > 0 ? (
        <>
          <ul className={styles.readings_table}>
            <li className={`${styles.row} ${styles.header}`}>
              <span>
                <div
                  className={styles.date_time_header}
                  onClick={toggleOverlayFilter}
                >
                  date / time <FaFilter />
                </div>
              </span>
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
        <p className={styles.uxMessage}>{uxMessage}</p>
      )}
      {isOpenFilter && (
        <OverlayFilter
          modalToggler={toggleOverlayFilter}
          presetFilterName={presetFilterName}
          onPresetFilterNameChange={setPresetFilterName}
        />
      )}
    </>
  );
}
