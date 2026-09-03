import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Terms of Service | Skillar.ai",
  description:
    "Terms of Service for Skillar.ai describing the rules and regulations for using our platform and services.",
};

export default function TermsOfService() {
  return (
    <>
      <Header />
      <main id="main-content" className="bg-bg">
        {/* Page header */}
        <section className="pt-36 pb-10 sm:pt-44 sm:pb-14 border-b border-border/60 bg-surface/30">
          <div className="w-full max-w-7xl xl:max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-navy tracking-[-0.025em]">
              Terms of service
            </h1>
          </div>
        </section>

        {/* The terms themselves */}
        <section className="py-14 sm:py-20">
          <div className="w-full max-w-7xl xl:max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16">
            <div className="max-w-3xl space-y-8 text-navy-500 text-[15px] sm:text-base leading-[1.8] font-normal [&_p]:max-w-none">
              
              {/* Introduction */}
              <p>
                These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of <strong className="text-navy font-medium">www.skillar.ai</strong> and related services (&ldquo;Service&rdquo;), owned and operated by <strong className="text-navy font-medium">Appyzie Technologies Private Limited</strong>, having its registered office at 4th Floor, Triveni Flyover, 1A, Gopalpura Bypass Rd, 10-B Scheme, Vishveshvariya Nagar, Gopal Pura Mode, Jaipur, Rajasthan 302018 (hereinafter referred to as &ldquo;Skillar.ai&rdquo;, &ldquo;We&rdquo;, &ldquo;Us&rdquo; or &ldquo;Our&rdquo;).
              </p>

              <p>
                By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the Service.
              </p>

              {/* 1. Accounts and Registration */}
              <div className="space-y-3 pt-2">
                <h2 className="font-serif text-xl sm:text-2xl font-normal text-navy tracking-[-0.02em]">
                  1. Accounts and Registration
                </h2>
                <p>
                  When you create an account with us, you must provide accurate, complete, and current information. You are responsible for safeguarding the password and credentials used to access the Service and for any activities or actions under your account.
                </p>
              </div>

              {/* 2. Acceptable Use */}
              <div className="space-y-3 pt-2">
                <h2 className="font-serif text-xl sm:text-2xl font-normal text-navy tracking-[-0.02em]">
                  2. Acceptable Use
                </h2>
                <p>
                  You agree not to misuse the Service, interfere with its normal operation, attempt to gain unauthorized access to our systems, or use the Service for any unlawful or unauthorized purpose.
                </p>
              </div>

              {/* 3. Intellectual Property */}
              <div className="space-y-3 pt-2">
                <h2 className="font-serif text-xl sm:text-2xl font-normal text-navy tracking-[-0.02em]">
                  3. Intellectual Property
                </h2>
                <p>
                  The Service and its original content, features, and functionality are and will remain the exclusive property of Skillar.ai and its licensors. Our trademarks, logos, and service marks may not be used without prior written consent.
                </p>
              </div>

              {/* 4. Data and Privacy */}
              <div className="space-y-3 pt-2">
                <h2 className="font-serif text-xl sm:text-2xl font-normal text-navy tracking-[-0.02em]">
                  4. Data and Privacy
                </h2>
                <p>
                  Your use of the Service is also governed by our{" "}
                  <Link href="/privacy-policy" className="text-accent font-medium hover:underline">
                    Privacy Policy
                  </Link>
                  , which is incorporated into these Terms by reference.
                </p>
              </div>

              {/* 5. Limitation of Liability */}
              <div className="space-y-3 pt-2">
                <h2 className="font-serif text-xl sm:text-2xl font-normal text-navy tracking-[-0.02em]">
                  5. Limitation of Liability
                </h2>
                <p>
                  In no event shall Skillar.ai, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, exemplary, consequential, or punitive damages arising from your access to or use of the Service.
                </p>
              </div>

              {/* 6. Governing Law */}
              <div className="space-y-3 pt-2">
                <h2 className="font-serif text-xl sm:text-2xl font-normal text-navy tracking-[-0.02em]">
                  6. Governing Law
                </h2>
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes shall be subject to the exclusive jurisdiction of courts in Jaipur, Rajasthan, India.
                </p>
              </div>

              {/* Contact Information */}
              <div className="pt-4 border-t border-border/80">
                <p>
                  If you have any questions or requests regarding these Terms of Service, please write to us at{" "}
                  <a href="mailto:hello@skillar.ai" className="text-accent font-medium hover:underline">
                    hello@skillar.ai
                  </a>.
                </p>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
