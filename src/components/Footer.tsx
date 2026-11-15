import { Link } from "react-router-dom";
import { NAV_LINKS, ROUTES } from "../constants/routes";
import { STORE_INFO } from "../constants/storeInfo";

// Every navbar link except Home.
const footerLinks = NAV_LINKS.filter((link) => link.to !== ROUTES.home);

function Footer() {
  return (
    <footer className="mt-16 bg-ink text-stone-300">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
        <div>
          <p className="font-serif text-xl font-bold text-white">
            {STORE_INFO.logo} {STORE_INFO.name}
          </p>
          <p className="mt-2 text-sm">{STORE_INFO.tagline}</p>
        </div>

        <div>
          <p className="font-semibold text-white">Explore</p>
          <ul className="mt-2 space-y-1 text-sm">
            {footerLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-semibold text-white">Visit us</p>
          <p className="mt-2 text-sm">{STORE_INFO.availability}</p>
          <p className="text-sm">{STORE_INFO.email}</p>
        </div>
      </div>

      <p className="border-t border-stone-700 py-4 text-center text-xs">
        © {new Date().getFullYear()} {STORE_INFO.name}. University project for Advanced Web
        Programming.
      </p>
    </footer>
  );
}

export default Footer;
