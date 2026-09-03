import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy | Skillar.ai",
  description:
    "Privacy Policy for Skillar.ai describing how we collect, use, and protect your information.",
};

export default function PrivacyPolicy() {
  return (
    <>
      <Header />
      <main id="main-content" className="bg-bg">
        {/* Page header */}
        <section className="pt-36 pb-10 sm:pt-44 sm:pb-14 border-b border-border/60 bg-surface/30">
          <div className="w-full max-w-7xl xl:max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-navy tracking-[-0.025em]">
              Privacy policy
            </h1>
          </div>
        </section>

        {/* The policy itself */}
        <section className="py-14 sm:py-20">
          <div className="w-full max-w-7xl xl:max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16">
            <div className="max-w-3xl space-y-8 text-navy-500 text-[15px] sm:text-base leading-[1.8] font-normal [&_p]:max-w-none">
              
              {/* Introduction */}
              <p>
                Welcome to our website <strong className="text-navy font-medium">www.skillar.ai</strong> owned by <strong className="text-navy font-medium">Appyzie Technologies Private Limited</strong>, having its registered office at 4th Floor, Triveni Flyover, 1A, Gopalpura Bypass Rd, 10-B Scheme, Vishveshvariya Nagar, Gopal Pura Mode, Jaipur, Rajasthan 302018 (hereinafter referred to as &ldquo;Skillar.ai&rdquo;, &ldquo;We&rdquo;, &ldquo;Us&rdquo; or &ldquo;Our&rdquo;). This Privacy Policy (&ldquo;Policy&rdquo;) provides You (&ldquo;User&rdquo; or &ldquo;Your&rdquo;) essential information on how we handle Your data and privacy.
              </p>

              {/* 1. Consent, Collection and Use of Information */}
              <div className="space-y-4 pt-2">
                <h2 className="font-serif text-xl sm:text-2xl font-normal text-navy tracking-[-0.02em]">
                  1. Consent, Collection and Use of Information
                </h2>

                <div className="space-y-2">
                  <h3 className="text-base sm:text-lg font-semibold text-navy">
                    a. Consent
                  </h3>
                  <p>
                    By using the Website and/or providing Your information to Us, You consent to the terms of this Policy. This Policy is effective upon Your first access to the Website or when You submit information to Us via any medium. You may request modification or deletion of your data by contacting our team via email.
                  </p>
                  <p>
                    This Policy does not cover third-party sites linked from our Website. Please read their privacy policies before submitting data to them.
                  </p>
                </div>

                <div className="space-y-2 pt-3">
                  <h3 className="text-base sm:text-lg font-semibold text-navy">
                    b. Collection and Use of Information
                  </h3>
                  <p>
                    We may collect information You voluntarily submit (like name, email, role, organizational details), as well as data automatically tracked through cookies, IP addresses, browser details, and page visits. This data helps us improve user experience and provide relevant services.
                  </p>
                  <p>We may use this data to:</p>
                  <ul className="list-disc ml-6 space-y-1.5 text-navy-500">
                    <li>Respond to queries and offer support</li>
                    <li>Personalize learning pathways and workforce capability diagnosis</li>
                    <li>Conduct internal research and product analytics</li>
                    <li>Improve site design and service offerings</li>
                    <li>Ensure security and prevent fraud</li>
                  </ul>
                </div>

                <div className="space-y-2 pt-3">
                  <h3 className="text-base sm:text-lg font-semibold text-navy">
                    c. Use by Third Parties and Links
                  </h3>
                  <p>
                    We may share information with our service providers or partners solely for the purpose of fulfilling our services. We do not sell Your personal data. However, in case of a business transfer or legal obligation, Your data may be disclosed with appropriate safeguards.
                  </p>
                </div>
              </div>

              {/* 2. Disclosure of Your Information */}
              <div className="space-y-3 pt-2">
                <h2 className="font-serif text-xl sm:text-2xl font-normal text-navy tracking-[-0.02em]">
                  2. Disclosure of Your Information
                </h2>
                <p>
                  Third-party vendors or agencies may access Your information strictly for operating the Website or performing services on Our behalf. Such disclosures are made with confidentiality obligations. We do not allow these entities to use Your information for marketing their products.
                </p>
              </div>

              {/* 3. Cooperation with Law */}
              <div className="space-y-3 pt-2">
                <h2 className="font-serif text-xl sm:text-2xl font-normal text-navy tracking-[-0.02em]">
                  3. Cooperation with Law
                </h2>
                <p>
                  We cooperate with government, legal, and regulatory authorities. In case of criminal investigations, fraud, or IP infringements, We may disclose Your information without prior notice if required by law or to prevent harm or fraud.
                </p>
              </div>

              {/* 4. Security */}
              <div className="space-y-3 pt-2">
                <h2 className="font-serif text-xl sm:text-2xl font-normal text-navy tracking-[-0.02em]">
                  4. Security
                </h2>
                <p>
                  We implement security practices in line with the Information Technology Act, 2000 and SPDI Rules, and are compliant with GDPR standards. Your information is accessed only by authorized personnel, on a need-to-know basis.
                </p>
              </div>

              {/* 5. Integrity and Retention of Data */}
              <div className="space-y-3 pt-2">
                <h2 className="font-serif text-xl sm:text-2xl font-normal text-navy tracking-[-0.02em]">
                  5. Integrity and Retention of Data
                </h2>
                <p>
                  You may review or update Your information by contacting Us. We retain Your data for as long as required to fulfill the purposes stated in this Policy, or as required by law.
                </p>
              </div>

              {/* 6. Governing Law */}
              <div className="space-y-3 pt-2">
                <h2 className="font-serif text-xl sm:text-2xl font-normal text-navy tracking-[-0.02em]">
                  6. Governing Law
                </h2>
                <p>
                  This Policy is governed by Indian law. Any disputes shall be subject to the jurisdiction of courts in Jaipur, Rajasthan.
                </p>
              </div>

              {/* Contact Information */}
              <div className="pt-4 border-t border-border/80">
                <p>
                  If you have any questions or requests regarding your privacy, please write to us at{" "}
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
