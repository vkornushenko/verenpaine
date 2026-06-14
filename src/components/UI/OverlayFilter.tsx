import styles from '@/components/UI/OverlayFilter.module.css';
import Card from '@/components/UI/Card';
import Container from './Container';
import { createPortal } from 'react-dom';

import ReadingsFilterForm from '@/components/ReadingsFilterForm';

type OverlayFilterProps = {
  modalToggler: () => void;
};

export default function OverlayFilter({ modalToggler }: OverlayFilterProps) {
  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    // console.log(e.target);
    // console.log(e.currentTarget);

    if (e.target === e.currentTarget) {
      modalToggler();
    }
  }

  return createPortal(
    <div className={styles.overlay} onClick={handleBackdropClick}>
      <Container className={styles.overlayInner}>
        <Card>
          <ReadingsFilterForm modalToggler={modalToggler}/>
        </Card>
      </Container>
    </div>,
    document.getElementById('modal-root')!,
  );
}
