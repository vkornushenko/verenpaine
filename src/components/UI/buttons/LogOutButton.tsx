'use client';

import { logOut } from '@/actions/auth';

export default function LogOutButton() {
  return (
    <button onClick={() => logOut()}>
      Log out
    </button>
  );
}
