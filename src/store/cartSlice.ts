import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Book, CartItem } from "../types/book";

export type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Book>) {
      const existing = state.items.find(
        (item) => item.book.id === action.payload.id,
      );
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ book: action.payload, quantity: 1 });
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter(
        (item) => item.book.id !== action.payload,
      );
    },
    updateQuantity(
      state,
      action: PayloadAction<{ id: number; quantity: number }>,
    ) {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        state.items = state.items.filter((item) => item.book.id !== id);
        return;
      }
      const item = state.items.find((item) => item.book.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
  // Read data from the cart. Use them with useAppSelector, e.g.
  // useAppSelector(selectCartCount)
  selectors: {
    selectCartItems: (state) => state.items,
    selectCartCount: (state) =>
      state.items.reduce((total, item) => total + item.quantity, 0),
    selectCartTotal: (state) =>
      state.items.reduce((total, item) => total + item.book.price * item.quantity, 0),
    // How many copies of one book are in the cart (0 if none).
    selectQuantityInCart: (state, bookId: number) =>
      state.items.find((item) => item.book.id === bookId)?.quantity ?? 0,
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export const {
  selectCartItems,
  selectCartCount,
  selectCartTotal,
  selectQuantityInCart,
} = cartSlice.selectors;

export default cartSlice.reducer;
