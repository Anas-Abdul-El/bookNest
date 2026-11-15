import { Link } from "react-router-dom";
import { books, categories } from "../data/books";

const values = [
  {
    icon: "📚",
    title: "Curated, not crowded",
    text: "Every book on our shelves is chosen because it is worth reading, not just because it sells.",
  },
  {
    icon: "🤝",
    title: "Readers first",
    text: "Clear prices, honest descriptions and a cart that remembers you. No tricks, no clutter.",
  },
  {
    icon: "🌱",
    title: "Always learning",
    text: "From timeless novels to the latest ideas in science and technology, we help readers keep growing.",
  },
];

const team = [
  {
    name: "Anas",
    role: "Founder & Developer",
    initials: "A",
    bio: "Designed and built BookNest from the ground up as a project for the Advanced Web Programming course.",
  },
];

function About() {
  const averageRating =
    books.reduce((total, book) => total + book.rating, 0) / books.length;

  const stats = [
    { value: books.length, label: "Books in the catalogue" },
    { value: categories.length, label: "Categories" },
    { value: `★ ${averageRating.toFixed(1)}`, label: "Average rating" },
  ];

  return (
    <>
      {/* Intro */}
      <section className="bg-linear-to-b from-brand-100 to-brand-50">
        <div className="mx-auto max-w-3xl px-4 py-14 text-center md:py-20">
          <p className="text-sm font-semibold tracking-widest text-brand-600 uppercase">
            About BookNest
          </p>
          <h1 className="mt-3 font-serif text-4xl leading-tight font-bold sm:text-5xl">
            A small bookstore with a big love of reading
          </h1>
          <p className="mt-4 text-lg text-stone-700">
            BookNest is a cosy online corner where readers can discover great
            books, explore new subjects and build their next reading list.
          </p>
        </div>
      </section>

      {/* Our story */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2">
        <div>
          <h2 className="font-serif text-3xl font-bold">Our story</h2>
          <p className="mt-4 text-stone-700">
            BookNest started with a simple idea: buying a book online should
            feel as pleasant as browsing the shelves of your favourite local
            shop. No endless pages of noise, just good books, clearly presented.
          </p>
          <p className="mt-4 text-stone-700">
            We began with a hand-picked collection across fiction, science,
            history and technology, and we keep it small on purpose so that
            every title earns its place.
          </p>
        </div>

        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col-reverse rounded-lg bg-white p-6 text-center shadow-sm"
            >
              <dt className="mt-1 text-sm text-stone-600">{stat.label}</dt>
              <dd className="font-serif text-3xl font-bold text-brand-600">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Mission and values */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold">Our mission</h2>
            <p className="mt-4 text-lg text-stone-700">
              To make finding your next favourite book simple, welcoming and
              enjoyable, for every kind of reader.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {values.map((value) => (
              <div key={value.title} className="rounded-lg bg-brand-50 p-6">
                <span className="text-4xl" aria-hidden="true">
                  {value.icon}
                </span>
                <h3 className="mt-3 text-lg font-semibold">{value.title}</h3>
                <p className="mt-2 text-stone-700">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-center font-serif text-3xl font-bold">
          Meet the team
        </h2>
        <div className="mt-10 flex flex-wrap justify-center gap-6">
          {team.map((member) => (
            <article
              key={member.name}
              className="w-full max-w-sm rounded-lg bg-white p-6 text-center shadow-sm"
            >
              <div
                className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-500 font-serif text-3xl font-bold text-white"
                aria-hidden="true"
              >
                {member.initials}
              </div>
              <h3 className="mt-4 text-xl font-semibold">{member.name}</h3>
              <p className="text-sm font-medium text-brand-600">
                {member.role}
              </p>
              <p className="mt-3 text-stone-700">{member.bio}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Call to action */}
      <section className="mx-auto max-w-6xl px-4 pb-4">
        <div className="rounded-2xl bg-brand-700 px-6 py-12 text-center text-white sm:px-12">
          <h2 className="font-serif text-3xl font-bold">
            Come and browse with us
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-brand-100">
            Explore the catalogue, or get in touch if you have a question or a
            book you'd love to see on our shelves.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/books"
              className="rounded-md bg-white px-6 py-3 font-medium text-brand-700 hover:bg-brand-100"
            >
              Browse books
            </Link>
            <Link
              to="/contact"
              className="rounded-md border border-white px-6 py-3 font-medium text-white hover:bg-brand-600"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
