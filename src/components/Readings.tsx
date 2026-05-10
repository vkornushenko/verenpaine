// import { getReadings } from '@/lib/api';
import styles from '@/components/Readings.module.css';
import Link from 'next/link';
import DeleteButton from './UI/DeleteButton';
import { getMeasurements } from '@/services/measurements';
import { redirect } from 'next/navigation';
import { formatLocalDate } from '@/lib/date';
import RefreshButton from './UI/RefreshButton';

export default async function Readings() {
  const measurements = await getMeasurements();
  // console.log(measurements);
  if (!measurements) {
    console.log('no measurements -> redirecting to /login');
    redirect('/login');
  }
  console.log(measurements);

  let formattedMeasurements;
  // skip if no readings
  if (measurements.length > 0) {
    // convert date string to local date format
    formattedMeasurements = measurements.map((m) => ({
      ...m,
      formattedDate: formatLocalDate(m.date),
    }));
  }
  console.log(formattedMeasurements);

  return (
    <>
      {formattedMeasurements && formattedMeasurements.length > 0 ? (
        <>
          <div className={styles.header}>
            <h2>Recent Readings</h2>
            <RefreshButton tagName={'readings'}/>
          </div>
          <ul className={styles.readingsList}>
            {formattedMeasurements.map((m) => (
              <li key={m._id} className={styles.reading}>
                <Link
                  href={`/measurement/${m._id}`}
                  className={styles.measurementLink}
                >
                  <div className={styles.readingContainer}>
                    <div className={styles.date}>
                      <p>{m.formattedDate}</p>
                    </div>
                    <div>
                      <p>sys: {m.systolic}</p>
                    </div>
                    <div>
                      <p>dis: {m.diastolic}</p>
                    </div>
                    <div>
                      <p>pulse: {m.pulse}</p>
                    </div>
                  </div>
                </Link>
                <DeleteButton id={m._id} />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className={styles.emptyReadings}>no readings found</p>
      )}
    </>
  );
}
