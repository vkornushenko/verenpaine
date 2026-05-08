'use client';

import { deleteReadingById } from '@/lib/api';

type DeleteButtonProps = {
  id: string;
};

export default function DeleteButton({ id }: DeleteButtonProps) {
  return <button onClick={() => deleteReadingById(id)}>delete</button>;
}
