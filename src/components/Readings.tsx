import styles from '@/components/Readings.module.css';
import Link from 'next/link';
import DeleteButton from './UI/buttons/DeleteButton';
import { getMeasurements } from '@/services/measurements';
import { redirect } from 'next/navigation';
import RefreshButton from '@/components/UI/buttons/RefreshButton';
import DateComponent from '@/components/UI/DateComponent';

export default async function Readings() {
  const measurements = await getMeasurements();
  // console.log(measurements);
  if (!measurements) {
    console.log('no measurements -> redirecting to /login');
    redirect('/login');
  }

  return (
    <>
      {measurements.length > 0 ? (
        <>
          <div className={styles.header}>
            <h2>Recent Readings</h2>
            <RefreshButton tagName={'readings'} />
          </div>
          <ul className={styles.readingsList}>
            {measurements.map((m) => (
              <li key={m._id} className={styles.reading}>
                <Link
                  href={`/measurement/${m._id}`}
                  className={styles.measurementLink}
                >
                  <div className={styles.readingContainer}>
                    <div className={styles.date}>
                      <DateComponent date={m.date} />
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
