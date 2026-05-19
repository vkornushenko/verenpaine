import Card from '@/components/UI/Card';
import LogOutButton from '@/components/UI/buttons/LogOutButton';
import { getUser } from '@/services/user';

export default async function AccountPage() {
  const user = await getUser();
  return (
    <Card>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <LogOutButton />
    </Card>
  );
}
