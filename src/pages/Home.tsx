import { Link } from "react-router-dom";
import BookCard from "../components/BookCard";
import BookCover from "../components/BookCover";
import { books, categories } from "../data/books";

const categoryIcons: Record<string, string> = {
  Fiction: "📖",
  Science: "🔬",
  History: "🏛️",
  Technology: "💻",
};

// The four highest-rated books are shown as "featured".
const featuredBooks = [...books].sort((a, b) => b.rating - a.rating).slice(0, 4);

function Home() {
  return (
    <>
      {/* Hero banner */}
      <section className="bg-gradient-to-b from-brand-100 to-brand-50">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-20">
          <div>
            <p className="text-sm font-semibold tracking-widest text-brand-600 uppercase">
              Welcome to BookNest
            </p>
            <h1 className="mt-3 font-serif text-4xl leading-tight font-bold sm:text-5xl">
              Find your next favourite book
            </h1>
            <p className="mt-4 max-w-md text-lg text-stone-700">
              Classic novels, big ideas in science and history, and the best
              guides for programmers, all in one cosy corner of the web.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/books"
                className="rounded-md bg-brand-500 px-6 py-3 font-medium text-white hover:bg-brand-600"
              >
                Browse books
              </Link>
              <Link
                to="/about"
                className="rounded-md border border-brand-500 px-6 py-3 font-medium text-brand-700 hover:bg-brand-100"
              >
                About us
              </Link>
            </div>
          </div>

          {/* A small fanned stack of covers; hidden on very small screens */}
          <div className="hidden justify-center sm:flex" aria-hidden="true">
            <div className="relative h-72 w-80">
              {featuredBooks.slice(0, 3).map((book, index) => (
                <div
                  key={book.id}
                  className="absolute top-0 w-44 shadow-xl"
                  style={{
                    left: `${index * 70}px`,
                    transform: `rotate(${(index - 1) * 8}deg)`,
                    zIndex: index === 1 ? 2 : 1,
                  }}
                >
                  <BookCover book={book} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured books */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-bold">Featured books</h2>
          <Link to="/books" className="text-sm font-medium text-brand-600 hover:underline">
            View all →
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="font-serif text-3xl font-bold">Browse by category</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {categories.map((category) => {
            const count = books.filter((book) => book.category === category).length;
            return (
              <Link
                key={category}
                to={`/books?category=${encodeURIComponent(category)}`}
                className="rounded-lg bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <span className="text-4xl" aria-hidden="true">
                  {categoryIcons[category] ?? "📚"}
                </span>
                <p className="mt-3 font-semibold">{category}</p>
                <p className="text-sm text-stone-500">
                  {count} {count === 1 ? "book" : "books"}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Call to action */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="rounded-2xl bg-brand-700 px-6 py-12 text-center text-white sm:px-12">
          <h2 className="font-serif text-3xl font-bold">Ready to start reading?</h2>
          <p className="mx-auto mt-3 max-w-xl text-brand-100">
            Explore the full catalogue, filter by what you love, and keep your
            picks in your cart for whenever you come back.
          </p>
          <Link
            to="/books"
            className="mt-8 inline-block rounded-md bg-white px-6 py-3 font-medium text-brand-700 hover:bg-brand-100"
          >
            Shop the catalogue
          </Link>
        </div>
      </section>
    </>
  );
}

export default Home;
