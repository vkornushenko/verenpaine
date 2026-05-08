import { getReadings } from '@/lib/api';
import styles from '@/components/Readings.module.css';
import Link from 'next/link';
import DeleteButton from './UI/DeleteButton';

type Reading = {
  _id: string;
  date: string;
  systolic: number;
  diastolic: number;
  pulse: number;
};

export default async function Readings() {
  const readings = await getReadings();

  // skip if no readings
  if (readings.length > 0) {
    // convert date string to local date format
    readings.map((reading: Reading) => {
      const date = new Date(reading.date);
      reading.date =
        date.getDate() +
        '.' +
        (date.getMonth() + 1).toFixed(0).padStart(2, '0') +
        '.' +
        date.getFullYear().toString().slice(-2) +
        ' ' +
        date.getHours() +
        ':' +
        date.getMinutes().toFixed(0).padStart(2, '0');
    });
  }

  return (
    <>
      {readings.length > 0 ? (
        <>
          <h2>Recent Readings</h2>
          {readings.map((reading: Reading) => (
            <div key={reading._id} className={styles.reading}>
              <Link href={`/measurement/${reading._id}`}>
                {reading.date} --- sys: {reading.systolic} dis:{' '}
                {reading.diastolic}, pulse: {reading.pulse}
              </Link>
              <DeleteButton id={reading._id} />
            </div>
          ))}
        </>
      ) : (
        <p className={styles.emptyReadings}>no readings found</p>
      )}
    </>
  );
}
