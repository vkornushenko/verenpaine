import styles from '@/components/UI/Container.module.css';

export default function Container({
  children,
  className = '',
}: Readonly<{
  children: React.ReactNode,
  className?: string,
}>) {
  return (
    <div className={className ? `${styles.container} ${className}` : styles.container}>
      {children}
    </div>
  )
}
