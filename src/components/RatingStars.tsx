import { MAX_RATING } from "../constants/catalogue";

type RatingStarsProps = {
  rating: number;
  // "compact" shows "★ 4.7" (book cards); "full" shows five stars and "4.7 out of 5".
  variant?: "compact" | "full";
};

function RatingStars({ rating, variant = "compact" }: RatingStarsProps) {
  const label = `${rating.toFixed(1)} out of ${MAX_RATING}`;

  if (variant === "compact") {
    return (
      <p className="text-sm text-amber-600" aria-label={`Rated ${label}`}>
        ★ {rating.toFixed(1)}
      </p>
    );
  }

  // Filled up to the rating rounded to the nearest whole star.
  const filled = Math.round(rating);
  return (
    <p className="flex items-center gap-2">
      <span className="text-amber-500" aria-hidden="true">
        {"★".repeat(filled)}
        <span className="text-stone-300">{"★".repeat(MAX_RATING - filled)}</span>
      </span>
      <span className="text-sm text-stone-600">{label}</span>
    </p>
  );
}

export default RatingStars;
