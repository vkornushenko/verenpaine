'use client';

import Card from '@/components/UI/Card';
import LogOutButton from '@/components/UI/buttons/LogOutButton';
import { User } from '@/types/types';
import { useLocalDate } from '@/hooks/useLocalDate';
import styles from '@/components/AccountCard.module.css';

type AccountCardProps = {
  user: User;
  totalMeasurements: number;
  firstReading: string;
};

export default function AccountCard({
  user,
  totalMeasurements,
  firstReading,
}: AccountCardProps) {
  const localDateTime = useLocalDate(firstReading);

  return (
    <Card>
      <h2>Account</h2>
      <div className={styles.table}>
        <div>Name:</div>
        <div>{user.name}</div>
        <div>Email:</div>
        <div>{user.email}</div>
        <div>Readings saved:</div>
        <div>{totalMeasurements}</div>
        {firstReading && (
          <>
            <div>First reading:</div>
            <div>{localDateTime}</div>
          </>
        )}
      </div>
      
      <LogOutButton />
    </Card>
  );
}
