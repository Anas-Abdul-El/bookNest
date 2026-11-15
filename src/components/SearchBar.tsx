import { inputClass } from "../styles/classNames";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

const PLACEHOLDER = "Search by title or author";

function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <label htmlFor="book-search" className="sr-only">
        {PLACEHOLDER}
      </label>
      <span
        className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-stone-400"
        aria-hidden="true"
      >
        🔍
      </span>
      <input
        id="book-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={PLACEHOLDER}
        className={inputClass({ withIcon: true })}
      />
    </div>
  );
}

export default SearchBar;
