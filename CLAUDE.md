# BookNest

University assignment (Advanced Web Programming, Project Phase 1, individual). A frontend-only online bookstore in React. Learning project: keep code clear and readable over clever. The full spec is in `README.md` and `BookNest_Project_Report.pdf` (git-ignored).

## Commands

Use **pnpm** (not npm/yarn).

- `pnpm dev` — Vite dev server
- `pnpm build` — `tsc -b && vite build` (run this to verify changes; it type-checks)
- `pnpm lint` — ESLint
- `pnpm preview` — serve the production build

There are no tests yet (Vitest + React Testing Library is listed as future work).

## Stack

- React 19 + TypeScript 6 + Vite 8
- **Tailwind CSS v4** via `@tailwindcss/vite`. No `tailwind.config.js`; config lives in CSS (`@import "tailwindcss"` and `@theme` in `src/index.css`). Style with utility classes, mobile-first breakpoints.
- **React Router** (`react-router-dom` v7) for routing
- **Redux Toolkit** + `react-redux` for shared state (the cart)
- **React Hook Form** + **Zod** (`@hookform/resolvers/zod`) for forms
- Mock data from a local JSON file; no backend

## Routes

| Route | Page |
|---|---|
| `/` | Home: hero, featured books, categories, CTA |
| `/books` | Catalogue: search (title/author), filter (category, price range), sort |
| `/books/:id` | Book details: cover, description, price, rating, add to cart |
| `/about` | Store story, mission, team |
| `/contact` | Contact form validated with Zod + React Hook Form |

There is no `/cart` page. The cart is a slide-in sidebar (`CartDrawer`) opened from the Navbar's cart button; its open state lives in `Navbar`.

## Structure

```
src/
├── components/   grouped by the page that uses them:
│   ├── books/    FilterPanel, SearchBar (Books page only)
│   ├── contact/  ContactForm, FormField (Contact page only)
│   ├── layout/   Layout, Navbar, Footer, ScrollToTop, CartDrawer, CartItem (on every page)
│   └── shared/   used by several pages: BookCard, BookCover, RatingStars, EmptyState,
│                 PageHeader, SectionHeader, CtaBanner
├── constants/    routes.ts (ROUTES, NAV_LINKS, bookPath, categoryPath, filter URL keys),
│                 storeInfo.ts (store name, contact details), catalogue.ts (counts, currency)
├── data/         books.json (mock catalogue), books.ts (lookups), categories.ts (icons, cover colours)
├── hooks/        useBookFilters (Books page filters, stored in the URL)
├── pages/        Home, Books, BookDetails, About, Contact, NotFound
├── store/        Redux store, cartSlice (actions + selectors), cartStorage (localStorage)
├── styles/       classNames.ts (buttonClass, inputClass)
├── types/        shared TS types (Book, CartItem)
├── utils/        filterBooks, format (formatPrice, pluralize, parsePrice), form helpers
├── App.tsx       routes
└── main.tsx      entry point (Provider + Router)
```

Built so far: every page (Home, Books, Book Details, About, Contact), the cart sidebar, and the cart slice with `localStorage` persistence. Unknown routes and unknown book ids show a not-found message. `ScrollToTop` in `Layout` scrolls to the top on every path change.

Books have `"cover": ""` in the mock data; `BookCover` then draws a coloured placeholder cover per category, so no outside images (and no image credits) are needed. Set `cover` to a path in `public/` to use a real image.

## Data model

```ts
type Book = {
  id: number;          // used in /books/:id
  title: string;
  author: string;
  category: string;    // Fiction, Science, History, Technology, ...
  price: number;       // USD
  rating: number;      // 0–5
  cover: string;       // path or URL
  description: string;
};
```

## Requirements to keep in mind

- **Cart:** actions add, remove, update quantity, clear. Persist to `localStorage` and rehydrate on load, so it survives reloads. Guard `localStorage` access with try/catch.
- **Responsive:** 360px phones up to large desktops. Book grid is 1 column on phones, 2 on tablets, 3–4 on desktop. Hamburger menu on small screens.
- **Scope:** frontend only. Checkout is simulated, no login, no real payments.

## Conventions

- TypeScript strict-ish config with `verbatimModuleSyntax`: use `import type` for type-only imports. `noUnusedLocals`/`noUnusedParameters` are on.
- Functional components and hooks only. One component per file, PascalCase filenames.
- Put a component used by one page in `components/<page>/` (lowercase page name); move it to `components/shared/` once a second page uses it. App-wide chrome goes in `components/layout/`.
- Use typed Redux hooks (`useAppDispatch`, `useAppSelector`) rather than raw `useDispatch`/`useSelector`.
- Define Zod schemas next to the form and infer form types with `z.infer`. Keep length limits as named constants shared by the schema and the UI.
- No hard-coded values in components:
  - Paths: `ROUTES`, `bookPath(id)`, `categoryPath(category)` from `constants/routes.ts`.
  - Store name and contact details: `STORE_INFO`. Counts and currency: `constants/catalogue.ts`.
  - Prices: `formatPrice()`. Counts with a noun: `pluralize()`.
  - Buttons and links styled as buttons: `buttonClass(variant, size)`. Inputs: `inputClass()`.
  - Category icons and cover colours: `getCategoryStyle()`.
- Reuse the shared UI components (`EmptyState`, `PageHeader`, `CtaBanner`, `SectionHeader`, `FormField`, `RatingStars`) instead of copying their markup.
- Cart selectors live in `cartSlice.ts` (`selectCartCount`, `selectQuantityInCart`, …); read them with `useAppSelector`.
- Credit any external images or icons (academic integrity).

## Git and GitHub

- Do not add any Claude attribution anywhere in git or GitHub: no `Co-Authored-By: Claude ...` trailer in commit messages, no "Generated with Claude Code" line in PR descriptions, issues or comments, and no Claude-related author or committer identity.
- Claude must never appear as a contributor to this repository. Commits are authored only by the repository owner's configured git user.
