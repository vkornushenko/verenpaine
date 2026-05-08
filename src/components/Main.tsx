import styles from '@/components/Main.module.css';
import Container from '@/components/UI/Container';

export default function Main({
  children,
  className = '',
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <main className={className ? `${styles.main} ${className}` : styles.main}>
      <Container className={styles.mainInner}>{children}</Container>
    </main>
  );
}
