import { createContext, useContext, type ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface FeedInteractionsValue {
  likedPostIds: string[];
  savedPostIds: string[];
  toggleLike: (postId: string) => void;
  toggleSave: (postId: string) => void;
  isLiked: (postId: string) => boolean;
  isSaved: (postId: string) => boolean;
}

const FeedInteractionsContext = createContext<FeedInteractionsValue | undefined>(undefined);

export function FeedInteractionsProvider({ children }: { children: ReactNode }) {
  const [likedPostIds, setLikedPostIds] = useLocalStorage<string[]>(
    'collectors-hub:liked-posts',
    []
  );
  const [savedPostIds, setSavedPostIds] = useLocalStorage<string[]>(
    'collectors-hub:saved-posts',
    []
  );

  const toggleLike = (postId: string) => {
    setLikedPostIds((prev) =>
      prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]
    );
  };

  const toggleSave = (postId: string) => {
    setSavedPostIds((prev) =>
      prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]
    );
  };

  const isLiked = (postId: string) => likedPostIds.includes(postId);
  const isSaved = (postId: string) => savedPostIds.includes(postId);

  return (
    <FeedInteractionsContext.Provider
      value={{ likedPostIds, savedPostIds, toggleLike, toggleSave, isLiked, isSaved }}
    >
      {children}
    </FeedInteractionsContext.Provider>
  );
}

export function useFeedInteractions() {
  const ctx = useContext(FeedInteractionsContext);
  if (!ctx) throw new Error('useFeedInteractions must be used within a FeedInteractionsProvider');
  return ctx;
}
