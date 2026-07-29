import { Link } from 'react-router-dom';
import { EmptyState } from '../components/common/EmptyState';
import { Button } from '../components/common/Button';

export function NotFoundPage() {
  return (
    <EmptyState
      title="Page not found"
      description="The page you're looking for doesn't exist or may have moved."
      action={
        <Link to="/marketplace">
          <Button variant="primary">Go to Marketplace</Button>
        </Link>
      }
    />
  );
}
