import Card from '@/components/UI/Card';
import LogOutButton from '@/components/UI/buttons/LogOutButton';
import { getUser } from '@/services/user';

export default async function AccountPage() {
  const user = await getUser();
  return (
    <Card>
      <h2>Account</h2>
      <div>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
      </div>
      <LogOutButton />
    </Card>
  );
}
