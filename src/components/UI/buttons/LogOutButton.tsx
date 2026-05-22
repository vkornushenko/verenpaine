'use client';

import { logOut } from '@/lib/auth';

export default function LogOutButton() {
  return (
    <button onClick={() => logOut()}>
      Log out
    </button>
  );
}
