import styles from '@/components/UI/Card.module.css';

export default function Card({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className={styles.card}>{children}</div>;
}
