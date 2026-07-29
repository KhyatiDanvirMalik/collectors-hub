# Collector's Hub

A responsive React + TypeScript web app for collectors to browse a marketplace,
discover community posts, and manage a personal collection (Owned / Wishlist /
Selling).

Built for the React Web Developer Internship Assignment.

---

## Setup Instructions

**Requirements:** Node.js 18+ and npm.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
# App runs at http://localhost:5173

# 3. Build for production
npm run build

# 4. Preview the production build
npm run preview
```

There is no backend to configure — all data is served from an in-memory mock
API layer (see `src/data/api.ts`), so the app runs immediately after `npm install`.

---

## Project Structure

```
src/
  types/            Shared TypeScript interfaces (Listing, Post, CollectionItem, ...)
  data/              Mock data (listings.ts, posts.ts) + simulated API layer (api.ts)
  context/           Global state: Collection, Feed likes/saves, Toast notifications
  hooks/             useAsync, useDebounce, useLocalStorage, useUrlFilters
  utils/             Pure filter/sort logic + formatting helpers
  components/
    common/          Button, SearchInput, Select, Modal, EmptyState, ErrorState,
                      Loader/Skeleton, SafeImage, SpecimenTag, CategoryBadge
    layout/          Navbar (desktop top bar + mobile bottom tabs), Layout
    marketplace/     ListingCard, MarketplaceFilters
    feed/            PostCard, FeedFilters
    collection/      CollectionItemCard, CollectionTabs, CollectionFilters, MoveItemModal
  pages/             MarketplacePage, ProductDetailPage, FeedPage, PostDetailPage,
                      MyCollectionPage, NotFoundPage
  App.tsx            Routing + context provider composition
```

The code is organized by feature (marketplace / feed / collection) with a shared
`common/` layer, so each module can be extended independently without touching
the others.

---

## Assumptions Made

- **No authentication.** As permitted by the brief, there's a single implicit
  "current user" — no login flow, no per-user accounts.
- **No real backend.** `src/data/api.ts` simulates a REST API: it returns the
  same mock dataset with artificial network latency (~400–600ms) and a small
  random failure rate (~6%), so loading and error states are genuinely
  exercised rather than only existing in markup.
- **Images** are sourced from `picsum.photos` (listings/posts) and
  `i.pravatar.cc` (avatars) using fixed seeds, so they're stable across
  reloads but not real product photography.
- **"Add to Collection" from the Marketplace** adds to the **Owned**
  collection; "Add to Wishlist" adds to **Wishlist**. The **Selling**
  collection is populated by moving an item there from My Collection (there's
  no separate "list an item for sale" flow, which wasn't in the brief).
  Estimated Value defaults to the listing's price if the listing doesn't set
  one explicitly.
- **De-duplication** is scoped per collection type: the same listing can be
  in both Owned and Wishlist simultaneously (e.g. "I own one but want a
  second"), but can't be added twice to the *same* collection — attempting
  that shows an inline error toast instead of creating a duplicate.
- **Persistence** uses `localStorage` (a bonus feature) so a visitor's
  collection, likes, and saved posts survive a page refresh. This is
  intentionally local per-browser rather than synced anywhere, consistent
  with "no authentication."
- **Filters persist across navigation** by living in the URL's query string
  (e.g. `/marketplace?category=Coins&sort=price-asc`). This satisfies the
  "maintain selected filters while navigating" requirement and also makes
  filtered views shareable/bookmarkable, and survives back/forward browser
  navigation.

---

## Libraries Used

| Library | Purpose |
|---|---|
| `react` / `react-dom` | UI framework |
| `react-router-dom` | Client-side routing (marketplace/feed/collection + detail pages, 404) |
| `typescript` | Static typing throughout |
| `vite` | Dev server + build tooling |
| CSS Modules (built into Vite) | Scoped component styling — no UI kit dependency, all components are hand-built |

No UI component library (Material UI / Chakra / Ant Design) was used — all
components (Button, Select, Modal, cards, etc.) are custom-built to keep the
bundle small and the visual identity distinctive. No external state management
library was needed; React Context + hooks were sufficient for this app's scope.

---

## Additional Features Implemented

Beyond the core functional requirements, this includes several of the
suggested bonus features:

- **Local persistence** — Collection items, liked posts, and saved posts
  survive a page refresh via `localStorage`.
- **Debounced search** — All three modules debounce search input (300ms)
  before filtering, avoiding excessive re-renders while typing.
- **Skeleton loaders** — Marketplace and Feed show animated skeleton card
  grids while data loads, instead of a generic spinner.
- **Filters persisted in the URL** — search/category/condition/sort state is
  stored in query params, so it survives navigation, refresh, and is
  shareable via link.
- **Lazy-loaded images** — all images use `loading="lazy"`.
- **Toast notifications** — every add/remove/move/duplicate action gives
  immediate, non-blocking feedback.
- **Graceful broken-image handling** — a dedicated `SafeImage` component
  shows a clear fallback state if an image URL is missing or fails to load,
  rather than a broken-image icon.
- **Fully responsive** — a top navbar on desktop/tablet becomes a bottom tab
  bar on mobile; all grids reflow from multi-column to single/double column
  with no horizontal scrolling at any breakpoint.
- **Distinctive visual design** — a custom "archival ledger" identity
  (Fraunces serif + Inter + JetBrains Mono, a brass/museum-green/wax-red
  palette, and a recurring "specimen tag" catalog-number motif on every card)
  rather than a generic template look.

---

## What Wasn't Implemented (Out of Scope)

- Infinite scrolling and dark mode were not implemented — pagination isn't
  needed at this dataset size (16 listings / 8 posts), and dark mode was
  deprioritized in favor of polishing the core three modules.
- No automated test suite — given the assignment's time expectations,
  effort was concentrated on correctness, UX polish, and code organization
  over test coverage.
