type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <label htmlFor="book-search" className="sr-only">
        Search by title or author
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
        placeholder="Search by title or author"
        className="w-full rounded-md border border-stone-300 bg-white py-2.5 pr-3 pl-10 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 focus:outline-none"
      />
    </div>
  );
}

export default SearchBar;
