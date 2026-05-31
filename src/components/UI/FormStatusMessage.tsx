import styles from '@/components/UI/FormStatusMessage.module.css';

type FormStatusMessageProps = {
  message: string;
};

export default function FormStatusMessage({ message }: FormStatusMessageProps) {
  return (
    <div className={styles.form_status}>
      <p>{message}</p>
    </div>
  );
}
