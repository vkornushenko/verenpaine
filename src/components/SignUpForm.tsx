'use client';

import { signup } from '@/lib/auth';
import { useActionState } from 'react';
import { useDelayedBoolean } from '@/hooks/useDelayedBoolean';
import WakingUpServer from './UI/WakingUpServer';
import { COLD_START_DELAY } from '@/constants/delay';

export default function SignUpForm() {
  // const pending = false; // TODO: implement pending state
  const initialState = {
    message: '',
    data: null,
  };

  // state is a data returned from the server action,
  // formAction is a function to be called on form submit,
  // pending is a boolean indicating if the action is in progress
  const [state, formAction, pending] = useActionState(signup, initialState);

  const showColdStartMsg = useDelayedBoolean(pending, COLD_START_DELAY);


  return (
    <>
      <h2>Create account</h2>
      <form action={formAction}>
        <input type='email' name='email' placeholder='Email' autoComplete='email'/>
        <input type='password' name='password' placeholder='Password' />
        <input type='text' name='given-name' placeholder='Username' autoComplete='given-name'/>
        <button type='submit' disabled={pending}>
          {pending ? 'Creating account...' : 'Create account'}
        </button>
      {state.message && <p>{state.message}.</p>}
      </form>
      {pending && showColdStartMsg && <WakingUpServer />}
    </>
  );
}
