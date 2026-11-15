import { Link } from "react-router-dom";

type SectionHeaderProps = {
  title: string;
  // Shows a "View all →" link on the right when set.
  viewAllTo?: string;
};

function SectionHeader({ title, viewAllTo }: SectionHeaderProps) {
  return (
    <div className="flex items-end justify-between gap-4">
      <h2 className="font-serif text-3xl font-bold">{title}</h2>
      {viewAllTo && (
        <Link to={viewAllTo} className="text-sm font-medium text-brand-600 hover:underline">
          View all →
        </Link>
      )}
    </div>
  );
}

export default SectionHeader;
