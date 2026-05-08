'use server';

import { revalidateTag } from 'next/cache';
import { getToken } from '@/middleware/getToken';
import { redirect } from 'next/navigation';

export async function getReadings() {
  const token = await getToken();

  console.log('process.env.API_URL');
  console.log(process.env.API_URL);

  let error: string | null = null;
  let data: Response | null = null;
  try {
    data = await fetch(`${process.env.API_URL}/api/v1/measurements`, {
      method: 'GET',
      // credentials: 'include',
      headers: {
        // Cookie: `token=${token}`,
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ['readings'] },
      cache: 'force-cache',
    });
  } catch (err) {
    console.error('Network error:', err);
    error = 'Backend is unreachable';
    // return <div>{error}</div>;
  }

  if (!data) {
    error = 'No response from backend';
    console.error(error);
    return { error, readings: [] };
  }

  if (data.status === 401) {
    console.warn('Authentication failed:', data.status);
  }

  if (!data.ok) {
    error = 'Failed to fetch readings';
    console.warn(error, data.status);
    return { error, readings: [] };
    // throw new Error('Failed to fetch readings');
  }

  const readings = await data.json();
  return readings.data;
}

// get User
export async function getUser() {
  // get token from cookies
  const token = await getToken();

  try {
    const response = await fetch(
      `${process.env.API_URL}/api/v1/auth/user/`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { tags: ['user'] },
      },
    );

    if (!response.ok) {
      console.log('getting user failed');
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

// get reading by id
export async function getReadingById(id: string) {
  // get token from cookies
  const token = await getToken();

  try {
    const response = await fetch(
      `${process.env.API_URL}/api/v1/measurements/${id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: 'force-cache',
        next: { tags: ['reading'] },
      },
    );
    if (!response.ok) {
      console.log('fetching measurement by id failed');
      throw new Error(`Response status: ${response.status}`);
    }
    const { data } = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

// delete reading by id
export async function deleteReadingById(id: string) {
  // get token from cookies
  const token = await getToken();

  try {
    const response = await fetch(
      `${process.env.API_URL}/api/v1/measurements/${id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (!response.ok) {
      console.log('deleting measurement by id failed');
      throw new Error(`Response status: ${response.status}`);
    }

    // revalidating readings data with immediate expiration
    revalidateTag('readings', { expire: 0 });
    revalidateTag('reading', { expire: 0 });

    // const { data } = await response.json();
    // return data;
  } catch (error) {
    console.error(error);
  }
  redirect('/');
}

// save new reading
export async function sendNewReading(
  prevState: unknown,
  formData: FormData,
): Promise<{ message: string; data: unknown }> {
  // get token from cookies
  const token = await getToken();

  // extract form data
  const systolic = formData.get('systolic') as string;
  const diastolic = formData.get('diastolic') as string;
  const pulse = formData.get('pulse') as string;
  const measurementTime = formData.get('measurement-time') as string;

  console.log(measurementTime);

  if (!systolic || !diastolic || !pulse) {
    return { message: 'All fields are required', data: null };
  }

  if (
    isNaN(Number(systolic)) ||
    isNaN(Number(diastolic)) ||
    isNaN(Number(pulse))
  ) {
    return { message: 'All fields must be valid numbers', data: null };
  }

  try {
    const response = await fetch(
      `${process.env.API_URL}/api/v1/measurements`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Cookie: `token=${token}`,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          systolic,
          diastolic,
          pulse,
          date: measurementTime,
        }),
        // credentials: 'include'
      },
    );

    if (!response.ok) {
      return { message: 'Response is not OK', data: null };
    }

    const data = await response.json();
    // console.log('New reading saved:', data);

    // revalidating readings data with immediate expiration
    revalidateTag('readings', { expire: 0 });

    return { message: 'New reading saved successfully', data };
  } catch (err) {
    console.log(err);
    return { message: 'Failed to save new reading', data: null };
  }
}
