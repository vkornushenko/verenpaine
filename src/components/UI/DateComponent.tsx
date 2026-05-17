'use client';

import { useEffect, useState } from 'react';
import styles from '@/components/UI/DateComponent.module.css';

type DateComponentProps = {
  date: string;
};

const options: Intl.DateTimeFormatOptions = {
  day: '2-digit',
  month: '2-digit',
  year: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
};

export default function DateComponent({ date }: DateComponentProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
  }, []);

  const formatted = new Date(date).toLocaleString(undefined, options);

  return (
    <p className={mounted ? '' : styles.dateTemplate}>
      {mounted ? formatted : 'XX/XX/XX, XX:XX'}
    </p>
  );
}
