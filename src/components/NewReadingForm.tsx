'use client';

import { useActionState } from 'react';

import styles from '@/components/NewReadingForm.module.css';
// import { sendNewReading } from '@/lib/api';
import { sendMeasurement } from '@/services/measurements';

const initialState = {
  message: '',
  data: null,
};

function formatDateTimeLocal(date: Date) {
  const pad = (n: number) => String(n).padStart(2, '0');

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export default function NewReadingForm() {
  // state is a data returned from the server action,
  // formAction is a function to be called on form submit,
  // pending is a boolean indicating if the action is in progress
  const [state, formAction, pending] = useActionState(
    sendMeasurement,
    initialState,
  );

  const now = new Date();

  return (
    <>
      <h2>Enter New Reading</h2>
      <form action={formAction}>
        <input type='text' placeholder='Systolic' name='systolic' />
        <input type='text' placeholder='Diastolic' name='diastolic' />
        <input type='text' placeholder='Heart Rate' name='pulse' />
        <input
          type='datetime-local'
          id='measurement-time'
          name='measurement-time'
          defaultValue={formatDateTimeLocal(now)}
        />
        <button type='submit' disabled={pending}>
          {pending ? 'Saving...' : 'Save'}
        </button>
      </form>
      {state.message && <p className={styles.infoMessage}>{state.message}</p>}
    </>
  );
}
