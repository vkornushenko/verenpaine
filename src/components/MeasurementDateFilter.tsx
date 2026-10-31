'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { LuCalendarSearch, LuX } from 'react-icons/lu';
import { useLocalDate } from '@/hooks/useLocalDate';
import type { FilterName } from '@/types/filter';
import OverlayFilter from '@/components/UI/OverlayFilter';
import styles from './MeasurementDateFilter.module.css';

type MeasurementDateFilterProps = {
  title: string;
  destination?: 'home' | 'analytics';
};

const dateFormat: Intl.DateTimeFormatOptions = {
  day: '2-digit',
  month: 'short',
  year: '2-digit',
};

export default function MeasurementDateFilter({
  title,
  destination = 'home',
}: MeasurementDateFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [presetFilterName, setPresetFilterName] = useState<FilterName>('');
  const searchParams = useSearchParams();
  const from = searchParams.get('from');
  const to = searchParams.get('to');
  const hasFilterParams = searchParams.has('from') || searchParams.has('to');
  const hadFilterParams = useRef(hasFilterParams);
  const fromDate = useLocalDate(from ?? '', dateFormat);
  const toDate = useLocalDate(to ?? '', dateFormat);

  useEffect(() => {
    if (hadFilterParams.current && !hasFilterParams) {
      setPresetFilterName('');
    }

    hadFilterParams.current = hasFilterParams;
  }, [hasFilterParams]);

  const resetHref = destination === 'home' ? '/#readings' : '/analytics';

  return (
    <>
      <div className={styles.header}>
        <h2>{title}</h2>
        <button
          type='button'
          className={styles.filterButton}
          onClick={() => setIsOpen((open) => !open)}
        >
          <span>Filter Readings</span>
          <LuCalendarSearch />
        </button>
      </div>
      {from && to && (
        <div className={styles.appliedFilter}>
          <div className={styles.dateRange}>
            <span>from:</span> {fromDate} <span>to:</span> {toDate}
          </div>
          <Link
            href={resetHref}
            className={`${styles.filterButton} ${styles.resetLink}`}
          >
            <span>Reset filter</span>
            <LuX size={18} />
          </Link>
        </div>
      )}
      {isOpen && (
        <OverlayFilter
          modalToggler={() => setIsOpen(false)}
          presetFilterName={presetFilterName}
          onPresetFilterNameChange={setPresetFilterName}
          destination={destination}
        />
      )}
    </>
  );
}
