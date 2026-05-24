// import { useEffect, useState } from 'react';
import styles from '@/components/UI/WakingUpServer.module.css';
import Card from './Card';
import Container from './Container';
import { CiServer } from 'react-icons/ci';

export default function WakingUpServer() {
  return (
    <div className={styles.overlay}>
      <Container>
        <Card>
          <div className={styles.header_container}>
            <CiServer size={24}/>
            <h2> Server is waking up…</h2>
          </div>
          <div>
            <p>
              This may take up to 10 seconds. Delay occurs because the app
              is hosted on a free-tier service.
            </p>
          </div>
          <div className={styles.progress_bar}>
            <div className={styles.progress_fill}></div>
          </div>
        </Card>
      </Container>
    </div>
  );
}
