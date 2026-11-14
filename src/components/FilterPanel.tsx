type FilterPanelProps = {
  categories: string[];
  category: string;
  minPrice: number | null;
  maxPrice: number | null;
  onCategoryChange: (category: string) => void;
  onMinPriceChange: (price: number | null) => void;
  onMaxPriceChange: (price: number | null) => void;
  onClear: () => void;
};

// An empty price box means "no limit".
function toPrice(value: string): number | null {
  if (value === "") return null;
  const price = Number(value);
  return Number.isNaN(price) || price < 0 ? null : price;
}

function FilterPanel({
  categories,
  category,
  minPrice,
  maxPrice,
  onCategoryChange,
  onMinPriceChange,
  onMaxPriceChange,
  onClear,
}: FilterPanelProps) {
  const radioClass = "h-4 w-4 accent-brand-500";
  const priceInputClass =
    "w-full rounded-md border border-stone-300 bg-white px-3 py-2 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 focus:outline-none";

  return (
    <div className="space-y-6 rounded-lg bg-white p-5 shadow-sm">
      <fieldset>
        <legend className="font-semibold">Category</legend>
        <div className="mt-3 space-y-2">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name="category"
              checked={category === ""}
              onChange={() => onCategoryChange("")}
              className={radioClass}
            />
            All categories
          </label>
          {categories.map((name) => (
            <label key={name} className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="category"
                checked={category === name}
                onChange={() => onCategoryChange(name)}
                className={radioClass}
              />
              {name}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="font-semibold">Price (USD)</legend>
        <div className="mt-3 flex items-center gap-2">
          <label className="sr-only" htmlFor="min-price">Minimum price</label>
          <input
            id="min-price"
            type="number"
            min={0}
            step="0.01"
            inputMode="decimal"
            placeholder="Min"
            value={minPrice ?? ""}
            onChange={(event) => onMinPriceChange(toPrice(event.target.value))}
            className={priceInputClass}
          />
          <span className="text-stone-400" aria-hidden="true">–</span>
          <label className="sr-only" htmlFor="max-price">Maximum price</label>
          <input
            id="max-price"
            type="number"
            min={0}
            step="0.01"
            inputMode="decimal"
            placeholder="Max"
            value={maxPrice ?? ""}
            onChange={(event) => onMaxPriceChange(toPrice(event.target.value))}
            className={priceInputClass}
          />
        </div>
      </fieldset>

      <button
        type="button"
        onClick={onClear}
        className="w-full cursor-pointer rounded-md border border-stone-300 px-4 py-2 text-sm font-medium hover:bg-stone-50"
      >
        Clear filters
      </button>
    </div>
  );
}

export default FilterPanel;
