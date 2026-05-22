'use client';

import { useActionState, useRef } from 'react';

// import { sendNewReading } from '@/lib/api';
import { sendMeasurement } from '@/services/measurements';
import { formatDateTimeLocal } from '@/lib/date';
import { MeasurementFormState } from '@/types/types';
// import Message from '@/components/UI/Message';

const initialState: MeasurementFormState = {
  ok: false,
  message: '',
  data: null,
};

export default function NewReadingForm() {
  console.count('NewReadingForm rendered');
  // state is a data returned from the server action,
  // formAction is a function to be called on form submit,
  // pending is a boolean indicating if the action is in progress
  const [state, formAction, pending] = useActionState(
    sendMeasurement,
    initialState,
  );

  // console.log(state);

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
        {/* <label htmlFor='systolic'>Systolic</label> */}
        <input type='number' placeholder='Systolic' name='systolic' />
        <input type='number' placeholder='Diastolic' name='diastolic' />
        <input type='number' placeholder='Heart Rate' name='pulse' />

        <input
          type='datetime-local'
          id='measurement-time'
          // name='measurement-time'
          defaultValue={formatDateTimeLocal(now)}
          onChange={(e) => {
            handleDateChange(e.target.value);
          }}
        />

        <input
          type='hidden'
          name='measurement-time-UTC'
          ref={utcInputRef}
          defaultValue={now.toISOString()}
        />

        <button type='submit' disabled={pending}>
          {pending ? 'Saving...' : 'Save'}
        </button>
      </form>
    </>
  );
}
