import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { type CartState } from "./cartSlice";

const CART_STORAGE_KEY = "booknest-cart";

function loadCart(): CartState | undefined {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    if (!saved) return undefined;
    const parsed = JSON.parse(saved) as CartState;
    return Array.isArray(parsed.items) ? parsed : undefined;
  } catch {
    return undefined;
  }
}

function saveCart(cart: CartState) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch {
    // Storage can be full or blocked (e.g. private mode); the cart still works in memory.
  }
}

const savedCart = loadCart();

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: savedCart ? { cart: savedCart } : undefined,
});

store.subscribe(() => {
  saveCart(store.getState().cart);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
