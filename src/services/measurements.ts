import { fetchData } from '@/lib/apiNewApproach';
import { type Measurement } from '@/types/types';

export async function getMeasurements() {
  // TODO change tag 'readings' to 'measurements' later
  return fetchData<Measurement[]>('/api/v1/measurements/', 'readings');
}

export async function getMeasurementById(id: string) {
  // TODO change tag 'readings' to 'measurements' later
  return fetchData<Measurement>(`/api/v1/measurements/${id}`, 'reading');
}