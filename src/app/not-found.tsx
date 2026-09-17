import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Quantum404Canvas from "@/components/Quantum404Canvas";
import Link from "next/link";

export const metadata = {
  title: "Page Not Found (404) | Skillar",
  description:
    "The page you requested could not be found. Return to the Skillar homepage or explore our platform.",
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main
        id="main-content"
        className="relative min-h-screen bg-[#FAF9F6] flex flex-col justify-between overflow-hidden"
      >
        {/* Soft Ambient Warm Glow */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none overflow-hidden"
        >
          <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[450px] rounded-full bg-gradient-to-tr from-indigo-200/20 via-purple-200/15 to-sky-200/15 blur-[120px]" />
        </div>

        {/* 404 Content Section */}
        <section className="relative z-10 pt-28 pb-12 sm:pt-32 sm:pb-16 my-auto">
          <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 text-center">
            
            <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-3">
              Error 404
            </p>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-navy tracking-tight leading-[1.15] mb-4">
              Page not found
            </h1>

            <p className="text-navy-600 text-base sm:text-lg leading-relaxed font-normal max-w-md mx-auto mb-8">
              The page you are looking for doesn&apos;t exist, has been moved, or is temporarily unavailable.
            </p>

            {/* Interactive Particle 404 Canvas */}
            <Quantum404Canvas />

            {/* Clear Recovery Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
              <Link
                href="/"
                className="btn-primary text-sm font-medium px-6 py-3"
              >
                Back to homepage
              </Link>
              <Link
                href="/skills-gap-diagnostic"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-medium text-navy bg-white hover:bg-navy-50/60 border border-navy-200/80 shadow-xs hover:shadow-sm transition-all"
              >
                Take the skills diagnostic
              </Link>
            </div>

            {/* Standard Footer Navigation Links */}
            <nav aria-label="Related pages" className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-navy-500">
              <Link href="/solutions" className="hover:text-navy transition-colors">
                Solutions
              </Link>
              <Link href="/product/skill-intelligence" className="hover:text-navy transition-colors">
                Skill Intelligence
              </Link>
              <Link href="/demo" className="hover:text-navy transition-colors">
                Book a walkthrough
              </Link>
              <Link href="/pricing" className="hover:text-navy transition-colors">
                Pricing
              </Link>
            </nav>

          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
