import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Terms of Service | Skillar.ai",
  description:
    "Terms of Service for Skillar.ai, an AI-powered LMS platform for workforce skill mapping and assessments.",
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

              <p className="font-medium text-navy">
                Effective Date: September 7, 2026
              </p>
            
            <section className="space-y-3 pt-2">
              <h2 className="font-serif text-xl sm:text-2xl font-normal text-navy tracking-[-0.02em]">
                1. Introduction & Definitions
              </h2>
              <p className="text-navy-500 text-[15px] sm:text-base leading-[1.8]">
                Welcome to Skillar.ai (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), a company registered in Jaipur, Rajasthan, India. By accessing or using our platform, you agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;).
              </p>
              <p className="text-navy-500 text-[15px] sm:text-base leading-[1.8]">
                The following definitions apply throughout these Terms:
              </p>
              <ul className="list-disc ml-6 space-y-1.5 text-navy-500 text-[15px] sm:text-base leading-[1.8]">
                <li><strong>Services:</strong> Skillar.ai&rsquo;s offerings including skill mapping, assessment engine, AI learning paths, certification tracking, and workforce analytics.</li>
                <li><strong>Platform:</strong> Our website, applications, and associated software provided by Skillar.ai.</li>
                <li><strong>Content:</strong> All text, information, materials, data, software, executable code, images, and other content provided by us.</li>
                <li><strong>User Content:</strong> Any information, data, or materials uploaded or submitted by you.</li>
                <li><strong>Organisation Account:</strong> An account created by a business or educational entity.</li>
                <li><strong>Subscription:</strong> A paid or free-tier plan providing access to the Platform.</li>
                <li><strong>Administrator:</strong> A user authorised to manage an Organisation Account.</li>
                <li><strong>Learner:</strong> An individual user accessing the Platform to utilize educational and assessment services.</li>
              </ul>
            </section>

            <section className="space-y-3 pt-2">
              <h2 className="font-serif text-xl sm:text-2xl font-normal text-navy tracking-[-0.02em]">
                2. Eligibility & Account Registration
              </h2>
              <p className="text-navy-500 text-[15px] sm:text-base leading-[1.8]">
                You must be at least 18 years old or have explicit institutional authorization to use the Services. When you register, you agree to provide accurate and complete information. Organisation Administrators are responsible for managing and authorizing their team&rsquo;s access to the Platform.
              </p>
              <p className="text-navy-500 text-[15px] sm:text-base leading-[1.8]">
                You are strictly responsible for maintaining the security of your account credentials. Sharing login credentials is not permitted; one person per account is strictly enforced.
              </p>
            </section>

            <section className="space-y-3 pt-2">
              <h2 className="font-serif text-xl sm:text-2xl font-normal text-navy tracking-[-0.02em]">
                3. Description of Services
              </h2>
              <p className="text-navy-500 text-[15px] sm:text-base leading-[1.8]">
                Skillar.ai provides an AI-powered learning management system designed to accelerate workforce capabilities. Features include:
              </p>
              <ul className="list-disc ml-6 space-y-1.5 text-navy-500 text-[15px] sm:text-base leading-[1.8]">
                <li>AI-powered skill mapping tailored per role.</li>
                <li>Automated assessment scheduling and execution.</li>
                <li>Personalized learning roadmap generation.</li>
                <li>Certification and compliance tracking.</li>
                <li>Workforce analytics and reporting dashboards.</li>
                <li>API integrations with third-party HRMS and enterprise systems.</li>
              </ul>
            </section>

            <section className="space-y-3 pt-2">
              <h2 className="font-serif text-xl sm:text-2xl font-normal text-navy tracking-[-0.02em]">
                4. Subscription Plans & Payments
              </h2>
              <p className="text-navy-500 text-[15px] sm:text-base leading-[1.8]">
                We offer a free tier (waitlist or basic access) and paid subscription plans for individuals and enterprise clients on monthly or annual billing cycles. All prices are in Indian Rupees (INR) and are subject to Goods and Services Tax (GST) as applicable.
              </p>
              <p className="text-navy-500 text-[15px] sm:text-base leading-[1.8]">
                Payments must be made through our authorized payment gateways. Subscriptions auto-renew automatically unless cancelled. We will provide a 15-day advance notice before auto-renewal charges apply for annual plans. Any price changes will be communicated with a 30-day notice.
              </p>
              <p className="text-navy-500 text-[15px] sm:text-base leading-[1.8]">
                <strong>Refund Policy:</strong> We offer a pro-rata refund for annual subscriptions if cancelled early. Monthly subscriptions are non-refundable after the first 7 days of the billing cycle.
              </p>
            </section>

            <section className="space-y-3 pt-2">
              <h2 className="font-serif text-xl sm:text-2xl font-normal text-navy tracking-[-0.02em]">
                5. User Responsibilities & Acceptable Use
              </h2>
              <p className="text-navy-500 text-[15px] sm:text-base leading-[1.8]">
                You agree not to misuse the Services. The following actions are strictly prohibited:
              </p>
              <ul className="list-disc ml-6 space-y-1.5 text-navy-500 text-[15px] sm:text-base leading-[1.8]">
                <li>Cheating, plagiarizing, or manipulating assessments.</li>
                <li>Sharing login credentials with other individuals.</li>
                <li>Using automated scripts, scraping, or data harvesting tools on the Platform.</li>
                <li>Reverse-engineering the Platform algorithms or software.</li>
                <li>Uploading malicious content, viruses, or malware.</li>
                <li>Using the Platform to build or support competing products.</li>
                <li>Engaging in harassment or discriminatory behaviour towards other users.</li>
                <li>Circumventing access controls or security measures.</li>
              </ul>
            </section>

            <section className="space-y-3 pt-2">
              <h2 className="font-serif text-xl sm:text-2xl font-normal text-navy tracking-[-0.02em]">
                6. Intellectual Property
              </h2>
              <p className="text-navy-500 text-[15px] sm:text-base leading-[1.8]">
                Skillar.ai retains all ownership and intellectual property rights in the Platform, including code, AI models, assessment frameworks, branding, and documentation. You retain ownership of all User Content you upload to the Platform.
              </p>
              <p className="text-navy-500 text-[15px] sm:text-base leading-[1.8]">
                By uploading User Content, you grant Skillar.ai a non-exclusive, worldwide, royalty-free licence to host, display, and process your content strictly for the purpose of service delivery. Data belonging to an Organisation remains the sole property of that Organisation.
              </p>
            </section>

            <section className="space-y-3 pt-2">
              <h2 className="font-serif text-xl sm:text-2xl font-normal text-navy tracking-[-0.02em]">
                7. User-Generated Content
              </h2>
              <p className="text-navy-500 text-[15px] sm:text-base leading-[1.8]">
                You are entirely responsible for the legality, accuracy, and appropriateness of any content you generate or upload. Skillar.ai reserves the right, but has no obligation, to moderate, monitor, or remove content that violates our guidelines or the law.
              </p>
              <p className="text-navy-500 text-[15px] sm:text-base leading-[1.8]">
                We comply with the Indian Information Technology Act, 2000, and will respond to DMCA-equivalent takedown notices for verified intellectual property infringements.
              </p>
            </section>

            <section className="space-y-3 pt-2">
              <h2 className="font-serif text-xl sm:text-2xl font-normal text-navy tracking-[-0.02em]">
                8. Data & Privacy
              </h2>
              <p className="text-navy-500 text-[15px] sm:text-base leading-[1.8]">
                Your use of the Services is governed by our{" "}
                <Link href="/privacy-policy" className="text-accent font-medium hover:underline">
                  Privacy Policy
                </Link>
                , which adheres to the SPDI Rules 2011 and other applicable data protection laws. 
              </p>
              <p className="text-navy-500 text-[15px] sm:text-base leading-[1.8]">
                For our Enterprise clients, you may elect to enter into a separate Data Processing Agreement (DPA). In such relationships, Skillar.ai acts as a data processor processing data solely on behalf of the organisation, which remains the data controller.
              </p>
            </section>

            <section className="space-y-3 pt-2">
              <h2 className="font-serif text-xl sm:text-2xl font-normal text-navy tracking-[-0.02em]">
                9. AI-Powered Features Disclaimer
              </h2>
              <p className="text-navy-500 text-[15px] sm:text-base leading-[1.8]">
                Skillar.ai utilizes artificial intelligence to provide skill assessments and learning path recommendations. These features are intended as assistive tools and do not represent definitive professional evaluations.
              </p>
              <p className="text-navy-500 text-[15px] sm:text-base leading-[1.8]">
                We do not guarantee specific learning outcomes, career advancement, or employment results based on our AI recommendations. Any critical decisions derived from AI-generated content should be independently reviewed by qualified professionals. We continuously strive to improve our AI accuracy, but we do not guarantee error-free results.
              </p>
            </section>

            <section className="space-y-3 pt-2">
              <h2 className="font-serif text-xl sm:text-2xl font-normal text-navy tracking-[-0.02em]">
                10. Third-Party Integrations
              </h2>
              <p className="text-navy-500 text-[15px] sm:text-base leading-[1.8]">
                The Platform may integrate with third-party systems such as HRMS, SSO providers, payment gateways, and content platforms. Skillar.ai is not responsible for the availability, data practices, or terms and conditions of these third-party services. We encourage users to review the independent terms of any integrated third party.
              </p>
            </section>

            <section className="space-y-3 pt-2">
              <h2 className="font-serif text-xl sm:text-2xl font-normal text-navy tracking-[-0.02em]">
                11. Service Availability & SLA
              </h2>
              <p className="text-navy-500 text-[15px] sm:text-base leading-[1.8]">
                We aim for a best-effort 99.5% uptime target for the Services. We will provide advance notice for any scheduled maintenance. However, we do not guarantee uninterrupted or completely error-free service operations, and we are not liable for force majeure disruptions.
              </p>
              <p className="text-navy-500 text-[15px] sm:text-base leading-[1.8]">
                Enterprise Service Level Agreements (SLAs) are available under separate enterprise agreements.
              </p>
            </section>

            <section className="space-y-3 pt-2">
              <h2 className="font-serif text-xl sm:text-2xl font-normal text-navy tracking-[-0.02em]">
                12. Limitation of Liability
              </h2>
              <p className="text-navy-500 text-[15px] sm:text-base leading-[1.8]">
                To the maximum extent permitted by Indian law, particularly under the Indian Contract Act 1872, Skillar.ai shall bear no liability for any indirect, incidental, special, consequential, or punitive damages arising out of your use of the Services.
              </p>
              <p className="text-navy-500 text-[15px] sm:text-base leading-[1.8]">
                In all instances, Skillar.ai&rsquo;s total aggregate liability shall be capped at the total fees paid by you in the 12 months immediately preceding the claim (or INR 10,000 for users on the free-tier), regardless of the form of action.
              </p>
            </section>

            <section className="space-y-3 pt-2">
              <h2 className="font-serif text-xl sm:text-2xl font-normal text-navy tracking-[-0.02em]">
                13. Indemnification
              </h2>
              <p className="text-navy-500 text-[15px] sm:text-base leading-[1.8]">
                You agree to indemnify and hold harmless Skillar.ai, its directors, employees, and affiliates from any claims, damages, liabilities, and expenses arising from your misuse of the Platform, violation of these Terms, infringement of third-party intellectual property, violation of applicable laws, or any User Content that causes harm.
              </p>
            </section>

            <section className="space-y-3 pt-2">
              <h2 className="font-serif text-xl sm:text-2xl font-normal text-navy tracking-[-0.02em]">
                14. Termination & Suspension
              </h2>
              <p className="text-navy-500 text-[15px] sm:text-base leading-[1.8]">
                You may terminate your account at any time via your account settings or by contacting us. Skillar.ai reserves the right to suspend or terminate your access due to violations of these terms, non-payment of fees, extended inactivity exceeding 12 months, or as required by law.
              </p>
              <p className="text-navy-500 text-[15px] sm:text-base leading-[1.8]">
                Upon termination, users will have a 30-day data export window, after which data will be permanently deleted (subject to standard legal retention requirements). If an annual subscription is terminated by Skillar.ai without cause, a pro-rata refund will be issued.
              </p>
            </section>

            <section className="space-y-3 pt-2">
              <h2 className="font-serif text-xl sm:text-2xl font-normal text-navy tracking-[-0.02em]">
                15. Governing Law & Dispute Resolution
              </h2>
              <p className="text-navy-500 text-[15px] sm:text-base leading-[1.8]">
                These Terms are governed by and construed in accordance with the laws of India. 
              </p>
              <p className="text-navy-500 text-[15px] sm:text-base leading-[1.8]">
                In the event of a dispute, parties shall first attempt resolution through good-faith negotiation for a period of 30 days. If unresolved, the dispute shall proceed to mediation under the Mediation Act 2023. If mediation fails to resolve the matter, it will be subject to the exclusive jurisdiction of the courts located in Jaipur, Rajasthan, India.
              </p>
            </section>

            <section className="space-y-3 pt-2">
              <h2 className="font-serif text-xl sm:text-2xl font-normal text-navy tracking-[-0.02em]">
                16. General Provisions
              </h2>
              <ul className="list-disc ml-6 space-y-1.5 text-navy-500 text-[15px] sm:text-base leading-[1.8]">
                <li><strong>Severability:</strong> If any provision of these Terms is deemed invalid or unenforceable, the remaining provisions will continue in full force and effect.</li>
                <li><strong>Entire Agreement:</strong> These Terms constitute the entire agreement between you and Skillar.ai, superseding any prior agreements or understandings.</li>
                <li><strong>No Waiver:</strong> Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.</li>
                <li><strong>Assignment:</strong> Skillar.ai may assign or transfer its rights under these Terms at any time. Users may not assign their rights without our prior written consent.</li>
                <li><strong>Force Majeure:</strong> Neither party will be liable for performance failures resulting from causes beyond their reasonable control.</li>
                <li><strong>Notices:</strong> All official notices will be delivered via the email address registered with your account or through Platform notifications.</li>
                <li><strong>Amendments:</strong> Skillar.ai may update or modify these Terms with a 30-day advance notice. Continued use implies acceptance.</li>
              </ul>
            </section>

            {/* Contact Section */}
            <section className="pt-4 border-t border-border/80">
              <h3 className="text-base sm:text-lg font-semibold text-navy mb-2">
                Contact Us
              </h3>
              <p className="text-navy-500 text-[15px] sm:text-base leading-[1.8]">
                If you have any questions about these Terms, please contact us at:
              </p>
              <p className="text-navy-500 text-[15px] sm:text-base leading-[1.8] mt-2">
                Skillar.ai<br />
                Jaipur, Rajasthan, India<br />
                Email: <a href="mailto:hello@skillar.ai" className="text-accent font-medium hover:underline">hello@skillar.ai</a>
              </p>
            </section>

            <div className="pt-4 border-t border-border/80">
              <p className="text-navy-400 text-sm">
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
