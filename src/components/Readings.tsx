// import { getReadings } from '@/lib/api';
import styles from '@/components/Readings.module.css';
import Link from 'next/link';
import DeleteButton from './UI/DeleteButton';
import { getMeasurements } from '@/services/measurements';
import { redirect } from 'next/navigation';

export default async function Readings() {
  const measurements = await getMeasurements();
  console.log(measurements);
  if (!measurements) {
    console.log('no measurements -> redirecting to /login');
    redirect('/login');
  }
  // console.log(measurements);

  // skip if no readings
  if (measurements.length > 0) {
    // convert date string to local date format
    measurements.map((m) => {
      const date = new Date(m.date);
      m.date =
        date.getDate().toFixed(0).padStart(2, '0') +
        '.' +
        (date.getMonth() + 1).toFixed(0).padStart(2, '0') +
        '.' +
        date.getFullYear().toString().slice(-2) +
        ' ' +
        date.getHours().toFixed(0).padStart(2, '0') +
        ':' +
        date.getMinutes().toFixed(0).padStart(2, '0');
    });
  }

  return (
    <>
      {measurements.length > 0 ? (
        <>
          <h2>Recent Readings</h2>
          <ul className={styles.readingsList}>
            {measurements.map((m) => (
              <li key={m._id} className={styles.reading}>
                <Link
                  href={`/measurement/${m._id}`}
                  className={styles.measurementLink}
                >
                  <div className={styles.readingContainer}>
                    <div className={styles.date}>
                      <p>{m.date}</p>
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
