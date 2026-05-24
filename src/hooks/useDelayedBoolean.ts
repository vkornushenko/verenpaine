'use client';

import { useEffect, useState } from 'react';

export function useDelayedBoolean(value: boolean, delay = 2000) {
  const [delayedValue, setDelayedValue] = useState(false);

  useEffect(() => {
    if (!value) {
      // eslint-disable-next-line
      setDelayedValue(false);
      return;
    }

    const timer = setTimeout(() => {
      setDelayedValue(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return delayedValue;
}
