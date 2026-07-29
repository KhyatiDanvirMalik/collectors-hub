import { Link } from 'react-router-dom';
import type { Listing } from '../../types';
import { SafeImage } from '../common/SafeImage';
import { SpecimenTag } from '../common/SpecimenTag';
import { CategoryBadge } from '../common/CategoryBadge';
import { formatCurrency } from '../../utils/format';
import { useCollection, listingToCollectionInput } from '../../context/CollectionContext';
import styles from './ListingCard.module.css';

interface ListingCardProps {
  listing: Listing;
  catalogNumber: string;
}

export function ListingCard({ listing, catalogNumber }: ListingCardProps) {
  const { addItem, isInCollection } = useCollection();

  const inWishlist = isInCollection(listing.id, 'wishlist');
  const inOwned = isInCollection(listing.id, 'owned');

  const handleAddTo = (e: React.MouseEvent, type: 'owned' | 'wishlist') => {
    e.preventDefault();
    e.stopPropagation();
    addItem(listingToCollectionInput(listing), type);
  };

  return (
    <Link to={`/marketplace/${listing.id}`} className={styles.card}>
      <div className={styles.imageWrap}>
        <SafeImage src={listing.imageUrl} alt={listing.title} className={styles.image} />
        <SpecimenTag catalogNumber={catalogNumber} />
      </div>

      <div className={styles.body}>
        <div className={styles.metaRow}>
          <CategoryBadge category={listing.category} />
          <span className={styles.condition}>{listing.condition}</span>
        </div>

        <h3 className={styles.title}>{listing.title}</h3>

        <div className={styles.sellerRow}>
          <span>{listing.sellerName}</span>
          <span aria-hidden="true">·</span>
          <span>{listing.location}</span>
        </div>

        <div className={styles.footer}>
          <span className={styles.price}>{formatCurrency(listing.price)}</span>
          <div className={styles.actions}>
            <button
              type="button"
              className={`${styles.iconBtn} ${inWishlist ? styles.iconBtnActive : ''}`}
              onClick={(e) => handleAddTo(e, 'wishlist')}
              aria-label={inWishlist ? 'Already in wishlist' : 'Add to wishlist'}
              title="Add to Wishlist"
            >
              <HeartIcon filled={inWishlist} />
            </button>
            <button
              type="button"
              className={`${styles.iconBtn} ${inOwned ? styles.iconBtnActive : ''}`}
              onClick={(e) => handleAddTo(e, 'owned')}
              aria-label={inOwned ? 'Already in collection' : 'Add to collection'}
              title="Add to Collection"
            >
              <PlusIcon added={inOwned} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} aria-hidden="true">
      <path
        d="M12 20.5s-7.5-4.7-9.8-9.3C.7 7.9 2.4 4.5 5.8 4a4.9 4.9 0 0 1 6.2 2.3A4.9 4.9 0 0 1 18.2 4c3.4.5 5.1 3.9 3.6 7.2C19.5 15.8 12 20.5 12 20.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlusIcon({ added }: { added: boolean }) {
  if (added) {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="m5 13 4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
