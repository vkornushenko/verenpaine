'use client';

// import { useRouter } from 'next/navigation'
import { useActionState, useEffect } from 'react';
// import { redirect } from 'next/navigation';
import { login } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();

  const initialState = {
    message: '',
    data: null,
  };

  // state is a data returned from the server action,
  // formAction is a function to be called on form submit,
  // pending is a boolean indicating if the action is in progress
  const [state, formAction, pending] = useActionState(login, initialState);

  useEffect(() => {
    if (state.message === 'Login successful') {
      console.log('state msg is successful -> pushing to /')
      router.push('/');
      // redirect('/'); // Redirect to home page on successful login
    }
  }, [state.message, router]);

  return (
    <>
      <h2>Login</h2>
      <form action={formAction}>
        <input
          type='email'
          name='email'
          placeholder='Email'
          autoComplete='email'
        />
        <input type='password' name='password' placeholder='Password' />
        <button type='submit' disabled={pending}>
          {pending ? 'Logging in...' : 'Login'}
        </button>
        {state.message && (
          <p>{state.message}. You can navigate to main page.</p>
        )}
      </form>
    </>
  );
}
