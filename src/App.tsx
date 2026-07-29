import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { CollectionProvider } from './context/CollectionContext';
import { FeedInteractionsProvider } from './context/FeedInteractionsContext';
import { Layout } from './components/layout/Layout';
import { MarketplacePage } from './pages/MarketplacePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { FeedPage } from './pages/FeedPage';
import { PostDetailPage } from './pages/PostDetailPage';
import { MyCollectionPage } from './pages/MyCollectionPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  return (
    <ToastProvider>
      <CollectionProvider>
        <FeedInteractionsProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<Navigate to="/marketplace" replace />} />
                <Route path="marketplace" element={<MarketplacePage />} />
                <Route path="marketplace/:id" element={<ProductDetailPage />} />
                <Route path="feed" element={<FeedPage />} />
                <Route path="feed/:id" element={<PostDetailPage />} />
                <Route path="collection" element={<MyCollectionPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </FeedInteractionsProvider>
      </CollectionProvider>
    </ToastProvider>
  );
}
