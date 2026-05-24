import Card from '@/components/UI/Card';
// import { getReadingById } from '@/lib/api';
import Link from 'next/link';

import styles from '@/app/(dashboard)/measurement/[id]/page.module.css';
import DeleteButton from '@/components/UI/buttons/DeleteButton';
import { getMeasurementById } from '@/services/measurements';

type Params = Promise<{ id: string }>;

export default async function ReadingPage({ params }: { params: Params }) {
  const { id } = await params;
  
  // const reading: Reading = await getReadingById(id);
  const measurement = await getMeasurementById(id);

  return (
    <Card>
      <h1>Reading</h1>
      {measurement ? (
        <>
          <p>id = {measurement._id}</p>
          <p>date = {measurement.date}</p>
          <p>sys = {measurement.systolic}</p>
          <p>dia = {measurement.diastolic}</p>
          <p>pulse = {measurement.pulse}</p>
          <p>-----------------------</p>
          {/* <p>user id = {measurement.user}</p> */}
          <div className={styles.measurementNav}>
            {/* <Link href=''>edit</Link> */}

            delete → <DeleteButton id={measurement._id} />
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
