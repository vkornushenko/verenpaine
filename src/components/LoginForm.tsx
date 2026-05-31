'use client';

import { useActionState } from 'react';
import { login } from '@/lib/auth';
import FormStatusMessage from './UI/FormStatusMessage';
import useFormMessageVisibility from '@/hooks/useFormMessageVisibility';

export default function LoginForm() {
  // state is a data returned from the server action,
  // formAction is a function to be called on form submit,
  // pending is a boolean indicating if the action is in progress
  const [state, formAction, pending] = useActionState(login, null);
  const { message, startEditing } = useFormMessageVisibility(state);

  return (
    <>
      <h2>Login</h2>
      <form action={formAction}>
        <input
          type='email'
          name='email'
          placeholder='Email'
          autoComplete='email'
          onChange={startEditing}
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          onChange={startEditing}
        />
        <button type='submit' disabled={pending}>
          {pending ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {message && <FormStatusMessage message={message} />}
    </>
  );
}
