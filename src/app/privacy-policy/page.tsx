import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Head from "next/head";

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-background-primary text-foreground">
            <Header />
            <Head>
                <title>Privacy Policy - Skillar.ai</title>
                <meta
                    name="description"
                    content="Privacy Policy for Skillar.ai describing how we collect, use, and protect your information."
                />
            </Head>

            <main className="container py-10 mt-20">
                <h1 className="text-4xl font-bold mb-6 text-center">Privacy Policy</h1>
                <p className="mb-4">Last Updated: 10/01/2025</p>

                <p className="mb-4">
                    This Privacy Policy describes how Skillar.ai (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), a part of Appyzie, collects, uses, discloses, and protects your information when you use our services.
                </p>

                <p className="mb-4">
                    By accessing the Skillar.ai website, product, or services (collectively, the &quot;Service&quot;), and/or by providing your information to us, you consent to the practices described in this policy.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">1. Consent, Collection, and Use of Information</h2>

                <h3 className="text-xl font-semibold mt-4 mb-2">a. Your Consent</h3>
                <p className="mb-4">
                    By using the Service and providing your information, you expressly consent to the collection, storage, processing, and transfer of your information as described in this Privacy Policy. This policy is effective upon your first access to the Service or when you submit your information to us.
                </p>
                <p className="mb-4">
                    You have the right to access, modify, correct, or delete your personal data at any time by contacting us at <a href="mailto:hello@skillar.ai" className="text-blue-600">hello@skillar.ai</a> or by using the in-app settings where available.
                </p>
                <p className="mb-4">
                    Please note that this policy does not apply to any third-party websites or services that may be linked from our Service. We encourage you to review the privacy policies of those third parties before providing any information to them.
                </p>

                <h3 className="text-xl font-semibold mt-4 mb-2">b. Information We Collect</h3>
                <p className="mb-2">We collect information in the following ways:</p>
                <ul className="list-disc ml-6 mb-4 ">
                    <li>
                        <strong>Information You Voluntarily Provide:</strong>
                        <ul className="list-disc ml-6 mt-2 text-text-secondary">
                            <li>At Sign-Up: full name, email, phone number, and date of birth.</li>
                            <li>After Sign-Up: professional skills, career goals, learning preferences, and other profile details.</li>
                        </ul>
                    </li>
                    <li className="mt-3">
                        <strong>Information Automatically Collected:</strong>
                        <ul className="list-disc ml-6 mt-2 text-text-secondary">
                            <li>Log data, IP address, browser type, OS, visited pages, and cookies.</li>
                        </ul>
                    </li>
                </ul>

                <h3 className="text-xl font-semibold mt-4 mb-2">c. How We Use Your Information</h3>
                <ul className="list-disc ml-6 mb-4 text-text-secondary">
                    <li>Manage and maintain your account.</li>
                    <li>Personalize your experience with skills, content, and opportunities.</li>
                    <li>Provide customer support and respond to inquiries.</li>
                    <li>Send important administrative notices, updates, and alerts.</li>
                    <li>Conduct research and analytics to improve our Service.</li>
                    <li>Ensure security and prevent fraud.</li>
                    <li>Develop new features, products, and services.</li>
                </ul>

                <h3 className="text-xl font-semibold mt-4 mb-2">d. Use by Third Parties</h3>
                <p className="mb-4">
                    We may employ third-party vendors (cloud hosting, analytics, support) who have access to your information only to perform tasks on our behalf. We do not sell, trade, or rent your information. In case of merger or acquisition, your information may be transferred as a business asset, with notice provided to you.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">2. Disclosure of Your Information</h2>
                <p className="mb-4">
                    We may disclose information to trusted third-party vendors and service providers under strict confidentiality. They can access your information only to perform specific tasks for us.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">3. Cooperation with Legal Authorities</h2>
                <p className="mb-4">
                    We may disclose information to law enforcement, government officials, or private parties when necessary to comply with legal obligations or protect rights and safety.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">4. Data Security</h2>
                <p className="mb-4">
                    We implement industry-standard security measures and comply with the IT Act, 2000 and GDPR principles. Only authorized personnel can access your information. However, no transmission or storage is 100% secure.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">5. Data Integrity and Retention</h2>
                <p className="mb-4">
                    We retain personal information only as long as necessary for service purposes or legal obligations. You can request access, updates, or deletion by contacting <a href="mailto:hello@skillar.ai" className="text-blue-600">hello@skillar.ai</a>.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">6. Governing Law and Jurisdiction</h2>
                <p className="mb-4">
                    This Privacy Policy is governed by the laws of India. Disputes are subject to the exclusive jurisdiction of courts in Jaipur, Rajasthan, India.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
                <p className="mb-2">
                    Skillar.ai (a part of Appyzie)
                </p>
                <p className="mb-2">
                    Email: <a href="mailto:hello@skillar.ai" className="text-blue-600">hello@skillar.ai</a>
                </p>
                <p className="mb-2">
                    Phone: +91 9256219292
                </p>
            </main>
            <Footer />
        </div>
    );
}
