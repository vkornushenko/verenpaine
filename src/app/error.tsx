'use client';

import Card from '@/components/UI/Card';
import Link from 'next/link';

export default function ErrorPage({
  error,
  // unstable_retry,
}: {
  error: Error & { digest?: string }
  // unstable_retry: () => void
}) {
  console.log(error)
  return (
    <Card>
      <h2>Error happend</h2>
      <p>
        Error: {error.message}.
        Navigate back <Link href='/'>to the main page.</Link>
      </p>
    </Card>
  );
}
