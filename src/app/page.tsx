import Readings from '@/components/Readings';
import NewReadingForm from '@/components/NewReadingForm';
import Card from '@/components/UI/Card';
import { getReadings } from '@/services/measurements';
import { Activity } from 'react';

export default async function Home() {
  // console.log('NodeJS Server Time Settings:')
  // console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);
  // console.log(new Date().toString());
  const readings = await getReadings();
  // console.log(readings)

  return (
    <>
      <Card>
        <NewReadingForm />
      </Card>
      <Activity mode={readings ? 'visible' : 'hidden'}>
        <Card>
          <Readings readings={readings} />
        </Card>
      </Activity>
    </>
  );
}
