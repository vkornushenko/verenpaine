import styles from '@/components/Footer.module.css';
import Container from '@/components/UI/Container';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container className={styles.footerInner}>
        <p>(c) 2026 VerenPaine App. All rights reserved.</p>
      </Container>
    </footer>
  );
}
