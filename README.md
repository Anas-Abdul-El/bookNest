# BookNest

> **This is a university assignment.** It was built for Project Phase 1 of the **Advanced Web Programming** course. It is a learning project, not a production store.

BookNest is a responsive online bookstore that runs entirely in the browser, built with **React**. Visitors can browse a book catalogue, search and filter it by title, author and category, open a details page for any book, and keep a shopping cart that is still there when they come back.

The full write-up is in [`BookNest_Project_Report.pdf`](./BookNest_Project_Report.pdf).

| | |
|---|---|
| **Course** | Advanced Web Programming, Project Phase 1 |
| **Student** | Anas |
| **Team** | Individual project (1 member) |
| **Live demo** | _[add deployment URL]_ |

---

## Features

- **Catalogue:** books shown as responsive cards (1 column on phones, 2 on tablets, 3–4 on desktops).
- **Search, filter and sort:** search by title or author, filter by category and price range, and sort the results.
- **Book pages:** each book has its own details page at `/books/:id`.
- **Shopping cart:** add books, change quantities, remove items and see the running total.
- **Saved cart:** the cart is kept in `localStorage`, so it survives page reloads.
- **Contact form:** the form checks its fields before sending.
- **Mobile-first layout:** works on screens from 360 px wide up to large desktops, with a hamburger menu on small screens.

## Pages

| Page | Route | Purpose |
|---|---|---|
| Home | `/` | Hero banner, featured books, categories, call to action |
| Books | `/books` | Full catalogue with search, filters and sorting |
| Book Details | `/books/:id` | Cover, description, price, rating, add-to-cart |
| Cart | `/cart` | Line items, quantity controls, total, simulated checkout |
| About | `/about` | Store story, mission and team |
| Contact | `/contact` | Contact form with validation and store information |

## Tech stack

| Technology | Role |
|---|---|
| React + TypeScript (Vite) | Builds the user interface; Vite runs the dev server and makes production builds |
| React Router | Moves between pages in the browser, including the `/books/:id` route |
| Tailwind CSS | Styling with utility classes and screen-size breakpoints |
| React Context + `useReducer` | Shared cart state (`ADD`, `REMOVE`, `UPDATE_QTY`, `CLEAR`) |
| `localStorage` | Saves the cart between visits |
| JSON mock data | A local book catalogue used in place of a backend |
| ESLint | Linting |

## Project structure

```
src/
├── assets/          images, icons
├── components/      Navbar, Footer, BookCard, SearchBar, FilterPanel, CartItem
├── context/         CartContext (shared cart state, saved to localStorage)
├── data/            books.json (mock catalogue)
├── pages/           Home, Books, BookDetails, Cart, About, Contact
├── App.tsx          routes
└── main.tsx         entry point
```

### Book data model

| Field | Type | Description |
|---|---|---|
| `id` | number | Unique ID used in the details route |
| `title` / `author` | string | Shown on the page and used by search |
| `category` | string | Fiction, Science, History, Technology, … |
| `price` | number | Unit price in USD |
| `rating` | number | Average rating, 0–5 |
| `cover` | string | Path or URL of the cover image |
| `description` | string | Short summary shown on the details page |

## Getting started

**You need:** Node.js 20 or later, and [pnpm](https://pnpm.io/) (npm works too).

```bash
# clone the repository
git clone <repository-url>
cd bookNest

# install dependencies
pnpm install

# start the dev server
pnpm dev
```

### Available scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start the Vite dev server |
| `pnpm build` | Type-check and build for production into `dist/` |
| `pnpm preview` | Preview the production build locally |
| `pnpm lint` | Run ESLint |

## Deployment

`pnpm build` creates a static production build. The plan is to host it on Vercel, Netlify or GitHub Pages, linked to this repository so that every push to `main` deploys a new version.

## Screenshots

_Screenshots of Home, Books, Book Details, Cart and the mobile views will be added here._

## Scope and limitations

Phase 1 covers **only the frontend**:

- Book data comes from a local JSON file.
- Checkout is simulated.
- There is no backend, login or real payment processing.

## Future work

- Connect a backend API and database (e.g. Node.js/Express + MongoDB).
- Add user registration, login and order history.
- Integrate a real payment gateway.
- Add wishlists, reviews and recommendations.
- Add automated tests with Vitest and React Testing Library.

## Academic integrity

This project was completed individually as university coursework. Any external libraries, images or icons used are credited.
