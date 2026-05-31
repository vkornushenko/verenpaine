'use client';

import { useActionState, useRef } from 'react';

import { sendMeasurement } from '@/services/measurements';
import { formatDateTimeLocal } from '@/lib/date';
import useFormMessageVisibility from '@/hooks/useFormMessageVisibility';
import FormStatusMessage from '@/components/UI/FormStatusMessage';

export default function NewReadingForm() {
  // state is a data returned from the server action,
  // formAction is a function to be called on form submit,
  // pending is a boolean indicating if the action is in progress
  const [state, formAction, pending] = useActionState(sendMeasurement, null);
  const { message, startEditing } = useFormMessageVisibility(state);

  // input date to utc
  const utcInputRef = useRef<HTMLInputElement>(null);
  const now = new Date();
  function handleDateChange(value: string) {
    const utc = new Date(value).toISOString();
    if (utcInputRef.current) {
      utcInputRef.current.value = utc;
    }
  }

  return (
    <>
      <h2>Enter New Reading</h2>
      <form action={formAction}>
        <input
          type='number'
          placeholder='Systolic'
          name='systolic'
          onChange={startEditing}
        />
        <input
          type='number'
          placeholder='Diastolic'
          name='diastolic'
          onChange={startEditing}
        />
        <input
          type='number'
          placeholder='Heart Rate'
          name='pulse'
          onChange={startEditing}
        />
        <input
          type='datetime-local'
          id='measurement-time'
          name='measurement-time'
          defaultValue={formatDateTimeLocal(now)}
          onChange={(e) => {
            handleDateChange(e.target.value);
            startEditing();
          }}
        />

        <input
          type='hidden'
          name='measurement-time-UTC'
          ref={utcInputRef}
          defaultValue={now.toISOString()}
        />

        <button type='submit' disabled={pending}>
          {pending ? 'Saving reading...' : 'Save reading'}
        </button>
      </form>
      {message && <FormStatusMessage message={message} />}
    </>
  );
}
