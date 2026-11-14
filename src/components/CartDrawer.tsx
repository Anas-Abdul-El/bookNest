import { useEffect, useEffectEvent, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { clearCart } from "../store/cartSlice";
import {
  selectCartCount,
  selectCartItems,
  selectCartTotal,
  useAppDispatch,
  useAppSelector,
} from "../store/hooks";
import CartItem from "./CartItem";

type CartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

// The cart, shown as a sidebar that slides in from the right.
function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const count = useAppSelector(selectCartCount);
  const total = useAppSelector(selectCartTotal);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const handleClose = () => {
    setOrderPlaced(false);
    onClose();
  };

  // Checkout is simulated: there is no backend, so we just empty the cart
  // and show a thank-you message.
  const handleCheckout = () => {
    dispatch(clearCart());
    setOrderPlaced(true);
  };

  // useEffectEvent lets the effect below call the latest handleClose
  // without re-running every time the component renders.
  const onEscape = useEffectEvent(handleClose);

  // Each time the drawer opens: stop the page behind from scrolling,
  // close on Escape, and move keyboard focus into the drawer.
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onEscape();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className={isOpen ? "" : "pointer-events-none"} inert={!isOpen}>
      {/* Dark overlay; clicking it closes the drawer */}
      <div
        onClick={handleClose}
        className={`fixed inset-0 z-20 bg-black/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
        className={`fixed top-0 right-0 z-30 flex h-full w-full max-w-md flex-col bg-brand-50 shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-brand-100 bg-white px-5 py-4">
          <h2 id="cart-drawer-title" className="font-serif text-2xl font-bold">
            Your cart {count > 0 && <span className="text-base font-normal text-stone-500">({count})</span>}
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={handleClose}
            className="cursor-pointer rounded-md p-2 text-xl leading-none text-stone-600 hover:bg-stone-100"
            aria-label="Close cart"
          >
            ✕
          </button>
        </header>

        {orderPlaced ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <p className="text-6xl" aria-hidden="true">🎉</p>
            <p className="mt-4 font-serif text-2xl font-bold">Thank you for your order!</p>
            <p className="mt-3 text-stone-600">
              This is a demo store, so no payment was taken and nothing will be
              shipped.
            </p>
            <Link
              to="/books"
              onClick={handleClose}
              className="mt-8 rounded-md bg-brand-500 px-6 py-3 font-medium text-white hover:bg-brand-600"
            >
              Keep browsing
            </Link>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <p className="text-6xl" aria-hidden="true">🛒</p>
            <p className="mt-4 font-serif text-2xl font-bold">Your cart is empty</p>
            <p className="mt-3 text-stone-600">
              Find something you'll love in the catalogue.
            </p>
            <Link
              to="/books"
              onClick={handleClose}
              className="mt-8 rounded-md bg-brand-500 px-6 py-3 font-medium text-white hover:bg-brand-600"
            >
              Browse books
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="space-y-3">
                {items.map((item) => (
                  <CartItem key={item.book.id} item={item} onNavigate={handleClose} />
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

            <footer className="border-t border-brand-100 bg-white px-5 py-4">
              <div className="flex justify-between text-sm text-stone-600">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="mt-2 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button
                type="button"
                onClick={handleCheckout}
                className="mt-4 w-full cursor-pointer rounded-md bg-brand-500 px-6 py-3 font-medium text-white hover:bg-brand-600"
              >
                Checkout
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}

export default CartDrawer;
