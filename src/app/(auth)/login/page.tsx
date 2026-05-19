import LoginForm from '@/components/LoginForm';
import AlternativeOption from '@/components/UI/AlternativeOption';
import Card from '@/components/UI/Card';

export default function LoginPage() {
  return (
    <Card>
      <LoginForm />
      <AlternativeOption
        text={"Don't have an account?"}
        linkName={'Sign up!'}
        linkHref={'/signup'}
      />
    </Card>
  );
}
