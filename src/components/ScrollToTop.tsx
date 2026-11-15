import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// React Router keeps the scroll position when the page changes, so a link
// clicked near the bottom of one page (e.g. a related book or a footer link)
// would open the next page scrolled down. This scrolls back to the top
// whenever the path changes. Changing only the search (filters on /books)
// does not count, so filtering keeps your place.
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;
