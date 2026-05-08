'use client';

import styles from '@/components/LoginForm.module.css';

import { useActionState } from 'react';
import { redirect } from 'next/navigation';
import { login } from '@/lib/auth';
import Link from 'next/link';

export default function LoginForm() {
  const initialState = {
    message: '',
    data: null,
  };

  // state is a data returned from the server action,
  // formAction is a function to be called on form submit,
  // pending is a boolean indicating if the action is in progress
  const [state, formAction, pending] = useActionState(login, initialState);

  if (state.message === 'Login successful') {
    redirect('/'); // Redirect to home page on successful login
  }

  return (
    <>
      <h2>Login</h2>
      <form action={formAction}>
        <input type='email' name='email' placeholder='Email' autoComplete='email'/>
        <input type='password' name='password' placeholder='Password' />
        <button type='submit' disabled={pending}>
          {pending ? 'Logging in...' : 'Login'}
        </button>
        {state.message && <p>{state.message}</p>}
      </form>
      <p className={styles.signupLink}>
        If you don&apos;t have an account,
        <Link href='/signup'>&nbsp;sign up</Link>
      </p>
    </>
  );
}
