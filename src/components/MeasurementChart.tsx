'use client';

import Link from 'next/link';
import { useLocalDate } from '@/hooks/useLocalDate';
import { useMemo, useState } from 'react';
import type { Measurement } from '@/types/types';
import {
  buildChartMeasurements,
  getMeasurementTime,
  getTicks,
  getYDomain,
} from '@/lib/measurementChart';
import type {
  ChartMeasurement,
  ChartSeriesKey,
  MeasurementChartProps,
  SeriesConfig,
} from '@/types/measurementChart';
import styles from './MeasurementChart.module.css';

const chartWidth = 800;
const chartHeight = 420;
const margin = { top: 24, right: 24, bottom: 68, left: 64 };
const tickCount = 5;

const series = [
  { key: 'systolic', label: 'sys', className: styles.systolic },
  { key: 'diastolic', label: 'dia', className: styles.diastolic },
  { key: 'pulse', label: 'pulse', className: styles.pulse },
] satisfies readonly SeriesConfig[];

const dateTimeFormat: Intl.DateTimeFormatOptions = {
  month: 'short',
  day: 'numeric',
};
const readingDateTimeFormat: Intl.DateTimeFormatOptions = {
  day: '2-digit',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit',
};

function MeasurementLink({ measurement }: { measurement: Measurement }) {
  const date = useLocalDate(measurement.date, readingDateTimeFormat);

  return (
    <Link
      className={styles.tooltipReading}
      href={`/measurement/${measurement._id}`}
    >
      <time dateTime={measurement.date}>{date}</time>
      <span>{measurement.systolic}</span>
      <span>{measurement.diastolic}</span>
      <span>{measurement.pulse}</span>
    </Link>
  );
}

function TimeAxisTick({ tick, x }: { tick: number; x: number }) {
  const label = useLocalDate(new Date(tick).toISOString(), dateTimeFormat);

  return (
    <g>
      <line
        className={styles.axis}
        x1={x}
        x2={x}
        y1={chartHeight - margin.bottom}
        y2={chartHeight - margin.bottom + 5}
      />
      <text
        className={styles.tickLabel}
        x={x}
        y={chartHeight - margin.bottom + 20}
        textAnchor='middle'
      >
        {label}
      </text>
    </g>
  );
}

