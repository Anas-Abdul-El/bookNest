// Shared Tailwind class strings, so buttons and form fields look the same
// everywhere and a style change only has to be made once.

type ButtonVariant = "primary" | "outline" | "secondary" | "light" | "outlineLight";
type ButtonSize = "sm" | "md" | "lg";

const BUTTON_BASE =
  "inline-flex cursor-pointer items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 disabled:cursor-wait disabled:opacity-70";

const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-brand-500 text-white hover:bg-brand-600",
  outline: "border border-brand-500 text-brand-700 hover:bg-brand-100",
  secondary: "border border-stone-300 bg-white text-ink hover:bg-stone-50",
  // For use on the dark brand-coloured banners.
  light: "bg-white text-brand-700 hover:bg-brand-100",
  outlineLight: "border border-white text-white hover:bg-brand-600",
};

const BUTTON_SIZES: Record<ButtonSize, string> = {
  sm: "px-3 py-2 text-sm",
  md: "px-5 py-2.5",
  lg: "px-6 py-3",
};

// Works on both <button> and <Link>.
export function buttonClass(variant: ButtonVariant = "primary", size: ButtonSize = "lg"): string {
  return `${BUTTON_BASE} ${BUTTON_VARIANTS[variant]} ${BUTTON_SIZES[size]}`;
}

type InputOptions = {
  hasError?: boolean;
  // Leaves room on the left for an icon inside the field.
  withIcon?: boolean;
};

export function inputClass({ hasError = false, withIcon = false }: InputOptions = {}): string {
  const padding = withIcon ? "py-2.5 pr-3 pl-10" : "px-3 py-2.5";
  const colours = hasError
    ? "border-red-500 focus:ring-red-100"
    : "border-stone-300 focus:border-brand-500 focus:ring-brand-100";
  return `w-full rounded-md border bg-white ${padding} focus:ring-2 focus:outline-none ${colours}`;
}
