import type { ChangeEvent } from 'react';
import styles from './Select.module.css';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  ariaLabel: string;
}

export function Select({ value, onChange, options, ariaLabel }: SelectProps) {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => onChange(e.target.value);

  return (
    <div className={styles.wrap}>
      <select
        className={styles.select}
        value={value}
        onChange={handleChange}
        aria-label={ariaLabel}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <svg className={styles.chevron} width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
