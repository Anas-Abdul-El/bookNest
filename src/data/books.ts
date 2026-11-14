import type { Book } from "../types/book";
import booksData from "./books.json";

export const books: Book[] = booksData;

export const categories: string[] = [
  ...new Set(books.map((book) => book.category)),
];
