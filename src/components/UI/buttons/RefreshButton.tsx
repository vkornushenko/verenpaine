'use client';

import { refreshDataByTagName } from '@/services/measurements';
import { tagName } from '@/types/types';
import styles from '@/components/UI/buttons/RefreshButton.module.css'

type RefreshButtonProps = {
  tagName: tagName;
};

export default function RefreshButton({ tagName }: RefreshButtonProps) {
  return (
    <button
        className={styles.refresh}
      onClick={() => {
        refreshDataByTagName(tagName);
      }}
    >
      🔄
    </button>
  );
}
