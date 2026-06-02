import styles from '@/components/Footer.module.css';
import Container from '@/components/UI/Container';
import { FaRegCopyright } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container className={styles.footerInner}>
          <FaRegCopyright />
          <p> 2026 VerenPaine App. All rights reserved.</p>
      </Container>
    </footer>
  );
}
