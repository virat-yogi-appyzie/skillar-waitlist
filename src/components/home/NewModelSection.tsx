import { newModel } from "@/content/home";

/**
 * The model, stated as a plain inventory rather than a synthetic "engine"
 * diagram: a heading, the five inputs the capability picture is built from,
 * and one closing guarantee. Typography does the work.
 */
export default function NewModelSection() {
  return (
    <section className="py-20 lg:py-32 bg-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="font-serif text-[length:var(--text-display)] font-normal text-navy tracking-[-0.025em] leading-tight">
            {newModel.heading}
          </h2>
          <p className="mt-5 text-navy-600 text-lg leading-relaxed">{newModel.lede}</p>
        </div>

        <div className="mt-14 lg:mt-16 max-w-4xl">
          <h3 className="text-sm font-semibold text-navy-500 uppercase tracking-wide">
            {newModel.inputsTitle}
          </h3>
          <dl className="mt-4 border-t border-border">
            {newModel.inputs.map((input) => (
              <div
                key={input.name}
                className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-6 py-5 border-b border-border/70"
              >
                <dt className="sm:col-span-4 font-medium text-navy">{input.name}</dt>
                <dd className="sm:col-span-8 text-navy-500 leading-relaxed">{input.detail}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 font-serif text-xl sm:text-2xl text-navy leading-snug max-w-2xl text-balance">
            {newModel.closing}
          </p>
        </div>
      </div>
    </section>
  );
}
