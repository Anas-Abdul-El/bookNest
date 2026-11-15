import { FEATURED_BOOKS_COUNT, RELATED_BOOKS_COUNT } from "../constants/catalogue";
import type { Book } from "../types/book";
import booksData from "./books.json";

export const books: Book[] = booksData;

export const categories: string[] = [
  ...new Set(books.map((book) => book.category)),
];

export function getBookById(id: number): Book | undefined {
  return books.find((book) => book.id === id);
}

export function getTopRatedBooks(count = FEATURED_BOOKS_COUNT): Book[] {
  return [...books].sort((a, b) => b.rating - a.rating).slice(0, count);
}

// Other books in the same category as the given book.
export function getRelatedBooks(book: Book, count = RELATED_BOOKS_COUNT): Book[] {
  return books
    .filter((other) => other.category === book.category && other.id !== book.id)
    .slice(0, count);
}

export function countBooksInCategory(category: string): number {
  return books.filter((book) => book.category === category).length;
}

export function getAverageRating(): number {
  return books.reduce((total, book) => total + book.rating, 0) / books.length;
}
