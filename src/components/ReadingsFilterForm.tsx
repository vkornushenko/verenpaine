import styles from '@/components/ReadingsFilterForm.module.css';
import { IoClose } from 'react-icons/io5';
import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { formatDateTimeLocal } from '@/lib/date';
import { type FilterName } from '@/types/types';


type ReadingsFilterFormProps = {
  modalToggler: () => void;
  initialFilterName: FilterName;
};

export default function ReadingsFilterForm({
  modalToggler, initialFilterName
}: ReadingsFilterFormProps) {
  const [pending, setPending] = useState(false);

  type Range = {
    from: Date;
    to: Date;
  };

  const now = new Date();

  const startOfWeek = new Date(now);
  const day = now.getDay();
  const diff = day === 0 ? 6 : day - 1;
  startOfWeek.setDate(now.getDate() - diff);
  startOfWeek.setHours(0, 0, 0, 0);

  const presetFilterRangeList = [
    {
      name: 'today',
      range: {
        from: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0),
        to: now,
      },
    },
    {
      name: 'this week',
      range: {
        from: startOfWeek,
        to: now,
      },
    },
    {
      name: 'this month',
      range: {
        from: new Date(now.getFullYear(), now.getMonth(), 1, 0, 0),
        to: now,
      },
    },
    {
      name: 'this year',
      range: {
        from: new Date(now.getFullYear(), 0, 1, 0, 0),
        to: now,
      },
    },
  ];

  const [dateRangeLocal, setDateRangeLocal] = useState(
    presetFilterRangeList[1].range,
  );
  const [presetFilterName, setPresetFilterName] = useState(initialFilterName);

  const router = useRouter();
  const searchParams = useSearchParams();
  const hasFilterParams =
    searchParams.has('from') || searchParams.has('to');
  const hadFilterParams = useRef(hasFilterParams);

  useEffect(() => {
    if (hadFilterParams.current && !hasFilterParams) {
      setPresetFilterName('');
    }

    hadFilterParams.current = hasFilterParams;
  }, [hasFilterParams]);

  function handleLinkFilter(range: Range, name: FilterName) {
    setDateRangeLocal(range);
    setPresetFilterName(name);
  }

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    
    const params = new URLSearchParams();

    console.log('dateRangeLocal.from:');
    console.log(dateRangeLocal.from);

    params.set('from', dateRangeLocal.from.toISOString());
    params.set('to', dateRangeLocal.to.toISOString());
    params.set('page', '1'); // reset pagination
    // params.set('perPage', '1000');

    router.push(`/?${params.toString()}#readings`);

    setPending(false);
    modalToggler();
  }

  return (
    <>
      <div className={styles.header_container}>
        <h2>Readings Filter</h2>
        <div onClick={modalToggler} className={styles.close_container}>
          <IoClose size={26} className={styles.closeBtn} />
          Close
        </div>
      </div>

      <div className={styles.popular_filters_container}>
        {/* <p className={styles.filter_group_name}>Period:</p> */}
        {presetFilterRangeList.map((filter, index) => (
          <p
            key={index}
            className={`${styles.filter_name} ${filter.name === presetFilterName ? styles.current : ''}`}
            onClick={() => handleLinkFilter(filter.range, filter.name as FilterName)}
          >
            {filter.name}
          </p>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type='datetime-local'
          name='from'
          value={formatDateTimeLocal(dateRangeLocal.from)}
          onChange={(e) => {
            setPresetFilterName('');
            setDateRangeLocal((prev) => ({
              ...prev,
              from: new Date(e.target.value),
            }));
          }}
        />

        <input
          type='datetime-local'
          name='to'
          value={formatDateTimeLocal(dateRangeLocal.to)}
          onChange={(e) => {
            setPresetFilterName('');
            setDateRangeLocal((prev) => ({
              ...prev,
              to: new Date(e.target.value),
            }));
          }}
        />
        <button type='submit' disabled={pending}>
          {pending ? 'Applying readings filter...' : 'Apply readings filter'}
        </button>
      </form>
    </>
  );
}
