import { getReadings, getUser } from '@/lib/api';
import Link from 'next/link';

export default async function AuthLink() {
  const user = await getUser();
  const readings = await getReadings();
  console.log(readings.length);
  
  console.log(user);
  return <Link href={'/login'}>{user ? user.name + ' (' + readings.length + ')' : 'Login'}</Link>;
}
