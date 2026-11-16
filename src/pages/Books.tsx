import { useState } from "react";
import BookCard from "../components/shared/BookCard";
import EmptyState from "../components/shared/EmptyState";
import FilterPanel from "../components/books/FilterPanel";
import SearchBar from "../components/books/SearchBar";
import { books, categories } from "../data/books";
import { useBookFilters } from "../hooks/useBookFilters";
import { buttonClass, inputClass } from "../styles/classNames";
import { filterBooks, isSortOption, sortOptions } from "../utils/filterBooks";
import { pluralize } from "../utils/format";

function Books() {
  const {
    filters,
    activeFilterCount,
    setSearch,
    setCategory,
    setMinPrice,
    setMaxPrice,
    setSort,
    clearFilters,
    resetAll,
  } = useBookFilters();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const results = filterBooks(books, filters);

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-serif text-3xl font-bold sm:text-4xl">All books</h1>
      <p className="mt-2 text-stone-600">Search, filter and sort the whole BookNest catalogue.</p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <SearchBar value={filters.search} onChange={setSearch} />
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setFiltersOpen((open) => !open)}
            className={`${buttonClass("secondary", "md")} flex-1 lg:hidden`}
            aria-expanded={filtersOpen}
            aria-controls="filter-panel"
          >
            Filters{activeFilterCount > 0 && ` (${activeFilterCount})`}
          </button>

          <label htmlFor="sort" className="sr-only">
            Sort by
          </label>
          <select
            id="sort"
            value={filters.sort}
            onChange={(event) => {
              if (isSortOption(event.target.value)) setSort(event.target.value);
            }}
            className={`${inputClass()} flex-1 cursor-pointer`}
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
        <aside id="filter-panel" className={`${filtersOpen ? "block" : "hidden"} lg:block`}>
          <FilterPanel
            categories={categories}
            category={filters.category}
            minPrice={filters.minPrice}
            maxPrice={filters.maxPrice}
            onCategoryChange={setCategory}
            onMinPriceChange={setMinPrice}
            onMaxPriceChange={setMaxPrice}
            onClear={clearFilters}
          />
        </aside>

        <div className="lg:col-span-3">
          <p className="text-sm text-stone-600" aria-live="polite">
            {pluralize(results.length, "book")} found
          </p>

          {results.length > 0 ? (
            <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon="🔎"
              title="No books match your search"
              className="mt-4 rounded-lg bg-white p-10 shadow-sm"
              action={
                <button type="button" onClick={resetAll} className={buttonClass("primary", "md")}>
                  Show all books
                </button>
              }
            >
              Try a different search or clear the filters.
            </EmptyState>
          )}
        </div>
      </div>
    </section>
  );
}

export default Books;
