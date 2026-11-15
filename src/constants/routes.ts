export const ROUTES = {
  home: "/",
  books: "/books",
  bookDetails: "/books/:id",
  about: "/about",
  contact: "/contact",
} as const;

// The query-string keys the Books page reads its filters from,
// e.g. /books?q=sapiens&category=History&min=10&max=20&sort=rating
export const BOOK_FILTER_PARAMS = {
  search: "q",
  category: "category",
  minPrice: "min",
  maxPrice: "max",
  sort: "sort",
} as const;

export const NAV_LINKS = [
  { to: ROUTES.home, label: "Home" },
  { to: ROUTES.books, label: "Books" },
  { to: ROUTES.about, label: "About" },
  { to: ROUTES.contact, label: "Contact" },
] as const;

export function bookPath(id: number): string {
  return `${ROUTES.books}/${id}`;
}

// The Books page, already filtered to one category.
export function categoryPath(category: string): string {
  const params = new URLSearchParams({ [BOOK_FILTER_PARAMS.category]: category });
  return `${ROUTES.books}?${params}`;
}
