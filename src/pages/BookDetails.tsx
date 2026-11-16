import { Link, useParams } from "react-router-dom";
import BookCard from "../components/shared/BookCard";
import BookCover from "../components/shared/BookCover";
import EmptyState from "../components/shared/EmptyState";
import RatingStars from "../components/shared/RatingStars";
import SectionHeader from "../components/shared/SectionHeader";
import { ROUTES, categoryPath } from "../constants/routes";
import { STORE_INFO } from "../constants/storeInfo";
import { getBookById, getRelatedBooks } from "../data/books";
import { addToCart, selectQuantityInCart } from "../store/cartSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { buttonClass } from "../styles/classNames";
import { formatPrice, pluralize } from "../utils/format";

function BookDetails() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const book = getBookById(Number(id));
  const quantityInCart = useAppSelector((state) =>
    book ? selectQuantityInCart(state, book.id) : 0,
  );

  if (!book) {
    return (
      <section className="mx-auto max-w-xl px-4 py-24">
        <EmptyState
          icon="📕"
          title="Book not found"
          titleAs="h1"
          action={
            <Link to={ROUTES.books} className={buttonClass()}>
              Browse all books
            </Link>
          }
        >
          We couldn't find a book with that link. It may have been removed.
        </EmptyState>
      </section>
    );
  }

  const relatedBooks = getRelatedBooks(book);
  const categoryLink = categoryPath(book.category);

  const breadcrumbs = [
    { to: ROUTES.home, label: "Home" },
    { to: ROUTES.books, label: "Books" },
    { to: categoryLink, label: book.category },
  ];

  const details = [
    { label: "Author", value: book.author },
    { label: "Category", value: book.category },
    { label: "Shipping", value: STORE_INFO.shipping },
  ];

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 py-10">
        <nav aria-label="Breadcrumb" className="text-sm text-stone-500">
          <ol className="flex flex-wrap items-center gap-2">
            {breadcrumbs.map((crumb) => (
              <li key={crumb.label} className="flex items-center gap-2">
                <Link to={crumb.to} className="hover:text-brand-600">
                  {crumb.label}
                </Link>
                <span aria-hidden="true">/</span>
              </li>
            ))}
            <li aria-current="page" className="font-medium text-ink">
              {book.title}
            </li>
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

            <h1 className="mt-4 font-serif text-4xl leading-tight font-bold">{book.title}</h1>
            <p className="mt-2 text-lg text-stone-600">by {book.author}</p>

            <div className="mt-4">
              <RatingStars rating={book.rating} variant="full" />
            </div>

            <p className="mt-6 text-3xl font-bold">{formatPrice(book.price)}</p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => dispatch(addToCart(book))}
                className={`${buttonClass()} px-8`}
              >
                Add to cart
              </button>
              {quantityInCart > 0 && (
                <p className="text-sm text-green-700" role="status">
                  ✓ {pluralize(quantityInCart, "copy", "copies")} in your cart
                </p>
              )}
            </div>

            <div className="mt-8 border-t border-brand-100 pt-6">
              <h2 className="font-serif text-xl font-bold">About this book</h2>
              <p className="mt-3 leading-relaxed text-stone-700">{book.description}</p>
            </div>

            <dl className="mt-6 grid grid-cols-2 gap-4 rounded-lg bg-white p-4 text-sm shadow-sm sm:grid-cols-3">
              {details.map((detail) => (
                <div key={detail.label}>
                  <dt className="text-stone-500">{detail.label}</dt>
                  <dd className="font-medium">{detail.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {relatedBooks.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-10">
          <SectionHeader title={`More in ${book.category}`} viewAllTo={categoryLink} />
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
