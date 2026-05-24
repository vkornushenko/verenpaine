'use client';

import { useActionState } from 'react';
import { login } from '@/lib/auth';
import { useDelayedBoolean } from '@/hooks/useDelayedBoolean';
import WakingUpServer from './UI/WakingUpServer';

export default function LoginForm() {
  const initialState = {
    message: '',
    data: null,
  };

  // state is a data returned from the server action,
  // formAction is a function to be called on form submit,
  // pending is a boolean indicating if the action is in progress
  const [state, formAction, pending] = useActionState(login, initialState);
  const showColdStartMsg = useDelayedBoolean(pending, 2000);

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
      </form>
      {pending && showColdStartMsg && <WakingUpServer />}
    </>
  );
}
