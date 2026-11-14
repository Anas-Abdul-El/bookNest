import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import BookCard from "../components/BookCard";
import FilterPanel from "../components/FilterPanel";
import SearchBar from "../components/SearchBar";
import { books, categories } from "../data/books";
import {
  filterBooks,
  isSortOption,
  sortOptions,
  type BookFilters,
} from "../utils/filterBooks";

function readPrice(value: string | null): number | null {
  if (value === null || value === "") return null;
  const price = Number(value);
  return Number.isNaN(price) ? null : price;
}

function Books() {
  // The filters live in the URL (e.g. /books?category=Science&sort=rating),
  // so links from the Home page work and a filtered list can be shared.
  const [searchParams, setSearchParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const sortParam = searchParams.get("sort") ?? "";
  const filters: BookFilters = {
    search: searchParams.get("q") ?? "",
    category: searchParams.get("category") ?? "",
    minPrice: readPrice(searchParams.get("min")),
    maxPrice: readPrice(searchParams.get("max")),
    sort: isSortOption(sortParam) ? sortParam : "featured",
  };

  // Sets one URL parameter, or removes it when the value is empty.
  const updateParam = (key: string, value: string) => {
    setSearchParams(
      (params) => {
        if (value === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
        return params;
      },
      { replace: true },
    );
  };

  const clearFilters = () => {
    setSearchParams(
      (params) => {
        params.delete("category");
        params.delete("min");
        params.delete("max");
        return params;
      },
      { replace: true },
    );
  };

  const results = filterBooks(books, filters);
  const activeFilterCount =
    (filters.category ? 1 : 0) +
    (filters.minPrice !== null ? 1 : 0) +
    (filters.maxPrice !== null ? 1 : 0);

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-serif text-3xl font-bold sm:text-4xl">All books</h1>
      <p className="mt-2 text-stone-600">
        Search, filter and sort the whole BookNest catalogue.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <SearchBar
            value={filters.search}
            onChange={(value) => updateParam("q", value)}
          />
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setFiltersOpen((open) => !open)}
            className="flex-1 cursor-pointer rounded-md border border-stone-300 bg-white px-4 py-2.5 font-medium hover:bg-stone-50 lg:hidden"
            aria-expanded={filtersOpen}
            aria-controls="filter-panel"
          >
            Filters{activeFilterCount > 0 && ` (${activeFilterCount})`}
          </button>

          <label htmlFor="sort" className="sr-only">Sort by</label>
          <select
            id="sort"
            value={filters.sort}
            onChange={(event) =>
              updateParam("sort", event.target.value === "featured" ? "" : event.target.value)
            }
            className="flex-1 cursor-pointer rounded-md border border-stone-300 bg-white px-3 py-2.5 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 focus:outline-none"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-4">
        {/* Always visible on large screens; toggled by the Filters button on small ones */}
        <aside
          id="filter-panel"
          className={`${filtersOpen ? "block" : "hidden"} lg:block`}
        >
          <FilterPanel
            categories={categories}
            category={filters.category}
            minPrice={filters.minPrice}
            maxPrice={filters.maxPrice}
            onCategoryChange={(category) => updateParam("category", category)}
            onMinPriceChange={(price) => updateParam("min", price === null ? "" : String(price))}
            onMaxPriceChange={(price) => updateParam("max", price === null ? "" : String(price))}
            onClear={clearFilters}
          />
        </aside>

        <div className="lg:col-span-3">
          <p className="text-sm text-stone-600" aria-live="polite">
            {results.length} {results.length === 1 ? "book" : "books"} found
          </p>

          {results.length > 0 ? (
            <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="mt-4 rounded-lg bg-white p-10 text-center shadow-sm">
              <p className="text-5xl" aria-hidden="true">🔎</p>
              <p className="mt-4 font-serif text-xl font-bold">No books match your search</p>
              <p className="mt-2 text-stone-600">
                Try a different search or clear the filters.
              </p>
              <button
                type="button"
                onClick={() => setSearchParams({}, { replace: true })}
                className="mt-6 cursor-pointer rounded-md bg-brand-500 px-5 py-2.5 font-medium text-white hover:bg-brand-600"
              >
                Show all books
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Books;
