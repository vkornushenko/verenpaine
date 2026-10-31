import { getToken } from '@/lib/getToken';
import { type ApiResponse } from '@/types/types';

async function fetchApi<T>(
  endpoint: string,
  options: RequestInit,
  parseResponse: (response: Response) => Promise<T>,
): Promise<T | null> {
  const token = await getToken();
  const headers = new Headers(options.headers);
  if (token) headers.set('Authorization', `Bearer ${token}`);

  const response = await fetch(`${process.env.API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) return null;

  if (!response.ok) {
    throw new Error(
      `failed to fetch data ${response.status} - ${response.statusText}`,
    );
  }

  return parseResponse(response);
}

export function fetchData<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T | null> {
  return fetchApi(endpoint, options, async (response) => {
    const json: ApiResponse<T> = await response.json();
    return json.data;
  });
}

export function fetchResponse<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T | null> {
  return fetchApi(endpoint, options, (response) => response.json());
}
