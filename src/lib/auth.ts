'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export type User = {
  _id: string;
  name: string;
  email: string;
  token: string;
};

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set('token', token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
  });
}

export async function login(prevState: unknown, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // Basic validation
  if (!email || !password) {
    return { message: 'Email and password are required', data: null };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { message: 'Invalid email format', data: null };
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
      return { message: message, data: null };
    }

    const user: User = await response.json();

    if (!user.token) {
      return {
        message: 'Server does not return token as was expected',
        data: null,
      };
    }

    // // New way to construct cookie from token value in response from express
    // const cookieStore = await cookies();
    // cookieStore.set('token', responseData.token, {
    //   httpOnly: true,
    //   sameSite: 'lax',
    //   path: '/',
    // });

    await setAuthCookie(user.token);

    // return { message: 'Login successful', data: responseData };
  } catch (error) {
    console.error('Error during login:', error);
    // Handle login error (e.g., show error message to user)
    return { message: 'Error during login', data: null };
  }
  console.log('Login successful -> Redirecting to main page');
  redirect('/');
}

export async function signup(prevState: unknown, formData: FormData) {
  const name = formData.get('given-name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // Basic validation
  if (!email || !password || !name) {
    return { message: 'Email, password and name are required', data: null };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { message: 'Invalid email format', data: null };
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
      return { message: message, data: null };
    }

    const user: User = await response.json();

    if (!user.token) {
      return {
        message: 'Server does not return token as was expected',
        data: null,
      };
    }

    await setAuthCookie(user.token);
  } catch (error) {
    console.log(error);
    return { message: 'Error during signup', data: null };
  }
  console.log('User created successfully -> Redirecting to main page');
  redirect('/');
}

export async function logOut() {
  const cookieStore = await cookies();
  cookieStore.delete('token');
  redirect('/login');
}
