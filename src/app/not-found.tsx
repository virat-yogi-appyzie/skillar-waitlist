import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Page not found | Skillar.ai",
  description: "The page you are looking for could not be found.",
};

const suggestedLinks = [
  { label: "Platform overview", href: "/product", description: "The intelligence layer behind every learning decision" },
  { label: "Solutions", href: "/solutions", description: "One organisation, four capability perspectives" },
  { label: "Skills gap diagnostic", href: "/skills-gap-diagnostic", description: "Map your workforce capability in seven steps" },
  { label: "Pricing and deployment", href: "/pricing", description: "Priced on the roles you map, not the seats you buy" },
];

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main-content" className="bg-bg">
        <section className="pt-36 pb-16 sm:pt-44 sm:pb-24">
          <div className="w-full max-w-7xl xl:max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16">
            <div className="max-w-2xl">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-navy tracking-[-0.025em] mb-3">
                This page doesn&apos;t exist.
              </h1>
              <p className="text-sm text-navy-500 mb-6">Error 404</p>
              <p className="text-lg text-navy-500 leading-relaxed mb-10">
                The link may be outdated, or the page may have moved. Here are the places
                most people are looking for.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-16">
                <Link href="/" className="btn-primary">
                  Back to home
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </Link>
                <Link
                  href="/demo"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-sm font-medium text-navy border border-border hover:border-navy-300 hover:bg-navy-50 transition-colors"
                >
                  Book a demo
                </Link>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 max-w-3xl">
              {suggestedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex items-center justify-between gap-4 p-5 rounded-2xl border border-border bg-surface-elevated hover:border-navy-300 transition-colors"
                >
                  <span className="min-w-0">
                    <span className="block text-[15px] font-medium text-navy group-hover:text-accent transition-colors">
                      {link.label}
                    </span>
                    <span className="block text-sm text-navy-500 leading-snug mt-0.5">
                      {link.description}
                    </span>
                  </span>
                  <ArrowRight className="w-4 h-4 text-navy-400 shrink-0 group-hover:text-accent group-hover:translate-x-0.5 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
