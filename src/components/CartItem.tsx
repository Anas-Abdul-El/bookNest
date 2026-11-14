import { Link } from "react-router-dom";
import { removeFromCart, updateQuantity } from "../store/cartSlice";
import { useAppDispatch } from "../store/hooks";
import type { CartItem as CartItemType } from "../types/book";
import BookCover from "./BookCover";

type CartItemProps = {
  item: CartItemType;
};

function CartItem({ item }: CartItemProps) {
  const dispatch = useAppDispatch();
  const { book, quantity } = item;

  const changeQuantity = (newQuantity: number) => {
    dispatch(updateQuantity({ id: book.id, quantity: newQuantity }));
  };

  return (
    <li className="flex gap-4 rounded-lg bg-white p-4 shadow-sm">
      <Link to={`/books/${book.id}`} className="w-20 shrink-0 sm:w-24">
        <BookCover book={book} compact />
      </Link>

      <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            to={`/books/${book.id}`}
            className="font-serif text-lg leading-snug font-semibold hover:text-brand-600"
          >
            {book.title}
          </Link>
          <p className="text-sm text-stone-600">{book.author}</p>
          <p className="mt-1 text-sm text-stone-500">
            ${book.price.toFixed(2)} each
          </p>
        </div>

        <div className="flex items-center justify-between gap-6 sm:justify-end">
          <div className="flex items-center rounded-md border border-stone-300">
            <button
              type="button"
              onClick={() => changeQuantity(quantity - 1)}
              className="cursor-pointer px-3 py-1 text-lg hover:bg-stone-100"
              aria-label={`Decrease quantity of ${book.title}`}
            >
              −
            </button>
            <span className="min-w-8 text-center font-medium" aria-live="polite">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => changeQuantity(quantity + 1)}
              className="cursor-pointer px-3 py-1 text-lg hover:bg-stone-100"
              aria-label={`Increase quantity of ${book.title}`}
            >
              +
            </button>
          </div>

          <p className="w-20 text-right font-bold">
            ${(book.price * quantity).toFixed(2)}
          </p>

          <button
            type="button"
            onClick={() => dispatch(removeFromCart(book.id))}
            className="cursor-pointer text-sm text-red-600 hover:underline"
            aria-label={`Remove ${book.title} from cart`}
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}

export default CartItem;
