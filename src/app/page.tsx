import Readings from '@/components/Readings';
import NewReadingForm from '@/components/NewReadingForm';
import Card from '@/components/UI/Card';
import { isAuth } from '@/middleware/isAuth';

export default async function Home() {
  // protect route and redirect if not logged in or token expired
  await isAuth();

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
