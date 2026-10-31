'use server';

import { fetchData } from '@/lib/api';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import type {
  Measurement,
  MeasurementActionState,
} from '@/types/types';

export async function deleteMeasurementById(id: string, path: string) {
  const deletedMeasurement = await fetchData<Measurement>(
    `/api/v1/measurements/${id}`,
    { method: 'DELETE' },
  );
  if (!deletedMeasurement) redirect('/login');

  revalidateTag('readings', { expire: 0 });

  if (path !== '/') {
    redirect('/');
  }
}

export async function sendMeasurement(
  _prevState: MeasurementActionState | null,
  formData: FormData,
): Promise<MeasurementActionState> {
  const systolic = formData.get('systolic');
  const diastolic = formData.get('diastolic');
  const pulse = formData.get('pulse');
  const measurementTimeUTC = formData.get('measurement-time-UTC');

  if (
    typeof systolic !== 'string' ||
    typeof diastolic !== 'string' ||
    typeof pulse !== 'string' ||
    typeof measurementTimeUTC !== 'string' ||
    !systolic ||
    !diastolic ||
    !pulse ||
    !measurementTimeUTC
  ) {
    return { success: false, message: 'All fields are required', data: null };
  }

  const values = [systolic, diastolic, pulse].map(Number);
  if (values.some((value) => !Number.isInteger(value) || value <= 0)) {
    return {
      success: false,
      message: 'All measurement fields must be positive whole numbers',
      data: null,
    };
  }

  if (!Number.isFinite(Date.parse(measurementTimeUTC))) {
    return {
      success: false,
      message: 'Enter a valid measurement date',
      data: null,
    };
  }

  const [systolicValue, diastolicValue, pulseValue] = values;
  const newMeasurement = await fetchData<Measurement>('/api/v1/measurements', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systolic: systolicValue,
      diastolic: diastolicValue,
      pulse: pulseValue,
      date: measurementTimeUTC,
    }),
  });
  if (!newMeasurement) redirect('/login');

  revalidateTag('readings', { expire: 0 });

  return { success: true, message: 'reading saved', data: newMeasurement };
}
