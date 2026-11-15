import { Link } from "react-router-dom";
import { bookPath } from "../constants/routes";
import { addToCart } from "../store/cartSlice";
import { useAppDispatch } from "../store/hooks";
import { buttonClass } from "../styles/classNames";
import type { Book } from "../types/book";
import { formatPrice } from "../utils/format";
import BookCover from "./BookCover";
import RatingStars from "./RatingStars";

type BookCardProps = {
  book: Book;
};

function BookCard({ book }: BookCardProps) {
  const dispatch = useAppDispatch();
  const detailsPath = bookPath(book.id);

  return (
    <article className="flex flex-col rounded-lg bg-white p-4 shadow-sm transition hover:shadow-md">
      <Link to={detailsPath} className="block">
        <BookCover book={book} />
      </Link>

      <div className="mt-4 flex flex-1 flex-col">
        <Link
          to={detailsPath}
          className="font-serif text-lg leading-snug font-semibold hover:text-brand-600"
        >
          {book.title}
        </Link>
        <p className="mt-1 text-sm text-stone-600">{book.author}</p>
        <div className="mt-1">
          <RatingStars rating={book.rating} />
        </div>

        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-lg font-bold">{formatPrice(book.price)}</span>
          <button
            type="button"
            onClick={() => dispatch(addToCart(book))}
            className={buttonClass("primary", "sm")}
          >
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}

export default BookCard;
