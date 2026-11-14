import { Link } from "react-router-dom";
import { addToCart } from "../store/cartSlice";
import { useAppDispatch } from "../store/hooks";
import type { Book } from "../types/book";
import BookCover from "./BookCover";

type BookCardProps = {
  book: Book;
};

function BookCard({ book }: BookCardProps) {
  const dispatch = useAppDispatch();

  return (
    <article className="flex flex-col rounded-lg bg-white p-4 shadow-sm transition hover:shadow-md">
      <Link to={`/books/${book.id}`} className="block">
        <BookCover book={book} />
      </Link>

      <div className="mt-4 flex flex-1 flex-col">
        <Link
          to={`/books/${book.id}`}
          className="font-serif text-lg leading-snug font-semibold hover:text-brand-600"
        >
          {book.title}
        </Link>
        <p className="mt-1 text-sm text-stone-600">{book.author}</p>
        <p className="mt-1 text-sm text-amber-600" aria-label={`Rated ${book.rating} out of 5`}>
          ★ {book.rating.toFixed(1)}
        </p>

        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-lg font-bold">${book.price.toFixed(2)}</span>
          <button
            type="button"
            onClick={() => dispatch(addToCart(book))}
            className="rounded-md bg-brand-500 px-3 py-2 text-sm font-medium text-white hover:bg-brand-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          >
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}

export default BookCard;
