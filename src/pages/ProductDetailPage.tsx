import { useParams, Link } from 'react-router-dom';
import { useAsync } from '../hooks/useAsync';
import { fetchListingById } from '../data/api';
import { SafeImage } from '../components/common/SafeImage';
import { CategoryBadge } from '../components/common/CategoryBadge';
import { Button } from '../components/common/Button';
import { Loader } from '../components/common/Loader';
import { ErrorState } from '../components/common/ErrorState';
import { EmptyState } from '../components/common/EmptyState';
import { formatCurrency, formatDate } from '../utils/format';
import { useCollection, listingToCollectionInput } from '../context/CollectionContext';
import styles from './ProductDetailPage.module.css';

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: listing, isLoading, error, retry } = useAsync(
    () => fetchListingById(id ?? ''),
    [id]
  );
  const { addItem, isInCollection } = useCollection();

  if (isLoading) return <Loader label="Loading listing" />;
  if (error) return <ErrorState message={error} onRetry={retry} />;
  if (!listing) {
    return (
      <EmptyState
        title="Listing not found"
        description="This item may have been removed or the link is incorrect."
        action={
          <Link to="/marketplace">
            <Button variant="secondary">Back to Marketplace</Button>
          </Link>
        }
      />
    );
  }

  const inWishlist = isInCollection(listing.id, 'wishlist');
  const inOwned = isInCollection(listing.id, 'owned');

  return (
    <div>
      <Link to="/marketplace" className={styles.backLink}>
        ← Back to Marketplace
      </Link>

      <div className={styles.layout}>
        <div className={styles.imageWrap}>
          <SafeImage src={listing.imageUrl} alt={listing.title} className={styles.image} />
        </div>

        <div className={styles.info}>
          <CategoryBadge category={listing.category} />
          <h1 className={styles.title}>{listing.title}</h1>

          <div className={styles.priceRow}>
            <span className={styles.price}>{formatCurrency(listing.price)}</span>
            <span className={styles.condition}>{listing.condition} condition</span>
          </div>

          <p className={styles.description}>{listing.description}</p>

          <dl className={styles.metaGrid}>
            <div>
              <dt>Seller</dt>
              <dd>{listing.sellerName}</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>{listing.location}</dd>
            </div>
            <div>
              <dt>Listed</dt>
              <dd>{formatDate(listing.createdAt)}</dd>
            </div>
            <div>
              <dt>Est. value</dt>
              <dd>{formatCurrency(listing.estimatedValue ?? listing.price)}</dd>
            </div>
          </dl>

          <div className={styles.actions}>
            <Button
              variant={inOwned ? 'ghost' : 'primary'}
              onClick={() => addItem(listingToCollectionInput(listing), 'owned')}
              disabled={inOwned}
            >
              {inOwned ? 'In your Collection' : 'Add to Collection'}
            </Button>
            <Button
              variant={inWishlist ? 'ghost' : 'secondary'}
              onClick={() => addItem(listingToCollectionInput(listing), 'wishlist')}
              disabled={inWishlist}
            >
              {inWishlist ? 'In your Wishlist' : 'Add to Wishlist'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
