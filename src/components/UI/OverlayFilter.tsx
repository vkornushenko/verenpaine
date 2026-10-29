import styles from '@/components/UI/OverlayFilter.module.css';
import Card from '@/components/UI/Card';
import Container from './Container';
import { createPortal } from 'react-dom';

import ReadingsFilterForm from '@/components/ReadingsFilterForm';

import { type FilterName } from '@/types/types';

type OverlayFilterProps = {
  modalToggler: () => void;
  presetFilterName: FilterName;
  onPresetFilterNameChange: (name: FilterName) => void;
};

export default function OverlayFilter({
  modalToggler,
  presetFilterName,
  onPresetFilterNameChange,
}: OverlayFilterProps) {
  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      modalToggler();
    }
  }

  return createPortal(
    <div className={styles.overlay} onClick={handleBackdropClick}>
      <Container className={styles.overlayInner}>
        <Card>
          <ReadingsFilterForm
            modalToggler={modalToggler}
            presetFilterName={presetFilterName}
            onPresetFilterNameChange={onPresetFilterNameChange}
          />
        </Card>
      </Container>
    </div>,
    document.getElementById('modal-root')!,
  );
}
