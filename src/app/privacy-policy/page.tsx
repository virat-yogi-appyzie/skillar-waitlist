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
              
              <p className="font-medium text-navy">
                Effective Date: September 7, 2026
              </p>

              {/* 1. Introduction & Definitions */}
              <div className="space-y-3 pt-2">
                <h2 className="font-serif text-xl sm:text-2xl font-normal text-navy tracking-[-0.02em]">
                  1. Introduction &amp; Definitions
                </h2>
                <p>
                  Welcome to Skillar.ai, an AI-powered LMS platform for workforce skill mapping, assessments, learning paths, and certification tracking. Skillar.ai is based in Jaipur, Rajasthan, India. This Privacy Policy explains how we collect, use, and protect your information.
                </p>
                <p>
                  <strong className="text-navy font-medium">Definitions:</strong>
                </p>
                <ul className="list-disc ml-6 space-y-1.5 text-navy-500">
                  <li><strong className="text-navy font-medium">&ldquo;Platform&rdquo;</strong> refers to our website (www.skillar.ai), learning platform (learning.skillar.ai), mobile applications, and APIs.</li>
                  <li><strong className="text-navy font-medium">&ldquo;Services&rdquo;</strong> refers to all products, tools, and services provided by Skillar.ai.</li>
                  <li><strong className="text-navy font-medium">&ldquo;User&rdquo;, &ldquo;You&rdquo;</strong> refers to any individual or entity using our Services.</li>
                  <li><strong className="text-navy font-medium">&ldquo;Organisation&rdquo;</strong> refers to enterprise clients or institutions using our Platform.</li>
                  <li><strong className="text-navy font-medium">&ldquo;Learner&rdquo;</strong> refers to an individual using the Platform for learning and assessments.</li>
                  <li><strong className="text-navy font-medium">&ldquo;Administrator&rdquo;</strong> refers to an individual managing an Organisation&rsquo;s account.</li>
                  <li><strong className="text-navy font-medium">&ldquo;Personal Data&rdquo;</strong> refers to any information that can identify an individual.</li>
                  <li><strong className="text-navy font-medium">&ldquo;Sensitive Personal Data or Information (SPDI)&rdquo;</strong> as defined under the SPDI Rules 2011 of India.</li>
                </ul>
              </div>

              {/* 2. Applicability & Scope */}
              <div className="space-y-3 pt-2">
                <h2 className="font-serif text-xl sm:text-2xl font-normal text-navy tracking-[-0.02em]">
                  2. Applicability &amp; Scope
                </h2>
                <p>
                  This Privacy Policy applies to the Platform, including our website (www.skillar.ai), LMS platform (learning.skillar.ai), mobile applications, APIs, and all related Services. It covers individual learners, organisational administrators, enterprise clients, and website visitors.
                </p>
              </div>

              {/* 3. Information We Collect */}
              <div className="space-y-4 pt-2">
                <h2 className="font-serif text-xl sm:text-2xl font-normal text-navy tracking-[-0.02em]">
                  3. Information We Collect
                </h2>
                
                <div className="space-y-2">
                  <h3 className="text-base sm:text-lg font-semibold text-navy">a. Account &amp; Profile Data</h3>
                  <p>When you register, we may collect your name, email, phone number, job title, and organisation details.</p>
                </div>
                
                <div className="space-y-2 pt-3">
                  <h3 className="text-base sm:text-lg font-semibold text-navy">b. Learning &amp; Assessment Data</h3>
                  <p>We track quiz scores, course progress, skill maps, certifications, and learning path history to provide our core AI-powered learning experience.</p>
                </div>
                
                <div className="space-y-2 pt-3">
                  <h3 className="text-base sm:text-lg font-semibold text-navy">c. Organisation &amp; Workforce Data</h3>
                  <p>For enterprise clients, we collect data regarding team structures, role-skill mappings, and compliance requirements.</p>
                </div>
                
                <div className="space-y-2 pt-3">
                  <h3 className="text-base sm:text-lg font-semibold text-navy">d. Usage &amp; Device Data</h3>
                  <p>We automatically collect data on how you interact with our Platform, including IP address, browser type, operating system, pages visited, session duration, and feature usage.</p>
                </div>
                
                <div className="space-y-2 pt-3">
                  <h3 className="text-base sm:text-lg font-semibold text-navy">e. Payment &amp; Billing Data</h3>
                  <p>Payments are processed via third-party gateways. We do not store your complete credit card or payment details.</p>
                </div>
                
                <div className="space-y-2 pt-3">
                  <h3 className="text-base sm:text-lg font-semibold text-navy">f. Communication Data</h3>
                  <p>We store support tickets, feedback, and emails to assist you effectively.</p>
                </div>
                
                <div className="space-y-2 pt-3">
                  <h3 className="text-base sm:text-lg font-semibold text-navy">g. Cookies &amp; Tracking Technologies</h3>
                  <p>We use essential, functional, and analytics cookies to enhance your experience and analyze usage patterns.</p>
                </div>
              </div>

              {/* 4. How We Use Your Information */}
              <div className="space-y-3 pt-2">
                <h2 className="font-serif text-xl sm:text-2xl font-normal text-navy tracking-[-0.02em]">
                  4. How We Use Your Information
                </h2>
                <p>We use your information for the following purposes:</p>
                <ul className="list-disc ml-6 space-y-1.5 text-navy-500">
                  <li>Service delivery &amp; account management</li>
                  <li>AI-powered skill diagnosis &amp; learning path generation</li>
                  <li>Assessment scheduling &amp; automated reporting</li>
                  <li>Compliance &amp; certification tracking</li>
                  <li>Workforce analytics dashboards for organisations</li>
                  <li>Product improvement &amp; internal analytics</li>
                  <li>Security &amp; fraud prevention</li>
                  <li>Customer communications &amp; support</li>
                </ul>
              </div>

              {/* 5. Legal Basis for Processing */}
              <div className="space-y-3 pt-2">
                <h2 className="font-serif text-xl sm:text-2xl font-normal text-navy tracking-[-0.02em]">
                  5. Legal Basis for Processing
                </h2>
                <p>
                  We process your data based on the Indian legal framework, including the Indian IT Act 2000, SPDI Rules 2011, and the Indian Contract Act 1872, relying on:
                </p>
                <ul className="list-disc ml-6 space-y-1.5 text-navy-500">
                  <li><strong className="text-navy font-medium">Consent:</strong> We obtain explicit consent for SPDI and marketing communications.</li>
                  <li><strong className="text-navy font-medium">Contractual Necessity:</strong> To fulfil our terms of service.</li>
                  <li><strong className="text-navy font-medium">Legal Obligation:</strong> To comply with Indian IT Act 2000, Companies Act, and other regulatory requirements.</li>
                  <li><strong className="text-navy font-medium">Legitimate Interests:</strong> To improve our services and ensure Platform security.</li>
                </ul>
              </div>

              {/* 6. Data Sharing & Disclosure */}
              <div className="space-y-3 pt-2">
                <h2 className="font-serif text-xl sm:text-2xl font-normal text-navy tracking-[-0.02em]">
                  6. Data Sharing &amp; Disclosure
                </h2>
                <p>We may share your data in the following contexts:</p>
                <ul className="list-disc ml-6 space-y-1.5 text-navy-500">
                  <li><strong className="text-navy font-medium">With your Organisation:</strong> Your employer or institution can view learner progress, assessment results, and compliance status.</li>
                  <li><strong className="text-navy font-medium">Service Providers:</strong> Cloud hosting, analytics, and payment processors, operating under strict contractual obligations.</li>
                  <li><strong className="text-navy font-medium">Legal &amp; Regulatory Authorities:</strong> When required by Indian law, court orders, or government requests.</li>
                  <li><strong className="text-navy font-medium">Business Transfers:</strong> In the event of mergers or acquisitions, with adequate notice to Users.</li>
                </ul>
                <p className="font-medium text-navy mt-4">We explicitly state: We do NOT sell your personal data.</p>
              </div>

              {/* 7. Data Retention */}
              <div className="space-y-3 pt-2">
                <h2 className="font-serif text-xl sm:text-2xl font-normal text-navy tracking-[-0.02em]">
                  7. Data Retention
                </h2>
                <p>
                  We retain data as long as necessary to provide our Services:
                </p>
                <ul className="list-disc ml-6 space-y-1.5 text-navy-500">
                  <li><strong className="text-navy font-medium">Active Account:</strong> Data is retained while the account is active, plus 90 days post-deletion request.</li>
                  <li><strong className="text-navy font-medium">Legal Holds:</strong> Data is retained as required by applicable Indian law.</li>
                  <li><strong className="text-navy font-medium">Learning Analytics:</strong> Data is anonymised and retained for Platform improvement.</li>
                  <li><strong className="text-navy font-medium">Organisation Data:</strong> Managed per the terms of our enterprise agreements.</li>
                </ul>
              </div>

              {/* 8. Data Security */}
              <div className="space-y-3 pt-2">
                <h2 className="font-serif text-xl sm:text-2xl font-normal text-navy tracking-[-0.02em]">
                  8. Data Security
                </h2>
                <p>
                  We take the security of your data seriously. We employ encryption in transit (TLS 1.2+) and at rest, role-based access controls, regular security audits, and formal incident response procedures. We comply with IT Act 2000 Section 43A and SPDI Rules Rule 8.
                </p>
              </div>

              {/* 9. Your Rights */}
              <div className="space-y-3 pt-2">
                <h2 className="font-serif text-xl sm:text-2xl font-normal text-navy tracking-[-0.02em]">
                  9. Your Rights
                </h2>
                <p>
                  You have the right to access your personal data, correct inaccurate data, delete your account and data, withdraw consent, data portability (export learning records and certificates), and lodge a grievance.
                </p>
                <p>
                  To exercise these rights, email <a href="mailto:hello@skillar.ai" className="text-accent font-medium hover:underline">hello@skillar.ai</a>. We will respond within 30 days.
                </p>
              </div>

              {/* 10. Cookies & Tracking Technologies */}
              <div className="space-y-3 pt-2">
                <h2 className="font-serif text-xl sm:text-2xl font-normal text-navy tracking-[-0.02em]">
                  10. Cookies &amp; Tracking Technologies
                </h2>
                <p>
                  We use strictly necessary cookies (session, authentication), functional cookies (language, preferences), analytics cookies (usage patterns, feature adoption), and marketing cookies (only with explicit consent).
                </p>
                <p>
                  You can manage your cookie preferences through your browser settings or our Platform&rsquo;s cookie preferences.
                </p>
              </div>

              {/* 11. Children's Privacy */}
              <div className="space-y-3 pt-2">
                <h2 className="font-serif text-xl sm:text-2xl font-normal text-navy tracking-[-0.02em]">
                  11. Children&rsquo;s Privacy
                </h2>
                <p>
                  Our Platform is not intended for children under 18 without parental or institutional consent. We do not knowingly collect data from children. If discovered, we delete it promptly.
                </p>
              </div>

              {/* 12. International Data Transfers */}
              <div className="space-y-3 pt-2">
                <h2 className="font-serif text-xl sm:text-2xl font-normal text-navy tracking-[-0.02em]">
                  12. International Data Transfers
                </h2>
                <p>
                  Our primary servers are in India. Cloud infrastructure may involve cross-border processing. We ensure adequate safeguards through contractual clauses with service providers.
                </p>
              </div>

              {/* 13. Changes to This Policy */}
              <div className="space-y-3 pt-2">
                <h2 className="font-serif text-xl sm:text-2xl font-normal text-navy tracking-[-0.02em]">
                  13. Changes to This Policy
                </h2>
                <p>
                  Material changes to this policy will be communicated via email and Platform notification at least 15 days before they take effect. Continued use of the Services after changes constitutes acceptance.
                </p>
              </div>

              {/* 14. Grievance Officer & Contact */}
              <div className="space-y-3 pt-2">
                <h2 className="font-serif text-xl sm:text-2xl font-normal text-navy tracking-[-0.02em]">
                  14. Grievance Officer &amp; Contact
                </h2>
                <p>
                  In accordance with the IT Act 2000 and IT (Intermediary Guidelines) Rules 2021, the name and contact details of the Grievance Officer are provided below:
                </p>
                <ul className="list-disc ml-6 space-y-1.5 text-navy-500">
                  <li><strong className="text-navy font-medium">Name:</strong> The Grievance Officer, Skillar.ai</li>
                  <li><strong className="text-navy font-medium">Email:</strong> <a href="mailto:hello@skillar.ai" className="text-accent font-medium hover:underline">hello@skillar.ai</a></li>
                  <li><strong className="text-navy font-medium">Address:</strong> Jaipur, Rajasthan, India</li>
                </ul>
                <p>
                  We aim to acknowledge your grievance within 24 hours and resolve it within 15 days.
                </p>
              </div>

              <div className="pt-4 border-t border-border/80">
                <p className="font-medium text-navy">
                  Last Updated: September 7, 2026
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
