'use client';

import Card from '@/components/UI/Card';
import LogOutButton from '@/components/UI/buttons/LogOutButton';
import { User } from '@/types/types';
import { useLocalDate } from '@/hooks/useLocalDate';

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
      <div>
        <p>
          Name: <strong>{user.name}</strong>
        </p>
        <p>
          Email: <strong>{user.email}</strong>
        </p>
        <p>
          Readings saved: <strong>{totalMeasurements}</strong>
        </p>

        {firstReading && (
          <p>
            First reading: <strong>{localDateTime}</strong>
          </p>
        )}
      </div>
      <LogOutButton />
    </Card>
  );
}
