import { Link } from "react-router-dom";
import BookCard from "../components/BookCard";
import BookCover from "../components/BookCover";
import CtaBanner from "../components/CtaBanner";
import SectionHeader from "../components/SectionHeader";
import { ROUTES, categoryPath } from "../constants/routes";
import { categories, countBooksInCategory, getTopRatedBooks } from "../data/books";
import { getCategoryStyle } from "../data/categories";
import { buttonClass } from "../styles/classNames";
import { pluralize } from "../utils/format";

const featuredBooks = getTopRatedBooks();

// The fanned stack of covers in the hero: how many covers, how far apart
// they sit, and how much each one is tilted.
const HERO_COVER_COUNT = 3;
const HERO_COVER_OFFSET_PX = 70;
const HERO_COVER_TILT_DEG = 8;
const heroCovers = featuredBooks.slice(0, HERO_COVER_COUNT);
const middleCoverIndex = Math.floor(HERO_COVER_COUNT / 2);

function Home() {
  return (
    <>
      {/* Hero banner */}
      <section className="bg-linear-to-b from-brand-100 to-brand-50">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-20">
          <div>
            <p className="text-sm font-semibold tracking-widest text-brand-600 uppercase">
              Welcome to BookNest
            </p>
            <h1 className="mt-3 font-serif text-4xl leading-tight font-bold sm:text-5xl">
              Find your next favourite book
            </h1>
            <p className="mt-4 max-w-md text-lg text-stone-700">
              Classic novels, big ideas in science and history, and the best guides for
              programmers, all in one cosy corner of the web.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to={ROUTES.books} className={buttonClass()}>
                Browse books
              </Link>
              <Link to={ROUTES.about} className={buttonClass("outline")}>
                About us
              </Link>
            </div>
          </div>

          {/* Hidden on very small screens */}
          <div className="hidden justify-center sm:flex" aria-hidden="true">
            <div className="relative h-72 w-80">
              {heroCovers.map((book, index) => (
                <div
                  key={book.id}
                  className="absolute top-0 w-44 shadow-xl"
                  style={{
                    left: `${index * HERO_COVER_OFFSET_PX}px`,
                    transform: `rotate(${(index - middleCoverIndex) * HERO_COVER_TILT_DEG}deg)`,
                    // The middle cover sits on top.
                    zIndex: index === middleCoverIndex ? 2 : 1,
                  }}
                >
                  <BookCover book={book} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <SectionHeader title="Featured books" viewAllTo={ROUTES.books} />
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <SectionHeader title="Browse by category" />
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category}
              to={categoryPath(category)}
              className="rounded-lg bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <span className="text-4xl" aria-hidden="true">
                {getCategoryStyle(category).icon}
              </span>
              <p className="mt-3 font-semibold">{category}</p>
              <p className="text-sm text-stone-500">
                {pluralize(countBooksInCategory(category), "book")}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <CtaBanner
        title="Ready to start reading?"
        text="Explore the full catalogue, filter by what you love, and keep your picks in your cart for whenever you come back."
      >
        <Link to={ROUTES.books} className={buttonClass("light")}>
          Shop the catalogue
        </Link>
      </CtaBanner>
    </>
  );
}

export default Home;
