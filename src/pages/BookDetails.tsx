import { Link, useParams } from "react-router-dom";
import BookCard from "../components/BookCard";
import BookCover from "../components/BookCover";
import { books } from "../data/books";
import { addToCart } from "../store/cartSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

// Five stars, filled up to the rating rounded to the nearest whole star.
function RatingStars({ rating }: { rating: number }) {
  const filled = Math.round(rating);
  return (
    <span className="text-amber-500" aria-hidden="true">
      {"★".repeat(filled)}
      <span className="text-stone-300">{"★".repeat(5 - filled)}</span>
    </span>
  );
}

function BookDetails() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const book = books.find((book) => book.id === Number(id));

  // How many copies of this book are already in the cart (0 if none).
  const quantityInCart = useAppSelector(
    (state) =>
      state.cart.items.find((item) => item.book.id === book?.id)?.quantity ?? 0,
  );

  if (!book) {
    return (
      <section className="mx-auto max-w-xl px-4 py-24 text-center">
        <p className="text-6xl" aria-hidden="true">📕</p>
        <h1 className="mt-4 font-serif text-3xl font-bold">Book not found</h1>
        <p className="mt-3 text-stone-600">
          We couldn't find a book with that link. It may have been removed.
        </p>
        <Link
          to="/books"
          className="mt-8 inline-block rounded-md bg-brand-500 px-6 py-3 font-medium text-white hover:bg-brand-600"
        >
          Browse all books
        </Link>
      </section>
    );
  }

  const relatedBooks = books
    .filter((other) => other.category === book.category && other.id !== book.id)
    .slice(0, 3);

  const categoryLink = `/books?category=${encodeURIComponent(book.category)}`;

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 py-10">
        <nav aria-label="Breadcrumb" className="text-sm text-stone-500">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link to="/" className="hover:text-brand-600">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link to="/books" className="hover:text-brand-600">Books</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link to={categoryLink} className="hover:text-brand-600">{book.category}</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-medium text-ink">{book.title}</li>
          </ol>
        </nav>

        <div className="mt-8 grid gap-10 md:grid-cols-5">
          <div className="mx-auto w-full max-w-xs md:col-span-2 md:max-w-none">
            <BookCover book={book} className="shadow-xl" />
          </div>

          <div className="md:col-span-3">
            <Link
              to={categoryLink}
              className="inline-block rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold tracking-wide text-brand-700 uppercase hover:bg-brand-500 hover:text-white"
            >
              {book.category}
            </Link>

            <h1 className="mt-4 font-serif text-4xl leading-tight font-bold">
              {book.title}
            </h1>
            <p className="mt-2 text-lg text-stone-600">by {book.author}</p>

            <p className="mt-4 flex items-center gap-2">
              <RatingStars rating={book.rating} />
              <span className="text-sm text-stone-600">
                {book.rating.toFixed(1)} out of 5
              </span>
            </p>

            <p className="mt-6 text-3xl font-bold">${book.price.toFixed(2)}</p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => dispatch(addToCart(book))}
                className="cursor-pointer rounded-md bg-brand-500 px-8 py-3 font-medium text-white hover:bg-brand-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
              >
                Add to cart
              </button>
              {quantityInCart > 0 && (
                <p className="text-sm text-green-700" role="status">
                  ✓ {quantityInCart} {quantityInCart === 1 ? "copy" : "copies"} in
                  your cart
                </p>
              )}
            </div>

            <div className="mt-8 border-t border-brand-100 pt-6">
              <h2 className="font-serif text-xl font-bold">About this book</h2>
              <p className="mt-3 leading-relaxed text-stone-700">{book.description}</p>
            </div>

            <dl className="mt-6 grid grid-cols-2 gap-4 rounded-lg bg-white p-4 text-sm shadow-sm sm:grid-cols-3">
              <div>
                <dt className="text-stone-500">Author</dt>
                <dd className="font-medium">{book.author}</dd>
              </div>
              <div>
                <dt className="text-stone-500">Category</dt>
                <dd className="font-medium">{book.category}</dd>
              </div>
              <div>
                <dt className="text-stone-500">Shipping</dt>
                <dd className="font-medium">Free</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {relatedBooks.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-serif text-2xl font-bold">More in {book.category}</h2>
            <Link to={categoryLink} className="text-sm font-medium text-brand-600 hover:underline">
              View all →
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedBooks.map((related) => (
              <BookCard key={related.id} book={related} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

export default BookDetails;
