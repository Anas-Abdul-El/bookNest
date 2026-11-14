import { Link } from "react-router-dom";

// Also shown for pages that are not built yet (Books, About, Contact, Cart).
function NotFound() {
  return (
    <section className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="text-6xl" aria-hidden="true">📭</p>
      <h1 className="mt-4 font-serif text-3xl font-bold">Page not found</h1>
      <p className="mt-3 text-stone-600">
        This page doesn't exist yet, or it may have moved.
      </p>
      <Link
        to="/"
        className="mt-8 inline-block rounded-md bg-brand-500 px-6 py-3 font-medium text-white hover:bg-brand-600"
      >
        Back to home
      </Link>
    </section>
  );
}

export default NotFound;
