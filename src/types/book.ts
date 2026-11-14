export type Book = {
  id: number;
  title: string;
  author: string;
  category: string;
  price: number;
  rating: number;
  cover: string;
  description: string;
};

export type CartItem = {
  book: Book;
  quantity: number;
};
