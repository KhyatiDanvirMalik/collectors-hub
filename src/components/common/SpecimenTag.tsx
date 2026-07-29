import styles from './SpecimenTag.module.css';

interface SpecimenTagProps {
  catalogNumber: string;
}

/**
 * The recurring "signature" visual motif across the app: a small
 * perforated specimen tag bearing a catalog number, styled after
 * museum accession labels. Appears on marketplace listings and
 * collection items to reinforce the archival / cataloging concept.
 */
export function SpecimenTag({ catalogNumber }: SpecimenTagProps) {
  return (
    <div className={styles.tag} aria-hidden="true">
      <span className={styles.hole} />
      NO. {catalogNumber}
    </div>
  );
}
