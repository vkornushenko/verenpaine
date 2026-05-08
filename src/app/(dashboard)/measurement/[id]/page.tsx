

import Card from '@/components/UI/Card';
import { getReadingById } from '@/lib/api';
import Link from 'next/link';

import styles from '@/app/(dashboard)/measurement/[id]/page.module.css';
import DeleteButton from '@/components/UI/DeleteButton';

type Params = Promise<{ id: string }>;
type Reading = {
    _id: string,
    date: string,
    systolic: number,
    diastolic: number,
    pulse: number,
    user: string
}

export default async function ReadingPage({ params }: { params: Params }) {
  const { id } = await params;
  const reading : Reading = await getReadingById(id);

  return (
    <Card>
      <h1>Reading</h1>
      {reading ? (
        <>
          <p>id = {reading._id}</p>
          <p>date = {reading.date}</p>
          <p>sys = {reading.systolic}</p>
          <p>dia = {reading.diastolic}</p>
          <p>pulse = {reading.pulse}</p>
          <p>-----------------------</p>
          <p>user id = {reading.user}</p>
          <div className={styles.measurementNav}>
            <Link href=''>edit</Link>

            <DeleteButton id={reading._id} />
          </div>
        </>
      ) : (
        <>
          <p>no reading found...</p>
        </>
      )}
    </Card>
  );
}
