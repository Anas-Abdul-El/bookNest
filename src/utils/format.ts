import { CURRENCY } from "../constants/catalogue";

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: CURRENCY,
});

// 9.5 -> "$9.50"
export function formatPrice(amount: number): string {
  return priceFormatter.format(amount);
}

// pluralize(1, "book") -> "1 book", pluralize(3, "copy", "copies") -> "3 copies"
export function pluralize(count: number, singular: string, plural = `${singular}s`): string {
  return `${count} ${count === 1 ? singular : plural}`;
}

// Reads a price typed by the user or taken from the URL.
// An empty, invalid or negative value means "no limit" and returns null.
export function parsePrice(value: string | null): number | null {
  if (value === null || value.trim() === "") return null;
  const price = Number(value);
  return Number.isNaN(price) || price < 0 ? null : price;
}
