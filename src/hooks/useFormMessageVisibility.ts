import { AuthActionState, MeasurementActionState } from '@/types/types';
import { useEffect, useState } from 'react';

export default function useFormMessageVisibility(
  state: AuthActionState | MeasurementActionState | null,
) {
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (state) {
      // eslint-disable-next-line
      setIsEditing(false);
    }
  }, [state]);

  const message =
    state && state.message && !state.success && !isEditing
      ? state.message
      : null;

  return {
    startEditing: () => setIsEditing(true),
    message,
  };
}
