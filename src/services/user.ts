import { fetchData } from '@/lib/apiNewApproach';
import { type User } from '@/types/types';

export async function getUser() {
  // TODO change tag 'readings' to 'measurements' later
  return fetchData<User>(`/api/v1/auth/user`, 'user');
}