import styles from '@/components/Header.module.css';
import Link from 'next/link';
import Container from '@/components/UI/Container';
import AuthLink from './AuthLink';

export default async function Header() {

  // const token = await getToken();

  return (
    <header className={styles.header}>
      <Container className={styles.headerInner}>
        <Link href={'/'}>VerenPaine App</Link>
        <AuthLink />
      </Container>
    </header>
  );
}