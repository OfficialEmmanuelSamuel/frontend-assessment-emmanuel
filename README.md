# frontend-assessment-emmanuel

TMDB Content Explorer built with Next.js App Router + TypeScript.

## Live URL

- Deployment: Add your live deployment URL here before submission.

## Public API Choice

- API: The Movie Database (TMDB)
- Docs: https://developer.themoviedb.org/docs
- Why: Rich media data, pagination support, query filtering, and realistic frontend data-shaping needs.

## Setup Instructions

```bash
git clone <your-repo-url>
cd frontend-assessment-emmanuel
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Environment Variables

From `.env.example`:

- `TMDB_API_KEY`
- `TMDB_BASE_URL`

Example `TMDB_BASE_URL`:

```bash
TMDB_BASE_URL=https://api.themoviedb.org/3
```

## Feature Coverage 

### F-1 Listing Page

- Listing route: `/movies`
- Server-rendered data fetch in App Router page component.
- Each card includes:
  - Movie title
  - Poster image with fallback when poster is missing
  - Metadata fields: rating and release year
- Responsive grid:
  - Mobile: 1 column
  - Tablet: 2 columns
  - Desktop: 4 columns
- Pagination implemented (URL-driven).
- Pagination justification:
  - It keeps navigation deterministic for large TMDB result sets and makes page position shareable with plain URLs.
  - It is easier to test and maintain than infinite scroll in this take-home timeframe while still meeting UX and performance goals.

### F-2 Detail Page

- Dynamic route: `/movies/[id]`
- Server data fetch via `getMovie` in server component.
- Metadata implemented using `generateMetadata`:
  - title
  - description
  - og:image
- Breadcrumb/back navigation to listing page.

### F-3 Search & Filtering

- Debounced search input (400ms).
- Additional filter: release year.
- Search/filter/page state is URL-driven and shareable.

### F-4 Loading, Error, Empty States

- `loading.tsx` provides skeleton loader layout.
- `error.tsx` provides friendly actionable error UI with retry.
- Empty-state message for no results.

### F-5 Deployment

- Target platform: Cloudflare Workers (preferred) or Vercel.
- Cloudflare/OpenNext stack configured in this repo:
  - `wrangler.jsonc`
  - `open-next.config.ts`
  - `public/_headers` (static cache headers)
  - scripts: `preview`, `deploy`, `upload`, `cf-typegen`
- Current status: add live URL before final submission.

## Cloudflare Deployment

1. Authenticate Wrangler:
   - `npx wrangler login`
2. Set required secrets:
   - `npx wrangler secret put TMDB_API_KEY`
   - `npx wrangler secret put TMDB_BASE_URL`
3. Preview locally in Workers runtime:
   - `npm run preview`
4. Deploy:
   - `npm run deploy`
   

## Architecture Decisions

- App Router route separation:
  - `app/movies/page.tsx` for listing
  - `app/movies/[id]/page.tsx` for detail
- API logic abstracted in `lib/tmdb.ts`.
- Shared data shapes in `types/movie.ts`.
- UI decomposed into reusable components (`MovieGrid`, `MovieCard`, `SearchBar`, `Filters`, `Pagination`, `EmptyState`).
- URL state handled in client components (`SearchBar`, `Filters`) while data fetching remains server-side.


## Performance Optimizations Applied

Implemented (3+ as requested):

1. `next/image` optimization on movie cards and detail page images.
   - Added responsive `sizes` for `fill` images and graceful fallback UI when image data is missing.
   - Marked above-the-fold detail hero image with `priority`.
2. Next.js fetch caching strategy (documented by route intent):
   - Listing/search in [`lib/tmdb.ts`](./lib/tmdb.ts): `revalidate: 60` to balance freshness and cache efficiency.
   - Detail fetch in [`lib/tmdb.ts`](./lib/tmdb.ts): `cache: "no-store"` for always-fresh item details.
3. Font optimization with `next/font`:
   - Quicksand for body text and Lato for headings in root layout.


## Testing

Test stack: Vitest + React Testing Library.

Implemented tests:

1. `components/Pagination.test.tsx`
   - Verifies pagination links preserve search + filter query params.
   - Verifies boundary behavior (hide unavailable Prev/Next links).
2. `components/SearchBar.test.tsx`
   - Verifies debounced URL update behavior.
   - Verifies page resets to 1 when search changes.
   - Verifies no navigation when query is unchanged.

Run tests:

```bash
npm run test
```

## Trade-offs and Known Limitations

- Year filter options are currently fixed (`2026`, `2023`) instead of dynamically generated.
- Detail page currently focuses on core metadata and overview; richer content (cast, genres, runtime formatting) can be added.
- Build in restricted/offline environments may fail font download for Google-hosted fonts.
- No bonus tasks implemented yet (Cloudflare edge cache headers, Suspense streaming segment, accessibility audit report).

## Bonus Tasks Attempted

- None yet.
