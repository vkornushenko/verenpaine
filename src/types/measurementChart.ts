import type { Measurement } from '@/types/types';

export type MeasurementChartProps = {
  measurements: Measurement[];
  from?: string;
  to?: string;
};

export type ChartSeriesKey = 'systolic' | 'diastolic' | 'pulse';

export type ChartMeasurement = {
  time: number;
  systolic: number;
  diastolic: number;
  pulse: number;
  readings: Measurement[];
};

export type SeriesConfig = {
  key: ChartSeriesKey;
  label: string;
  className: string;
};

export type YAxisDomain = {
  min: number;
  max: number;
  range: number;
};
