'use client';

import styles from '@/components/UI/buttons/DeleteButton.module.css';
import { useDelayedBoolean } from '@/hooks/useDelayedBoolean';
import { deleteMeasurementById } from '@/services/measurements';
import { usePathname } from 'next/navigation';
import { useTransition } from 'react';
import WakingUpServer from '../WakingUpServer';
import { COLD_START_DELAY } from '@/constants/delay';

type DeleteButtonProps = {
  id: string;
};

export default function DeleteButton({ id }: DeleteButtonProps) {
  const path = usePathname();
  const [isPending, startTransition] = useTransition();

  const showColdStartMsg = useDelayedBoolean(isPending, COLD_START_DELAY);

  const handleDelete = () => {
    startTransition(async () => {
      await deleteMeasurementById(id, path);
    });
  };

  return (
    <>
      <button onClick={handleDelete} className={styles.del}>
        {isPending ? '🗑️ deleting...' : '🗑️ delete'}
      </button>
      {isPending && showColdStartMsg && <WakingUpServer />}
    </>
  );
}
