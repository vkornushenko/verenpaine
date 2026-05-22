import styles from '@/components/Reading.module.css';
// import DateComponent from '@/components/UI/DateComponent';
import DeleteButton from '@/components/UI/buttons/DeleteButton';
import Link from 'next/link';
import { Measurement } from '@/types/types';

type ReadingProp = {
  reading: Measurement;
};

export default function Reading({ reading }: ReadingProp) {
  return (
    <li className={styles.reading}>
      <Link
        href={`/measurement/${reading._id}`}
        className={styles.measurementLink}
      >
        <div className={styles.readingContainer}>
          <div className={styles.date}>
            <p>{reading.date} </p>
          </div>
          <div>
            <p>sys: {reading.systolic}</p>
          </div>
          <div>
            <p>dis: {reading.diastolic}</p>
          </div>
          <div>
            <p>pulse: {reading.pulse}</p>
          </div>
        </div>
      </Link>
      <DeleteButton id={reading._id} />
    </li>
  );
}
