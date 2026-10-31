import { fetchData, fetchResponse } from '@/lib/api';
import {
  type AverageMeasurements,
  type Measurement,
  type MeasurementsResponse,
} from '@/types/types';

type GetReadingsOptions = {
  page?: number;
  perPage?: number;
  start?: string;
  end?: string;
  sort?: 'ascending' | 'asc' | 'descending' | 'desc';
};

export async function getReadings(options: GetReadingsOptions = {}) {
  const params = new URLSearchParams();
  Object.entries(options).forEach(([key, value]) => {
    if (value !== undefined) {
      params.set(key, String(value));
    }
  });

  return fetchResponse<MeasurementsResponse>(
    `/api/v1/measurements?${params.toString()}`,
    {
      method: 'GET',
      next: { tags: ['readings'] },
    },
  );
}

export async function getAllReadings(
  options: Pick<GetReadingsOptions, 'start' | 'end'> = {},
): Promise<Measurement[] | null> {
  const perPage = 100;
  const firstPage = await getReadings({
    ...options,
    page: 1,
    perPage,
    sort: 'asc',
  });
  if (!firstPage) return null;

  const pageCount = Math.ceil(firstPage.totalMeasurements / perPage);
  const pages = [firstPage];

  for (let firstPageNumber = 2; firstPageNumber <= pageCount; firstPageNumber += 5) {
    const batchSize = Math.min(5, pageCount - firstPageNumber + 1);
    const batch = await Promise.all(
      Array.from({ length: batchSize }, (_, index) =>
        getReadings({
          ...options,
          page: firstPageNumber + index,
          perPage,
          sort: 'asc',
        }),
      ),
    );
    const validBatch = batch.filter(
      (page): page is MeasurementsResponse => page !== null,
    );
    if (validBatch.length !== batch.length) return null;
    pages.push(...validBatch);
  }

  return pages.flatMap(({ data }) => data);
}

export async function getAverageReadings(
  options: Pick<GetReadingsOptions, 'start' | 'end'> = {},
) {
  const params = new URLSearchParams();
  Object.entries(options).forEach(([key, value]) => {
    if (value !== undefined) {
      params.set(key, value);
    }
  });

  return fetchData<AverageMeasurements>(
    `/api/v1/measurements/average?${params.toString()}`,
    {
      method: 'GET',
      next: { tags: ['readings'] },
    },
  );
}

export async function getMeasurementById(id: string) {
  return fetchData<Measurement>(`/api/v1/measurements/${id}`, {
    method: 'GET',
  });
}