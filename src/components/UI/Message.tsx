'use client';

import styles from '@/components/UI/Message.module.css';
// import { useState } from 'react';

import { type MeasurementFormState } from '@/types/types';

export default function Message({ state }: { state: MeasurementFormState }) {
  return (
    <p
      className={`${styles.message} ${
        state.ok ? styles.infoMessage : styles.errorMessage
      }`}
    >
      {state.ok ? '✅ ' : '❌ '}
      {state.message}
    </p>
  );
}
