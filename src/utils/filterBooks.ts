import type { Book } from "../types/book";

export const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating", label: "Top rated" },
  { value: "title", label: "Title: A to Z" },
] as const;

export type SortOption = (typeof sortOptions)[number]["value"];

export type BookFilters = {
  search: string;
  category: string; // "" means all categories
  minPrice: number | null;
  maxPrice: number | null;
  sort: SortOption;
};

export function isSortOption(value: string): value is SortOption {
  return sortOptions.some((option) => option.value === value);
}

// Returns the books that match every filter, in the chosen order.
// The original array is never changed.
export function filterBooks(books: Book[], filters: BookFilters): Book[] {
  const search = filters.search.trim().toLowerCase();

  const matching = books.filter((book) => {
    const matchesSearch =
      search === "" ||
      book.title.toLowerCase().includes(search) ||
      book.author.toLowerCase().includes(search);
    const matchesCategory =
      filters.category === "" || book.category === filters.category;
    const matchesMin = filters.minPrice === null || book.price >= filters.minPrice;
    const matchesMax = filters.maxPrice === null || book.price <= filters.maxPrice;

    return matchesSearch && matchesCategory && matchesMin && matchesMax;
  });

  switch (filters.sort) {
    case "price-asc":
      return matching.sort((a, b) => a.price - b.price);
    case "price-desc":
      return matching.sort((a, b) => b.price - a.price);
    case "rating":
      return matching.sort((a, b) => b.rating - a.rating);
    case "title":
      return matching.sort((a, b) => a.title.localeCompare(b.title));
    case "featured":
      return matching;
  }
}
