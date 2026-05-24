// import { useEffect, useState } from 'react';
import styles from '@/components/UI/WakingUpServer.module.css';
import Card from './Card';
import Container from './Container';

export default function WakingUpServer() {

  return (
    <div className={styles.overlay}>
      <Container>
        <Card>
          <h2>Server is waking up…</h2>
          <div>
            <p>
              This may take up to 10 seconds. This delay occurs
              because the app is hosted on a free-tier service.
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
