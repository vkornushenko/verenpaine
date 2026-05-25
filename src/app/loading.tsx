'use client';

import { useEffect, useState } from 'react';
import { COLD_START_DELAY } from '@/constants/delay';

import WakingUpServer from '@/components/UI/WakingUpServer';

export default function Loading() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, COLD_START_DELAY);

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;
  return <WakingUpServer />;
}
