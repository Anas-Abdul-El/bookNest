import { Link } from "react-router-dom";
import EmptyState from "../components/shared/EmptyState";
import { ROUTES } from "../constants/routes";
import { buttonClass } from "../styles/classNames";

// Shown for any address that doesn't match a route.
function NotFound() {
  return (
    <section className="mx-auto max-w-xl px-4 py-24">
      <EmptyState
        icon="📭"
        title="Page not found"
        titleAs="h1"
        action={
          <Link to={ROUTES.home} className={buttonClass()}>
            Back to home
          </Link>
        }
      >
        This page doesn't exist, or it may have moved.
      </EmptyState>
    </section>
  );
}

export default NotFound;
