import { buttonClass, inputClass } from "../styles/classNames";
import { parsePrice } from "../utils/format";

// "" means "All categories".
const ALL_CATEGORIES = "";

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
  const categoryOptions = [
    { value: ALL_CATEGORIES, label: "All categories" },
    ...categories.map((name) => ({ value: name, label: name })),
  ];

  const priceInputs = [
    { id: "min-price", label: "Minimum price", placeholder: "Min", value: minPrice, onChange: onMinPriceChange },
    { id: "max-price", label: "Maximum price", placeholder: "Max", value: maxPrice, onChange: onMaxPriceChange },
  ];

  return (
    <div className="space-y-6 rounded-lg bg-white p-5 shadow-sm">
      <fieldset>
        <legend className="font-semibold">Category</legend>
        <div className="mt-3 space-y-2">
          {categoryOptions.map((option) => (
            <label key={option.label} className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="category"
                checked={category === option.value}
                onChange={() => onCategoryChange(option.value)}
                className="h-4 w-4 accent-brand-500"
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="font-semibold">Price (USD)</legend>
        <div className="mt-3 flex items-center gap-2">
          {priceInputs.map((input, index) => (
            <div key={input.id} className="flex flex-1 items-center gap-2">
              {index > 0 && (
                <span className="text-stone-400" aria-hidden="true">
                  –
                </span>
              )}
              <label className="sr-only" htmlFor={input.id}>
                {input.label}
              </label>
              <input
                id={input.id}
                type="number"
                min={0}
                step="0.01"
                inputMode="decimal"
                placeholder={input.placeholder}
                value={input.value ?? ""}
                onChange={(event) => input.onChange(parsePrice(event.target.value))}
                className={inputClass()}
              />
            </div>
          ))}
        </div>
      </fieldset>

      <button type="button" onClick={onClear} className={`${buttonClass("secondary", "sm")} w-full`}>
        Clear filters
      </button>
    </div>
  );
}

export default FilterPanel;
