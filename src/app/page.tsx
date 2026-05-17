import Readings from '@/components/Readings';
import NewReadingForm from '@/components/NewReadingForm';
import Card from '@/components/UI/Card';
// import { isAuth } from '@/middleware/isAuth';

export default async function Home() {
  console.log('NodeJS Server Time Settings:')
  console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);
  console.log(new Date().toString());

  return (
    <>
      <Card>
        <NewReadingForm />
      </Card>
      <Card>
        <Readings />
      </Card>
    </>
  );
}
