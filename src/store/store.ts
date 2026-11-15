import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import { loadCart, saveCart } from "./cartStorage";

const savedCart = loadCart();

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: savedCart ? { cart: savedCart } : undefined,
});

// Save the cart after every change, so it survives a page reload.
store.subscribe(() => {
  saveCart(store.getState().cart);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
