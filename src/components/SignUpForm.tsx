'use client';

import { signup } from '@/lib/auth';
import { useActionState } from 'react';
import FormStatusMessage from './UI/FormStatusMessage';
import useFormMessageVisibility from '@/hooks/useFormMessageVisibility';

export default function SignUpForm() {
  // state is a data returned from the server action,
  // formAction is a function to be called on form submit,
  // pending is a boolean indicating if the action is in progress
  const [state, formAction, pending] = useActionState(signup, null);
  const { message, startEditing } = useFormMessageVisibility(state);

  return (
    <>
      <h2>Create account</h2>
      <form action={formAction}>
        <input
          type='email'
          name='email'
          placeholder='Email'
          autoComplete='email'
          onChange={startEditing}
        />
        <input type='password' name='password' placeholder='Password' />
        <input
          type='text'
          name='given-name'
          placeholder='Username'
          autoComplete='given-name'
          onChange={startEditing}
        />
        <button type='submit' disabled={pending}>
          {pending ? 'Creating account...' : 'Create account'}
        </button>
      </form>
      {message && <FormStatusMessage message={message} />}
    </>
  );
}
