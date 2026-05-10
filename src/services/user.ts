import { fetchData } from '@/lib/api';
import { type User, type tagName } from '@/types/types';

export async function getUser() {
  const tagName : tagName = 'user'

  // TODO change tag 'readings' to 'measurements' later
  return fetchData<User>(`/api/v1/auth/user`, {
    method: 'GET',
    next: { tags: [tagName]}
  });
}