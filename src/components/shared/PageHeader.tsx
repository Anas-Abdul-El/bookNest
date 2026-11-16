type PageHeaderProps = {
  // The small coloured line above the title.
  eyebrow: string;
  title: string;
  description: string;
};

// The banner at the top of the About and Contact pages.
function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <section className="bg-linear-to-b from-brand-100 to-brand-50">
      <div className="mx-auto max-w-3xl px-4 py-14 text-center md:py-20">
        <p className="text-sm font-semibold tracking-widest text-brand-600 uppercase">
          {eyebrow}
        </p>
        <h1 className="mt-3 font-serif text-4xl leading-tight font-bold sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 text-lg text-stone-700">{description}</p>
      </div>
    </section>
  );
}

export default PageHeader;
