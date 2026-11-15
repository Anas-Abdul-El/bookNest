import { Link } from "react-router-dom";
import CtaBanner from "../components/CtaBanner";
import PageHeader from "../components/PageHeader";
import { ROUTES } from "../constants/routes";
import { books, categories, getAverageRating } from "../data/books";
import { buttonClass } from "../styles/classNames";

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

// Worked out from books.json, so they stay correct when books are added.
const stats = [
  { value: books.length, label: "Books in the catalogue" },
  { value: categories.length, label: "Categories" },
  { value: `★ ${getAverageRating().toFixed(1)}`, label: "Average rating" },
];

function About() {
  return (
    <>
      <PageHeader
        eyebrow="About BookNest"
        title="A small bookstore with a big love of reading"
        description="BookNest is a cosy online corner where readers can discover great books, explore new subjects and build their next reading list."
      />

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

      <CtaBanner
        title="Come and browse with us"
        text="Explore the catalogue, or get in touch if you have a question or a book you'd love to see on our shelves."
      >
        <Link to={ROUTES.books} className={buttonClass("light")}>
          Browse books
        </Link>
        <Link to={ROUTES.contact} className={buttonClass("outlineLight")}>
          Contact us
        </Link>
      </CtaBanner>
    </>
  );
}

export default About;
