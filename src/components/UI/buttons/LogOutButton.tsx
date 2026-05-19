'use client';

import { logOut } from '@/lib/auth';
import styles from '@/components/UI/buttons/LogOutButton.module.css';

export default function LogOutButton() {
  return (
    <button className={styles.logOutBtn} onClick={() => logOut()}>
      Log out
    </button>
  );
}
