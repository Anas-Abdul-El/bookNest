import type { ReactNode } from "react";

type CtaBannerProps = {
  title: string;
  text: string;
  // The buttons or links shown under the text.
  children: ReactNode;
};

// The dark "call to action" banner near the bottom of a page.
function CtaBanner({ title, text, children }: CtaBannerProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <div className="rounded-2xl bg-brand-700 px-6 py-12 text-center text-white sm:px-12">
        <h2 className="font-serif text-3xl font-bold">{title}</h2>
        <p className="mx-auto mt-3 max-w-xl text-brand-100">{text}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">{children}</div>
      </div>
    </section>
  );
}

export default CtaBanner;
