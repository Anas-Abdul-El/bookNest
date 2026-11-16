import type { ReactNode } from "react";

type EmptyStateProps = {
  icon: string;
  title: string;
  children: ReactNode;
  // Usually a button or link, e.g. "Browse books".
  action?: ReactNode;
  // Use "h1" when the empty state is the whole page.
  titleAs?: "h1" | "h2" | "h3";
  className?: string;
};

// A centred icon, title, message and optional action. Used for "not found",
// "no results", an empty cart and the thank-you messages.
function EmptyState({
  icon,
  title,
  children,
  action,
  titleAs: Title = "h2",
  className = "",
}: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      <p className="text-6xl" aria-hidden="true">
        {icon}
      </p>
      <Title className="mt-4 font-serif text-2xl font-bold sm:text-3xl">{title}</Title>
      <div className="mt-3 text-stone-600">{children}</div>
      {action && <div className="mt-8">{action}</div>}
    </div>
  );
}

export default EmptyState;
