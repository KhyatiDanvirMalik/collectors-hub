// ---------- Shared enums / literal unions ----------

export type Category =
  | 'Coins'
  | 'Stamps'
  | 'Trading Cards'
  | 'Comics'
  | 'Vintage Toys'
  | 'Watches'
  | 'Vinyl Records'
  | 'Sports Memorabilia'
  | 'Art & Prints'
  | 'Antiques';

export type Condition = 'Mint' | 'Near Mint' | 'Excellent' | 'Good' | 'Fair' | 'Poor';

export type SortOption = 'newest' | 'price-asc' | 'price-desc';

export type CollectionType = 'owned' | 'wishlist' | 'selling';

// ---------- Marketplace ----------

export interface Listing {
  id: string;
  title: string;
  category: Category;
  condition: Condition;
  price: number;
  sellerName: string;
  location: string;
  imageUrl: string;
  description: string;
  createdAt: string; // ISO date
  estimatedValue?: number;
}

// ---------- Community Feed ----------

export interface Comment {
  id: string;
  userName: string;
  userAvatar: string;
  text: string;
  createdAt: string;
}

export interface Post {
  id: string;
  userName: string;
  userAvatar: string;
  imageUrl: string;
  caption: string;
  category: Category;
  likes: number;
  comments: Comment[];
  createdAt: string;
}

// ---------- My Collection ----------

export interface CollectionItem {
  id: string; // unique id within the collection store
  listingId: string; // originating listing/post id, for de-dup checks
  title: string;
  category: Category;
  imageUrl: string;
  dateAdded: string; // ISO date
  estimatedValue: number;
  collectionType: CollectionType;
}

// ---------- Async state helper ----------

export interface AsyncState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

// ---------- Toast / feedback ----------

export type ToastVariant = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: string;
  message: string;
  variant: ToastVariant;
}
