import { cookies } from 'next/headers';

export async function getToken(): Promise<string | null> {
  // check cookies for token
  const cookieStore = await cookies();
  const token = cookieStore.get('token');

  if (!token) {
    return null;
  }

  return token.value;
}
