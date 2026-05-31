'use client';

import styles from '@/components/UI/buttons/DeleteButton.module.css';
import { deleteMeasurementById } from '@/services/measurements';
import { usePathname } from 'next/navigation';
import { useTransition } from 'react';
import { MdDeleteForever } from 'react-icons/md';

type DeleteButtonProps = {
  id: string;
};

export default function DeleteButton({ id }: DeleteButtonProps) {
  const path = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleDelete = async() => {
    startTransition(async () => {
      await deleteMeasurementById(id, path);
    });
  };

  return (
    <>
      <button onClick={handleDelete} className={styles.del} disabled={isPending}>
        <MdDeleteForever/>
        {isPending ? 'Deleting...' : 'Delete'}
      </button>
    </>
  );
}
