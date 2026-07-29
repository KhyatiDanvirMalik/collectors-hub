import { useState } from 'react';
import styles from './SafeImage.module.css';

interface SafeImageProps {
  src?: string;
  alt: string;
  className?: string;
}

export function SafeImage({ src, alt, className }: SafeImageProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className={`${styles.fallback} ${className ?? ''}`} role="img" aria-label={alt}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="9" cy="10" r="1.5" fill="currentColor" />
          <path
            d="m5 17 4.5-4.5a1.5 1.5 0 0 1 2.1 0L15 16m-2-2 1.5-1.5a1.5 1.5 0 0 1 2.1 0L19 15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>Image unavailable</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
