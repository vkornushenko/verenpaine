import { useEffect, useState } from 'react';
import { formatLocalDate } from '@/lib/date';

const defaultOptions: Intl.DateTimeFormatOptions = {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
};

export function useLocalDate(
  date: string,
  options: Intl.DateTimeFormatOptions = defaultOptions,
) {
  const [localDate, setLocalDate] = useState('');

  useEffect(() => {
    // eslint-disable-next-line
    setLocalDate(formatLocalDate(date, options));
  }, [date, options]);

  return localDate;
}
