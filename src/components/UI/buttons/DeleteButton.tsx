'use client';

import styles from '@/components/UI/buttons/DeleteButton.module.css'
import { deleteMeasurementById } from '@/services/measurements';
import { usePathname } from 'next/navigation'

type DeleteButtonProps = {
  id: string;
};

export default function DeleteButton({ id }: DeleteButtonProps) {
  const path = usePathname();
  return <button onClick={() => deleteMeasurementById(id, path)} className={styles.del}>🗑️</button>;
}
