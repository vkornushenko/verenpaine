import Card from '@/components/UI/Card';

import styles from '@/app/(dashboard)/measurement/[id]/page.module.css';
import DeleteButton from '@/components/UI/buttons/DeleteButton';
import { getMeasurementById } from '@/services/measurements';

type Params = Promise<{ id: string }>;

export default async function ReadingPage({ params }: { params: Params }) {
  const { id } = await params;

  const measurement = await getMeasurementById(id);

  return (
    <Card>
      <h2>Reading</h2>

      {measurement ? (
        <>
          <div>
            <p>reading id: {measurement._id}</p>
            <p>date: {measurement.date}</p>
            <p>sys: {measurement.systolic}</p>
            <p>dia: {measurement.diastolic}</p>
            <p>pulse: {measurement.pulse}</p>
          </div>
          <div className={styles.measurementNav}>
            <DeleteButton id={measurement._id} />
            {/* <DeleteButton id={measurement._id} /> */}
            {/* <DeleteButton id={measurement._id} />
            <DeleteButton id={measurement._id} /> */}
            {/* <button>Edit</button> */}
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
