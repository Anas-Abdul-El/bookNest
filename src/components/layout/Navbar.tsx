import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { NAV_LINKS, ROUTES } from "../../constants/routes";
import { STORE_INFO } from "../../constants/storeInfo";
import { selectCartCount } from "../../store/cartSlice";
import { useAppSelector } from "../../store/hooks";
import CartDrawer from "./CartDrawer";

function navLinkClass({ isActive }: { isActive: boolean }) {
  return isActive ? "font-semibold text-brand-600" : "text-stone-700 hover:text-brand-600";
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const cartCount = useAppSelector(selectCartCount);

  const closeMenu = () => setMenuOpen(false);

  const openCart = () => {
    setMenuOpen(false);
    setCartOpen(true);
  };

  // The drawer is rendered next to the header, not inside it: the header's
  // backdrop-blur would otherwise trap the drawer's fixed position inside it.
  return (
    <>
      <header className="sticky top-0 z-10 border-b border-brand-100 bg-white/95 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link
            to={ROUTES.home}
            onClick={closeMenu}
            className="font-serif text-2xl font-bold text-brand-700"
          >
            {STORE_INFO.logo} {STORE_INFO.name}
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} end={link.to === ROUTES.home} className={navLinkClass}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openCart}
              className="relative cursor-pointer rounded-md px-3 py-2 text-stone-700 hover:text-brand-600"
              aria-label={`Open cart, ${cartCount} items`}
              aria-expanded={cartOpen}
            >
              🛒
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-500 px-1 text-xs font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="cursor-pointer rounded-md p-2 text-2xl leading-none text-stone-700 md:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </nav>

        {menuOpen && (
          <ul
            id="mobile-menu"
            className="flex flex-col gap-1 border-t border-brand-100 px-4 py-3 md:hidden"
          >
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === ROUTES.home}
                  onClick={closeMenu}
                  className={(state) => `block rounded-md px-2 py-2 ${navLinkClass(state)}`}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </header>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

export default Navbar;
