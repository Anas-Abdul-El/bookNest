import { Link } from "react-router-dom";
import { removeFromCart, updateQuantity } from "../store/cartSlice";
import { useAppDispatch } from "../store/hooks";
import type { CartItem as CartItemType } from "../types/book";
import BookCover from "./BookCover";

type CartItemProps = {
  item: CartItemType;
  // Called when a link to the book is clicked, so the cart sidebar can close.
  onNavigate?: () => void;
};

function CartItem({ item, onNavigate }: CartItemProps) {
  const dispatch = useAppDispatch();
  const { book, quantity } = item;

  const changeQuantity = (newQuantity: number) => {
    dispatch(updateQuantity({ id: book.id, quantity: newQuantity }));
  };

  return (
    <li className="flex gap-3 rounded-lg bg-white p-3 shadow-sm">
      <Link to={`/books/${book.id}`} onClick={onNavigate} className="w-16 shrink-0">
        <BookCover book={book} compact />
      </Link>

      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div>
            <Link
              to={`/books/${book.id}`}
              onClick={onNavigate}
              className="font-serif leading-snug font-semibold hover:text-brand-600"
            >
              {book.title}
            </Link>
            <p className="text-sm text-stone-600">{book.author}</p>
          </div>
          <button
            type="button"
            onClick={() => dispatch(removeFromCart(book.id))}
            className="cursor-pointer rounded p-1 text-stone-400 hover:bg-red-50 hover:text-red-600"
            aria-label={`Remove ${book.title} from cart`}
          >
            ✕
          </button>
        </div>

        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-center rounded-md border border-stone-300">
            <button
              type="button"
              onClick={() => changeQuantity(quantity - 1)}
              className="cursor-pointer px-2.5 py-0.5 hover:bg-stone-100"
              aria-label={`Decrease quantity of ${book.title}`}
            >
              −
            </button>
            <span className="min-w-7 text-center text-sm font-medium" aria-live="polite">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => changeQuantity(quantity + 1)}
              className="cursor-pointer px-2.5 py-0.5 hover:bg-stone-100"
              aria-label={`Increase quantity of ${book.title}`}
            >
              +
            </button>
          </div>

          <p className="font-bold">${(book.price * quantity).toFixed(2)}</p>
        </div>
      </div>
    </li>
  );
}

export default CartItem;
