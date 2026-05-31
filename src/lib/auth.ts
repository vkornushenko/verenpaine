'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { type AuthActionState, AuthUser } from '@/types/types';

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set('token', token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
  });
}

export async function login(
  prevState: AuthActionState | null,
  formData: FormData,
): Promise<AuthActionState> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // Basic validation
  if (!email || !password) {
    return {
      success: false,
      message: 'Email and password are required',
      data: null,
    };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, message: 'Invalid email format', data: null };
  }

  try {
    const response = await fetch(`${process.env.API_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    });

    if (!response.ok) {
      const { message } = await response.json();
      return { success: false, message: message, data: null };
    }

    const user: AuthUser = await response.json();

    if (!user.token) {
      return {
        success: false,
        message: 'Server does not return token as was expected',
        data: null,
      };
    }

    await setAuthCookie(user.token);

    // return { message: 'Login successful', data: responseData };
  } catch (error) {
    console.error('Error during login:', error);
    // Handle login error (e.g., show error message to user)
    return { success: false, message: 'Login failed. Please try again.', data: null };
  }
  // return { success: true, message: 'Login successful', data: null };
  redirect('/');
}

export async function signup(
  prevState: AuthActionState | null,
  formData: FormData,
): Promise<AuthActionState> {
  const name = formData.get('given-name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // Basic validation
  if (!email || !password || !name) {
    return { success: false, message: 'Email, password and name are required', data: null };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, message: 'Invalid email format', data: null };
  }

  try {
    const response = await fetch(
      `${process.env.API_URL}/api/v1/auth/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      },
    );

    console.log(response);

    if (!response.ok) {
      const { message } = await response.json();
      return { success: false, message: message, data: null };
    }

    const user: AuthUser = await response.json();

    if (!user.token) {
      return {
        success: false,
        message: 'Server does not return token as was expected',
        data: null,
      };
    }

    await setAuthCookie(user.token);
  } catch (error) {
    console.log(error);
    return { success: false, message: 'Signup failed. Please try again.', data: null };
  }
  console.log('User created successfully -> Redirecting to main page');
  redirect('/');
}

export async function logOut() {
  const cookieStore = await cookies();
  cookieStore.delete('token');
  redirect('/login');
}
