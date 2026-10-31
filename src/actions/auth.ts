'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { AuthActionState } from '@/types/types';

async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set('token', token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
  });
}

async function authenticate(
  endpoint: 'login' | 'register',
  payload: { email: string; password: string; name?: string },
  failureMessage: string,
): Promise<AuthActionState> {
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/v1/auth/${endpoint}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        credentials: 'include',
      },
    );
    const responseBody: unknown = await response.json();

    if (!response.ok) {
      const message =
        typeof responseBody === 'object' &&
        responseBody !== null &&
        'message' in responseBody &&
        typeof responseBody.message === 'string'
          ? responseBody.message
          : failureMessage;
      return { success: false, message, data: null };
    }

    if (
      typeof responseBody !== 'object' ||
      responseBody === null ||
      !('token' in responseBody) ||
      typeof responseBody.token !== 'string' ||
      !responseBody.token
    ) {
      return {
        success: false,
        message: 'Server does not return token as was expected',
        data: null,
      };
    }

    await setAuthCookie(responseBody.token);
  } catch (error) {
    console.error(`Error during ${endpoint}:`, error);
    return { success: false, message: failureMessage, data: null };
  }
  redirect('/');
}

export async function login(
  _prevState: AuthActionState | null,
  formData: FormData,
): Promise<AuthActionState> {
  const email = formData.get('email');
  const password = formData.get('password');

  if (
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    !email ||
    !password
  ) {
    return {
      success: false,
      message: 'Email and password are required',
      data: null,
    };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, message: 'Invalid email format', data: null };
  }

  return authenticate(
    'login',
    { email, password },
    'Login failed. Please try again.',
  );
}

export async function signup(
  _prevState: AuthActionState | null,
  formData: FormData,
): Promise<AuthActionState> {
  const name = formData.get('given-name');
  const email = formData.get('email');
  const password = formData.get('password');

  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    !email ||
    !password ||
    !name
  ) {
    return {
      success: false,
      message: 'Email, password and name are required',
      data: null,
    };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, message: 'Invalid email format', data: null };
  }

  return authenticate(
    'register',
    { name, email, password },
    'Signup failed. Please try again.',
  );
}

export async function logOut() {
  const cookieStore = await cookies();
  cookieStore.delete('token');
  redirect('/login');
}