export default function MeasurementChart({
  measurements,
  from,
  to,
}: MeasurementChartProps) {
  const [hoveredSeries, setHoveredSeries] = useState<ChartSeriesKey | null>(null);
  const [hoveredPoint, setHoveredPoint] = useState<ChartMeasurement | null>(null);

  const orderedMeasurements = useMemo(
    () =>
      [...measurements].sort(
        (first, second) =>
          getMeasurementTime(first.date) - getMeasurementTime(second.date),
      ),
    [measurements],
  );

  const times = useMemo(
    () => orderedMeasurements.map((measurement) => getMeasurementTime(measurement.date)),
    [orderedMeasurements],
  );
  const dataMinTime = times[0] ?? 0;
  const dataMaxTime = times[times.length - 1] ?? 0;
  const requestedMinTime = from ? new Date(from).getTime() : dataMinTime;
  const requestedMaxTime = to ? new Date(to).getTime() : dataMaxTime;
  const hasValidRange =
    Number.isFinite(requestedMinTime) &&
    Number.isFinite(requestedMaxTime) &&
    requestedMaxTime >= requestedMinTime;
  const minTime = hasValidRange ? requestedMinTime : dataMinTime;
  const maxTime = hasValidRange ? requestedMaxTime : dataMaxTime;
  const timeRange = Math.max(maxTime - minTime, 0);

  const chartMeasurements = useMemo(
    () => buildChartMeasurements(orderedMeasurements, minTime, maxTime),
    [orderedMeasurements, minTime, maxTime],
  );

  const values = useMemo(
    () =>
      chartMeasurements.flatMap((measurement) => [
        measurement.systolic,
        measurement.diastolic,
        measurement.pulse,
      ]),
    [chartMeasurements],
  );

  const yDomain = useMemo(() => getYDomain(values), [values]);
  const plotWidth = chartWidth - margin.left - margin.right;
  const plotHeight = chartHeight - margin.top - margin.bottom;

  const getX = (time: number) => {
    if (timeRange === 0) {
      return margin.left + plotWidth / 2;
    }

    const progress = (time - minTime) / timeRange;
    return margin.left + progress * plotWidth;
  };

  const getY = (value: number) => {
    const progress = (yDomain.max - value) / yDomain.range;
    return margin.top + progress * plotHeight;
  };

  const yTicks = useMemo(
    () => getTicks(yDomain.min, yDomain.max, tickCount),
    [yDomain.min, yDomain.max],
  );

  const xTicks = useMemo(
    () => (timeRange === 0 ? [minTime] : getTicks(minTime, maxTime, tickCount)),
    [minTime, maxTime, timeRange],
  );

  const resetHover = () => {
    setHoveredSeries(null);
    setHoveredPoint(null);
  };

  const tooltipSeriesKey = hoveredSeries ?? 'systolic';
  const hasMeasurements = orderedMeasurements.length > 0;

  return (
    <div className={styles.chartContainer}>
      {hasMeasurements && (
        <ul className={styles.legend} aria-label='Measurement series'>
          {series.map((item) => (
            <li
              key={item.key}
              tabIndex={0}
              onMouseEnter={() => setHoveredSeries(item.key)}
              onMouseLeave={() => setHoveredSeries(null)}
              onFocus={() => setHoveredSeries(item.key)}
              onBlur={() => setHoveredSeries(null)}
            >
              <span className={`${styles.legendMarker} ${item.className}`} />
              {item.label}
            </li>
          ))}
        </ul>
      )}
      {hasMeasurements ? (
        <>
          <div
            className={styles.plot}
            onMouseLeave={resetHover}
            onBlur={(event) => {
              const nextTarget = event.relatedTarget;

              if (
                !(nextTarget instanceof Node) ||
                !event.currentTarget.contains(nextTarget)
              ) {
                resetHover();
              }
            }}
          >
            <svg
              className={styles.chart}
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              role='group'
              aria-label='Systolic, diastolic, and pulse measurements over time'
            >
              {yTicks.map((tick) => (
                <g key={tick}>
                  <line
                    className={styles.gridLine}
                    x1={margin.left}
                    x2={chartWidth - margin.right}
                    y1={getY(tick)}
                    y2={getY(tick)}
                  />
                  <text
                    className={styles.tickLabel}
                    x={margin.left - 10}
                    y={getY(tick)}
                    textAnchor='end'
                    dominantBaseline='middle'
                  >
                    {Math.round(tick)}
                  </text>
                </g>
              ))}
              <line
                className={styles.axis}
                x1={margin.left}
                x2={margin.left}
                y1={margin.top}
                y2={chartHeight - margin.bottom}
              />
              <line
                className={styles.axis}
                x1={margin.left}
                x2={chartWidth - margin.right}
                y1={chartHeight - margin.bottom}
                y2={chartHeight - margin.bottom}
              />
              {xTicks.map((tick) => {
                const x = getX(tick);
                return <TimeAxisTick key={tick} tick={tick} x={x} />;
              })}
              <text
                className={styles.axisLabel}
                x={margin.left + plotWidth / 2}
                y={chartHeight - 12}
                textAnchor='middle'
              >
                Time
              </text>
              <text
                className={styles.axisLabel}
                x={16}
                y={margin.top + plotHeight / 2}
                textAnchor='middle'
                transform={`rotate(-90 16 ${margin.top + plotHeight / 2})`}
              >
                sys / dia / pulse
              </text>
              {series.map((item) => (
                <g
                  key={item.key}
                  className={
                    hoveredSeries && hoveredSeries !== item.key
                      ? styles.inactiveSeries
                      : undefined
                  }
                >
                  <polyline
                    className={`${styles.seriesLine} ${item.className}`}
                    points={chartMeasurements
                      .map(
                        (measurement) =>
                          `${getX(measurement.time)},${getY(measurement[item.key])}`,
                      )
                      .join(' ')}
                  />
                  {chartMeasurements.map((measurement) => (
                    <circle
                      key={`${item.key}-${measurement.time}`}
                      className={`${item.className} ${styles.point}`}
                      cx={getX(measurement.time)}
                      cy={getY(measurement[item.key])}
                      r={hoveredPoint === measurement ? '6' : '4.5'}
                      tabIndex={0}
                      aria-label={`${item.label}: ${Math.round(measurement[item.key])}, ${measurement.readings.length} individual readings`}
                      onMouseEnter={() => {
                        setHoveredPoint(measurement);
                        setHoveredSeries(item.key);
                      }}
                      onFocus={() => {
                        setHoveredPoint(measurement);
                        setHoveredSeries(item.key);
                      }}
                    />
                  ))}
                </g>
              ))}
            </svg>
            {hoveredPoint && (
              <div
                className={[
                  styles.tooltip,
                  getX(hoveredPoint.time) > chartWidth / 2 ? styles.tooltipLeft : '',
                  getY(hoveredPoint[tooltipSeriesKey]) > chartHeight / 2
                    ? styles.tooltipAbove
                    : styles.tooltipBelow,
                ]
                  .filter(Boolean)
                  .join(' ')}
                style={{
                  left: `${(getX(hoveredPoint.time) / chartWidth) * 100}%`,
                  top: `${(getY(hoveredPoint[tooltipSeriesKey]) / chartHeight) * 100}%`,
                }}
              >
                <ul
                  className={styles.tooltipReadings}
                  aria-label={`${hoveredPoint.readings.length} individual readings`}
                >
                  <li className={styles.tooltipHeader} aria-hidden='true'>
                    <span>time</span>
                    <span>sys</span>
                    <span>dia</span>
                    <span>pulse</span>
                  </li>
                  {hoveredPoint.readings.map((reading) => (
                    <li key={reading._id}>
                      <MeasurementLink measurement={reading} />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <p className={styles.readingCount}>
            {chartMeasurements.length < orderedMeasurements.length
              ? `Showing ${orderedMeasurements.length} measurements averaged into ${chartMeasurements.length} points`
              : `Showing ${orderedMeasurements.length} measurements`}
          </p>
        </>
      ) : (
        <p className={styles.readingCount}>No measurements available.</p>
      )}
    </div>
  );
}
