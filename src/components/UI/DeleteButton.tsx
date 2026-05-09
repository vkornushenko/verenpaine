'use client';

import { deleteReadingById } from '@/lib/api';
import styles from '@/components/UI/DeleteButton.module.css'

type DeleteButtonProps = {
  id: string;
};

export default function DeleteButton({ id }: DeleteButtonProps) {
  return <button onClick={() => deleteReadingById(id)} className={styles.del}>🗑️</button>;
}
