import { createContext, useContext, type ReactNode } from 'react';
import type { CollectionItem, CollectionType, Listing, Post } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useToast } from './ToastContext';
import { generateId } from '../utils/format';

interface AddItemInput {
  listingId: string;
  title: string;
  category: CollectionItem['category'];
  imageUrl: string;
  estimatedValue: number;
}

interface CollectionContextValue {
  items: CollectionItem[];
  addItem: (input: AddItemInput, collectionType: CollectionType) => boolean;
  removeItem: (id: string) => void;
  moveItem: (id: string, toCollection: CollectionType) => void;
  isInCollection: (listingId: string, collectionType: CollectionType) => boolean;
  getByType: (collectionType: CollectionType) => CollectionItem[];
}

const CollectionContext = createContext<CollectionContextValue | undefined>(undefined);

export function CollectionProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useLocalStorage<CollectionItem[]>('collectors-hub:collection', []);
  const { showToast } = useToast();

  const isInCollection = (listingId: string, collectionType: CollectionType) =>
    items.some((item) => item.listingId === listingId && item.collectionType === collectionType);

  const addItem = (input: AddItemInput, collectionType: CollectionType): boolean => {
    if (isInCollection(input.listingId, collectionType)) {
      showToast(`"${input.title}" is already in ${labelFor(collectionType)}.`, 'error');
      return false;
    }

    const newItem: CollectionItem = {
      id: generateId('item'),
      listingId: input.listingId,
      title: input.title,
      category: input.category,
      imageUrl: input.imageUrl,
      dateAdded: new Date().toISOString(),
      estimatedValue: input.estimatedValue,
      collectionType,
    };

    setItems((prev) => [newItem, ...prev]);
    showToast(`Added "${input.title}" to ${labelFor(collectionType)}.`, 'success');
    return true;
  };

  const removeItem = (id: string) => {
    const item = items.find((i) => i.id === id);
    setItems((prev) => prev.filter((i) => i.id !== id));
    if (item) showToast(`Removed "${item.title}" from ${labelFor(item.collectionType)}.`, 'info');
  };

  const moveItem = (id: string, toCollection: CollectionType) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;

    if (item.collectionType === toCollection) return;

    if (isInCollection(item.listingId, toCollection)) {
      showToast(`"${item.title}" already exists in ${labelFor(toCollection)}.`, 'error');
      return;
    }

    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, collectionType: toCollection } : i))
    );
    showToast(`Moved "${item.title}" to ${labelFor(toCollection)}.`, 'success');
  };

  const getByType = (collectionType: CollectionType) =>
    items.filter((i) => i.collectionType === collectionType);

  return (
    <CollectionContext.Provider
      value={{ items, addItem, removeItem, moveItem, isInCollection, getByType }}
    >
      {children}
    </CollectionContext.Provider>
  );
}

function labelFor(type: CollectionType): string {
  switch (type) {
    case 'owned':
      return 'Owned';
    case 'wishlist':
      return 'Wishlist';
    case 'selling':
      return 'Selling';
  }
}

export function useCollection() {
  const ctx = useContext(CollectionContext);
  if (!ctx) throw new Error('useCollection must be used within a CollectionProvider');
  return ctx;
}

// Convenience helpers to build an AddItemInput from domain objects.
export function listingToCollectionInput(listing: Listing): AddItemInput {
  return {
    listingId: listing.id,
    title: listing.title,
    category: listing.category,
    imageUrl: listing.imageUrl,
    estimatedValue: listing.estimatedValue ?? listing.price,
  };
}

export function postToCollectionInput(post: Post): AddItemInput {
  return {
    listingId: post.id,
    title: post.caption.slice(0, 60),
    category: post.category,
    imageUrl: post.imageUrl,
    estimatedValue: 0,
  };
}
