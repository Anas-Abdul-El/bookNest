import type { Book } from "../types/book";

const categoryColors: Record<string, string> = {
  Fiction: "from-rose-700 to-rose-900",
  Science: "from-sky-700 to-indigo-900",
  History: "from-amber-700 to-stone-800",
  Technology: "from-emerald-700 to-teal-900",
};

type BookCoverProps = {
  book: Book;
  className?: string;
};

// Shows the cover image when the book has one; otherwise draws a simple
// coloured cover with the title and author, so no outside images are needed.
function BookCover({ book, className = "" }: BookCoverProps) {
  if (book.cover) {
    return (
      <img
        src={book.cover}
        alt={`Cover of ${book.title}`}
        className={`aspect-[2/3] w-full rounded-md object-cover ${className}`}
      />
    );
  }

  const colors = categoryColors[book.category] ?? "from-stone-600 to-stone-800";

  return (
    <div
      role="img"
      aria-label={`Cover of ${book.title}`}
      className={`flex aspect-[2/3] w-full flex-col justify-between rounded-md bg-gradient-to-br p-4 text-white shadow-inner ${colors} ${className}`}
    >
      <span className="text-xs tracking-widest uppercase opacity-75">
        {book.category}
      </span>
      <div>
        <p className="font-serif text-lg leading-tight font-bold">
          {book.title}
        </p>
        <p className="mt-2 text-sm opacity-80">{book.author}</p>
      </div>
    </div>
  );
}

export default BookCover;
