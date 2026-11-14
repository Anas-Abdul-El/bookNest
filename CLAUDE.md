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

## Structure (target)

```
src/
├── assets/       images, icons
├── components/   Navbar, Footer, BookCard, SearchBar, FilterPanel, CartDrawer, CartItem
├── store/        Redux store + cartSlice
├── data/         books.json (mock catalogue)
├── pages/        Home, Books, BookDetails, About, Contact
├── types/        shared TS types (Book, CartItem)
├── App.tsx       routes
└── main.tsx      entry point (Provider + Router)
```

Built so far: Home, Books and About pages, the cart sidebar, shared Layout/Navbar/Footer/BookCard/BookCover, the cart slice with `localStorage` persistence, and the mock catalogue (`src/data/books.json`, read through `src/data/books.ts`). Routes not built yet fall through to `NotFound`.

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
- Use typed Redux hooks (`useAppDispatch`, `useAppSelector`) rather than raw `useDispatch`/`useSelector`.
- Define Zod schemas next to the form and infer form types with `z.infer`.
- Credit any external images or icons (academic integrity).

## Git and GitHub

- Do not add any Claude attribution anywhere in git or GitHub: no `Co-Authored-By: Claude ...` trailer in commit messages, no "Generated with Claude Code" line in PR descriptions, issues or comments, and no Claude-related author or committer identity.
- Claude must never appear as a contributor to this repository. Commits are authored only by the repository owner's configured git user.
