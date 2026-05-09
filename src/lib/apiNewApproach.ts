import { getToken } from '@/lib/getToken';
import { type ApiResponse, type tagName } from '@/types/types';

export async function fetchData<T>(
  api_path: string,
  tagName?: tagName,
): Promise<T> {
  const token = await getToken();

  const res = await fetch(`${process.env.API_URL}${api_path}`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
    ...(tagName && { cache: 'force-cache' }),
    ...(tagName && { next: { tags: [tagName] } }),
  });

  if (res.status === 401) {
    return null as T;
  }

  if (!res.ok) {
    throw new Error('failed to fetch data');
  }

  const json: ApiResponse<T> = await res.json();
  return json.data;
}
