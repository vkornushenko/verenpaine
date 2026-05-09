import Link from 'next/link';
import { getToken } from '@/lib/getToken';
import { getMeasurements } from '@/services/measurements';
import { getUser } from '@/services/user';
import { redirect } from 'next/navigation';

export default async function AuthLink() {
  const token = await getToken();

  // if no token at all
  if (!token) {
    return <Link href={'/login'}>Login</Link>;
  }

  const user = await getUser();

  if (!user) {
    console.log('no user -> redirecting to /login');
    redirect('/');
  }

  const measurements = await getMeasurements();
  // console.log(readings.length);
  return (
    <Link href={'/login'}>
      {user ? user.name + ' (' + measurements.length + ')' : 'Login'}
    </Link>
  );
}
