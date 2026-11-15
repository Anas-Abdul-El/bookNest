type CategoryStyle = {
  icon: string;
  // Tailwind gradient colours for the placeholder book cover.
  coverGradient: string;
};

const CATEGORY_STYLES: Record<string, CategoryStyle> = {
  Fiction: { icon: "📖", coverGradient: "from-rose-700 to-rose-900" },
  Science: { icon: "🔬", coverGradient: "from-sky-700 to-indigo-900" },
  History: { icon: "🏛️", coverGradient: "from-amber-700 to-stone-800" },
  Technology: { icon: "💻", coverGradient: "from-emerald-700 to-teal-900" },
};

// Used for any category added to books.json without its own style.
const DEFAULT_CATEGORY_STYLE: CategoryStyle = {
  icon: "📚",
  coverGradient: "from-stone-600 to-stone-800",
};

export function getCategoryStyle(category: string): CategoryStyle {
  return CATEGORY_STYLES[category] ?? DEFAULT_CATEGORY_STYLE;
}
