import Link from 'next/link';
import styles from '@/components/UI/AlternativeOption.module.css';

type altOptContentProps = {
  text: string;
  linkName: string;
  linkHref: string;
};

export default function AlternativeOption({
  text,
  linkName,
  linkHref,
}: altOptContentProps) {
  return (
    <div className={styles.alternative_link_container}>
      <p>{text}</p>
      <Link href={linkHref}>{linkName}</Link>
    </div>
  );
}
