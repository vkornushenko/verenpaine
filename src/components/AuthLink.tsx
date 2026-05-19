import Link from 'next/link';
import { getToken } from '@/lib/getToken';
import { getUser } from '@/services/user';

export default async function AuthLink() {
  const token = await getToken();

  // if no token at all
  if (!token) {
    return <Link href={'/login'}>Login</Link>;
  }

  const user = await getUser();

  return (
    <Link href={user ? '/account' : '/login'}>
      {user ? user.name : 'Login'}
    </Link>
  );
}
