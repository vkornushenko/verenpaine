'use server';

import { fetchData } from '@/lib/api';
import { formateDateToIso } from '@/lib/date';
import { type Measurement, type tagName } from '@/types/types';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

export async function getMeasurements() {
  const tagName: tagName = 'readings';
  // TODO change tag 'readings' to 'measurements' later
  return fetchData<Measurement[]>('/api/v1/measurements/', {
    method: 'GET',
    next: { tags: [tagName] },
    cache: 'force-cache',
  });
}

export async function getMeasurementById(id: string) {
  const tagName: tagName = 'reading';
  // TODO change tag 'reading' to 'measurement' later
  return fetchData<Measurement>(`/api/v1/measurements/${id}`, {
    method: 'GET',
    next: { tags: [tagName] },
    cache: 'force-cache',
  });
}

export async function deleteMeasurementById(id: string, path: string) {
  // array of tags to revalidate after deleting complition
  const tagsArray: tagName[] = ['reading', 'readings'];

  await fetchData<void>(`/api/v1/measurements/${id}`, {
    method: 'DELETE',
  });

  tagsArray.map((tag) => {
    revalidateTag(tag, { expire: 0 });
  });

  // check if user was at measurement/[id] page
  // because measurement/[id] page is not existing anymore
  if (path !== '/') {
    redirect('/');
  }
}

export async function sendMeasurement(prevState: unknown, formData: FormData) {
  const systolic = formData.get('systolic') as string;
  const diastolic = formData.get('diastolic') as string;
  const pulse = formData.get('pulse') as string;
  const measurementTime = formData.get('measurement-time') as string;

  // converting date to save in DB
  const measurementIsoStringDate = formateDateToIso(measurementTime);

  // empty fields check
  if (!systolic || !diastolic || !pulse) {
    return { message: 'All fields are required' };
  }

  // convert to number
  const sysNum = Number(systolic);
  const diaNum = Number(diastolic);
  const pulseNum = Number(pulse);

  // number check
  if (isNaN(sysNum) || isNaN(diaNum) || isNaN(pulseNum)) {
    return { message: 'All fields must be valid numbers' };
  }

  // tag to revalidate
  const tagName: tagName = 'readings';

  const newMeasurement = await fetchData<Measurement>('/api/v1/measurements', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systolic: sysNum,
      diastolic: diaNum,
      pulse: pulseNum,
      date: measurementIsoStringDate,
    }),
  });

  revalidateTag(tagName, { expire: 0 });

  return { message: 'reading saved', newMeasurement };
}
