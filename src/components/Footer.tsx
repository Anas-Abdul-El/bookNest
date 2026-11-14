import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="mt-16 bg-ink text-stone-300">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
        <div>
          <p className="font-serif text-xl font-bold text-white">📚 BookNest</p>
          <p className="mt-2 text-sm">
            A cosy online bookstore for curious readers.
          </p>
        </div>

        <div>
          <p className="font-semibold text-white">Explore</p>
          <ul className="mt-2 space-y-1 text-sm">
            <li><Link to="/books" className="hover:text-white">All books</Link></li>
            <li><Link to="/about" className="hover:text-white">About us</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
            <li><Link to="/cart" className="hover:text-white">Your cart</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-white">Visit us</p>
          <p className="mt-2 text-sm">Open online 24/7</p>
          <p className="text-sm">hello@booknest.example</p>
        </div>
      </div>

      <p className="border-t border-stone-700 py-4 text-center text-xs">
        © {new Date().getFullYear()} BookNest. University project for Advanced
        Web Programming.
      </p>
    </footer>
  );
}

export default Footer;
