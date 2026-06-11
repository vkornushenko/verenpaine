import styles from '@/components/Footer.module.css';
import Container from '@/components/UI/Container';
import Link from 'next/link';
import { FaRegCopyright } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container className={styles.footerInner}>
        <FaRegCopyright />
        <p>
          2026 VerenPaine App by{' '}
          <Link target='_blank' href='https://github.com/vkornushenko'>
            Vladislav Korniushenko
          </Link>
          .
        </p>
      </Container>
    </footer>
  );
}
