import styles from '@/components/UI/Card.module.css';

type CardProps = {
  children: React.ReactNode;
  id?: string;
};

export default function Card({ children, id }: Readonly<CardProps>) {
  return (
    <section className={styles.card} id={id}>
      {children}
    </section>
  );
}
