import { cookies } from 'next/headers';
import { type Token } from '@/types/types';

export async function getToken(): Promise<Token | null> {
  // check cookies for token
  const cookieStore = await cookies();
  const token = cookieStore.get('token');

  if (!token) {
    return null;
  }

  return token.value;
}
