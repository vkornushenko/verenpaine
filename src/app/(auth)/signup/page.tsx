import SignUpForm from '@/components/SignUpForm';
import AlternativeOption from '@/components/UI/AlternativeOption';
import Card from '@/components/UI/Card';

export default function SignUpPage() {
  return (
    <Card>
      <SignUpForm />
      <AlternativeOption
        text={'Already have an account?'}
        linkName={'Login!'}
        linkHref={'/login'}
      />
    </Card>
  );
}
