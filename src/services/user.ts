import { fetchData } from '@/lib/api';
import { type User } from '@/types/types';

export async function getUser() {
  return fetchData<User>(`/api/v1/auth/user`, {
    method: 'GET',
  });
}