import { useState } from "react";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import { clearCart } from "../store/cartSlice";
import {
  selectCartCount,
  selectCartItems,
  selectCartTotal,
  useAppDispatch,
  useAppSelector,
} from "../store/hooks";

function Cart() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const count = useAppSelector(selectCartCount);
  const total = useAppSelector(selectCartTotal);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Checkout is simulated: there is no backend, so we just empty the cart
  // and show a thank-you message.
  const handleCheckout = () => {
    dispatch(clearCart());
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <section className="mx-auto max-w-xl px-4 py-24 text-center">
        <p className="text-6xl" aria-hidden="true">🎉</p>
        <h1 className="mt-4 font-serif text-3xl font-bold">Thank you for your order!</h1>
        <p className="mt-3 text-stone-600">
          This is a demo store, so no payment was taken and nothing will be
          shipped.
        </p>
        <Link
          to="/books"
          className="mt-8 inline-block rounded-md bg-brand-500 px-6 py-3 font-medium text-white hover:bg-brand-600"
        >
          Keep browsing
        </Link>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-xl px-4 py-24 text-center">
        <p className="text-6xl" aria-hidden="true">🛒</p>
        <h1 className="mt-4 font-serif text-3xl font-bold">Your cart is empty</h1>
        <p className="mt-3 text-stone-600">
          Find something you'll love in the catalogue.
        </p>
        <Link
          to="/books"
          className="mt-8 inline-block rounded-md bg-brand-500 px-6 py-3 font-medium text-white hover:bg-brand-600"
        >
          Browse books
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-serif text-3xl font-bold">Your cart</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ul className="space-y-4">
            {items.map((item) => (
              <CartItem key={item.book.id} item={item} />
            ))}
          </ul>

          <button
            type="button"
            onClick={() => dispatch(clearCart())}
            className="mt-4 cursor-pointer text-sm text-stone-600 hover:text-red-600 hover:underline"
          >
            Clear cart
          </button>
        </div>

        <aside className="h-fit rounded-lg bg-white p-6 shadow-sm">
          <h2 className="font-serif text-xl font-bold">Order summary</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-stone-600">
                Items ({count})
              </dt>
              <dd>${total.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-stone-600">Shipping</dt>
              <dd>Free</dd>
            </div>
            <div className="flex justify-between border-t border-stone-200 pt-3 text-base font-bold">
              <dt>Total</dt>
              <dd>${total.toFixed(2)}</dd>
            </div>
          </dl>

          <button
            type="button"
            onClick={handleCheckout}
            className="mt-6 w-full cursor-pointer rounded-md bg-brand-500 px-6 py-3 font-medium text-white hover:bg-brand-600"
          >
            Checkout
          </button>
          <Link
            to="/books"
            className="mt-3 block text-center text-sm text-brand-600 hover:underline"
          >
            Continue shopping
          </Link>
        </aside>
      </div>
    </section>
  );
}

export default Cart;
