import { useSearchParams } from "react-router-dom";
import { BOOK_FILTER_PARAMS } from "../constants/routes";
import { parsePrice } from "../utils/format";
import { DEFAULT_SORT, isSortOption, type BookFilters, type SortOption } from "../utils/filterBooks";

// The Books page filters live in the URL (e.g. /books?category=Science&sort=rating),
// so links from other pages open the list already filtered and a filtered
// list can be bookmarked or shared. This hook reads and updates them.
export function useBookFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortParam = searchParams.get(BOOK_FILTER_PARAMS.sort) ?? "";
  const filters: BookFilters = {
    search: searchParams.get(BOOK_FILTER_PARAMS.search) ?? "",
    category: searchParams.get(BOOK_FILTER_PARAMS.category) ?? "",
    minPrice: parsePrice(searchParams.get(BOOK_FILTER_PARAMS.minPrice)),
    maxPrice: parsePrice(searchParams.get(BOOK_FILTER_PARAMS.maxPrice)),
    sort: isSortOption(sortParam) ? sortParam : DEFAULT_SORT,
  };

  // Sets one parameter, or removes it when it is empty, so the URL stays short.
  // `replace` stops every keystroke from adding a browser history entry.
  const setParam = (key: string, value: string) => {
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

  const priceToParam = (price: number | null) => (price === null ? "" : String(price));

  return {
    filters,

    // Category and price filters that are switched on (search and sort are not counted).
    activeFilterCount: [
      filters.category !== "",
      filters.minPrice !== null,
      filters.maxPrice !== null,
    ].filter(Boolean).length,

    setSearch: (search: string) => setParam(BOOK_FILTER_PARAMS.search, search),
    setCategory: (category: string) => setParam(BOOK_FILTER_PARAMS.category, category),
    setMinPrice: (price: number | null) =>
      setParam(BOOK_FILTER_PARAMS.minPrice, priceToParam(price)),
    setMaxPrice: (price: number | null) =>
      setParam(BOOK_FILTER_PARAMS.maxPrice, priceToParam(price)),
    // The default sort is left out of the URL.
    setSort: (sort: SortOption) =>
      setParam(BOOK_FILTER_PARAMS.sort, sort === DEFAULT_SORT ? "" : sort),

    // Clears the category and price filters but keeps the search and sort.
    clearFilters: () =>
      setSearchParams(
        (params) => {
          params.delete(BOOK_FILTER_PARAMS.category);
          params.delete(BOOK_FILTER_PARAMS.minPrice);
          params.delete(BOOK_FILTER_PARAMS.maxPrice);
          return params;
        },
        { replace: true },
      ),

    // Clears everything, including the search and sort.
    resetAll: () => setSearchParams({}, { replace: true }),
  };
}
