import { useEffect, useState } from 'react';

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
    setLocalDate(new Date(date).toLocaleString(undefined, options));
  }, [date, options]);

  return localDate;
}
