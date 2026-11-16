import { getCategoryStyle } from "../../data/categories";
import type { Book } from "../../types/book";

type BookCoverProps = {
  book: Book;
  className?: string;
  // Small thumbnails (e.g. in the cart) show only the title.
  compact?: boolean;
};

// Shows the cover image when the book has one; otherwise draws a simple
// coloured cover with the title and author, so no outside images are needed.
function BookCover({ book, className = "", compact = false }: BookCoverProps) {
  const label = `Cover of ${book.title}`;
  const shape = `aspect-[2/3] w-full ${compact ? "rounded" : "rounded-md"}`;

  if (book.cover) {
    return <img src={book.cover} alt={label} className={`${shape} object-cover ${className}`} />;
  }

  const placeholder = `${shape} bg-linear-to-br text-white ${getCategoryStyle(book.category).coverGradient} ${className}`;

  if (compact) {
    return (
      <div role="img" aria-label={label} className={`flex items-end p-2 ${placeholder}`}>
        <p className="font-serif text-[0.65rem] leading-tight font-bold">{book.title}</p>
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={label}
      className={`flex flex-col justify-between p-4 shadow-inner ${placeholder}`}
    >
      <span className="text-xs tracking-widest uppercase opacity-75">{book.category}</span>
      <div>
        <p className="font-serif text-lg leading-tight font-bold">{book.title}</p>
        <p className="mt-2 text-sm opacity-80">{book.author}</p>
      </div>
    </div>
  );
}

export default BookCover;
