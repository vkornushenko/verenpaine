import styles from '@/components/ReadingsFilterForm.module.css';
import { IoClose } from 'react-icons/io5';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { formatDateTimeLocal } from '@/lib/date';
import { type FilterName } from '@/types/filter';

type ReadingsFilterFormProps = {
  modalToggler: () => void;
  presetFilterName: FilterName;
  onPresetFilterNameChange: (name: FilterName) => void;
  destination?: 'home' | 'analytics';
};

export default function ReadingsFilterForm({
  modalToggler,
  presetFilterName,
  onPresetFilterNameChange,
  destination = 'home',
}: ReadingsFilterFormProps) {
  type Range = {
    from: Date;
    to: Date;
  };
  type PresetFilterName = Exclude<FilterName, ''>;

  const now = new Date();

  const startOfWeek = new Date(now);
  const day = now.getDay();
  const diff = day === 0 ? 6 : day - 1;
  startOfWeek.setDate(now.getDate() - diff);
  startOfWeek.setHours(0, 0, 0, 0);

  const presetFilterRangeList: {
    name: PresetFilterName;
    range: Range;
  }[] = [
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

  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [dateRangeError, setDateRangeError] = useState('');

  function handleLinkFilter(range: Range, name: FilterName) {
    setDateRangeError('');
    setDateRangeLocal(range);
    onPresetFilterNameChange(name);
  }

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (
      !Number.isFinite(dateRangeLocal.from.getTime()) ||
      !Number.isFinite(dateRangeLocal.to.getTime()) ||
      dateRangeLocal.to < dateRangeLocal.from
    ) {
      setDateRangeError('Enter a valid date range.');
      return;
    }

    setDateRangeError('');

    const params = new URLSearchParams();
    params.set('from', dateRangeLocal.from.toISOString());
    params.set('to', dateRangeLocal.to.toISOString());

    if (destination === 'home') {
      params.set('page', '1');
    }
    const destinationHref =
      destination === 'home'
        ? `/?${params.toString()}#readings`
        : `/analytics?${params.toString()}`;
    startTransition(() => router.push(destinationHref));
    modalToggler();
  }

  return (
    <>
      <div className={styles.header_container}>
        <h2>Readings Filter</h2>
        <button
          type='button'
          onClick={modalToggler}
          className={styles.close_container}
        >
          <IoClose size={26} className={styles.closeBtn} />
          Close
        </button>
      </div>

      <ul className={styles.popular_filters_container}>
        {presetFilterRangeList.map((filter) => (
          <li
            key={filter.name}
            className={`${styles.filter_name} ${filter.name === presetFilterName ? styles.current : ''}`}
          >
            <button
              type='button'
              aria-pressed={filter.name === presetFilterName}
              onClick={() => handleLinkFilter(filter.range, filter.name)}
            >
              {filter.name}
            </button>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <input
          type='datetime-local'
          name='from'
          value={formatDateTimeLocal(dateRangeLocal.from)}
          onChange={(e) => {
            onPresetFilterNameChange('');
            setDateRangeError('');
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
            onPresetFilterNameChange('');
            setDateRangeError('');
            setDateRangeLocal((prev) => ({
              ...prev,
              to: new Date(e.target.value),
            }));
          }}
        />
        <button type='submit' disabled={pending}>
          {pending ? 'Applying readings filter...' : 'Apply readings filter'}
        </button>
        {dateRangeError && <p role='alert'>{dateRangeError}</p>}
      </form>
    </>
  );
}
