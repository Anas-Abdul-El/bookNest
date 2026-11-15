import type { CartState } from "./cartSlice";

const CART_STORAGE_KEY = "booknest-cart";

// Storage can be missing, full or blocked (e.g. in private mode), so every
// access is wrapped in try/catch. If it fails, the cart still works in memory.

export function loadCart(): CartState | undefined {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    if (!saved) return undefined;
    const parsed = JSON.parse(saved) as CartState;
    return Array.isArray(parsed.items) ? parsed : undefined;
  } catch {
    return undefined;
  }
}

export function saveCart(cart: CartState): void {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch {
    // Ignore: see the note above.
  }
}
