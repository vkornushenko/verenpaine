import { getToken } from '@/lib/getToken';
import { type ApiResponse } from '@/types/types';

export async function fetchData<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token = await getToken();

  const response = await fetch(`${process.env.API_URL}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
    // ...(tagName && { cache: 'force-cache' }),
    // ...(tagName && { next: { tags: [tagName] } }),
  });

  if (response.status === 401) {
    return null as T;
  }

  if (!response.ok) {
    throw new Error(
      `failed to fetch data ${response.status} - ${response.statusText}`,
    );
  }

  const json: ApiResponse<T> = await response.json();
  return json.data;
}

export async function fetchResponse<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token = await getToken();

  const response = await fetch(`${process.env.API_URL}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
    // ...(tagName && { cache: 'force-cache' }),
    // ...(tagName && { next: { tags: [tagName] } }),
  });

  if (response.status === 401) {
    return null as never;
  }

  if (!response.ok) {
    throw new Error(
      `failed to fetch data ${response.status} - ${response.statusText}`,
    );
  }

  // const json: ApiResponse<T> = await response.json();
  return response.json();
}