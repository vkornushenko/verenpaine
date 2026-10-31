import type { Measurement } from '@/types/types';
import type { ChartMeasurement, YAxisDomain } from '@/types/measurementChart';

const hour = 60 * 60 * 1000;
const day = 24 * hour;

export function getMeasurementTime(date: string) {
  return new Date(date).getTime();
}

function getBucketDuration(timeRange: number) {
  if (timeRange <= day) return hour;
  if (timeRange <= 7 * day) return 6 * hour;
  if (timeRange <= 31 * day) return day;
  if (timeRange <= 366 * day) return 7 * day;
  return 30 * day;
}

export function getTicks(min: number, max: number, count: number) {
  if (count <= 1) return [min];

  return Array.from({ length: count }, (_, index) => {
    const progress = index / (count - 1);
    return min + (max - min) * progress;
  });
}

export function buildChartMeasurements(
  measurements: Measurement[],
  minTime: number,
  maxTime: number,
) {
  const timeRange = maxTime - minTime;
  const bucketDuration = getBucketDuration(timeRange);
  const buckets = new Map<number, ChartMeasurement>();

  measurements.forEach((measurement) => {
    const time = getMeasurementTime(measurement.date);
    const bucketIndex =
      timeRange === 0 ? 0 : Math.floor((time - minTime) / bucketDuration);
    const bucket = buckets.get(bucketIndex);

    if (bucket) {
      bucket.time += time;
      bucket.systolic += measurement.systolic;
      bucket.diastolic += measurement.diastolic;
      bucket.pulse += measurement.pulse;
      bucket.readings.push(measurement);
      return;
    }

    buckets.set(bucketIndex, {
      time,
      systolic: measurement.systolic,
      diastolic: measurement.diastolic,
      pulse: measurement.pulse,
      readings: [measurement],
    });
  });

  return [...buckets.values()]
    .map((bucket) => {
      const readingCount = bucket.readings.length;

      return {
        time: bucket.time / readingCount,
        systolic: bucket.systolic / readingCount,
        diastolic: bucket.diastolic / readingCount,
        pulse: bucket.pulse / readingCount,
        readings: bucket.readings,
      };
    })
    .sort((first, second) => first.time - second.time);
}

export function getYDomain(values: number[]): YAxisDomain {
  if (values.length === 0) {
    return { min: 0, max: 100, range: 100 };
  }

  const min = Math.floor((Math.min(...values) - 10) / 10) * 10;
  const max = Math.ceil((Math.max(...values) + 10) / 10) * 10;

  return {
    min,
    max,
    range: max - min || 1,
  };
}
