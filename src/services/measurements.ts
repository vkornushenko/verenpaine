'use server';

import { fetchData } from '@/lib/api';
import {
  MeasurementActionState,
  type Measurement,
  type tagName,
} from '@/types/types';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

export async function getReadings() {
  const tagName: tagName = 'readings';
  // TODO change tag 'readings' to 'measurements' later
  return fetchData<Measurement[]>('/api/v1/measurements/', {
    method: 'GET',
    next: { tags: [tagName] },
    // cache: 'force-cache',
  });
}

export async function getMeasurementById(id: string) {
  // const tagName: tagName = 'reading';
  // TODO change tag 'reading' to 'measurement' later
  return fetchData<Measurement>(`/api/v1/measurements/${id}`, {
    method: 'GET',
    // next: { tags: [tagName] },
    // cache: 'force-cache',
  });
}

export async function deleteMeasurementById(id: string, path: string) {
  // array of tags to revalidate after deleting complition
  // const tagsArray: tagName[] = ['reading', 'readings'];

  await fetchData<void>(`/api/v1/measurements/${id}`, {
    method: 'DELETE',
  });

  // tagsArray.map((tag) => {
  //   revalidateTag(tag, { expire: 0 });
  // });

  // tagsArray.forEach((tag) => revalidateTag(tag, { expire: 0 }));
  revalidateTag('readings', { expire: 0 });

  // check if user was at measurement/[id] page
  // because measurement/[id] page is not existing anymore
  if (path !== '/') {
    redirect('/');
  }
}

export async function sendMeasurement(
  prevState: MeasurementActionState | null,
  formData: FormData,
): Promise<MeasurementActionState> {
  const systolic = formData.get('systolic') as string;
  const diastolic = formData.get('diastolic') as string;
  const pulse = formData.get('pulse') as string;
  const measurementTimeUTC = formData.get('measurement-time-UTC') as string;

  // empty fields check
  if (!systolic || !diastolic || !pulse || !measurementTimeUTC) {
    return { success: false, message: 'All fields are required', data: null };
  }

  // convert to number
  const sysNum = Number(systolic);
  const diaNum = Number(diastolic);
  const pulseNum = Number(pulse);

  // number check
  if (isNaN(sysNum) || isNaN(diaNum) || isNaN(pulseNum)) {
    return {
      success: false,
      message: 'All measurement fields must be valid numbers',
      data: null,
    };
  }

  const newMeasurement = await fetchData<Measurement>('/api/v1/measurements', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systolic: sysNum,
      diastolic: diaNum,
      pulse: pulseNum,
      date: measurementTimeUTC,
    }),
  });

  // tag to revalidate
  const tagName: tagName = 'readings';
  revalidateTag(tagName, { expire: 0 });

  return { success: true, message: 'reading saved', data: newMeasurement };
}

// export async function refreshDataByTagName(tagName: tagName) {
//   revalidateTag(tagName, { expire: 0 });
// }
