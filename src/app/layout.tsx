import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Skillar.ai - Accelerate Your Skills with AI-Powered Learning",
  description: "Join thousands of professionals who will 3x their skill development speed with personalized learning journeys aligned with your specific skill goals and industry demands.",
  keywords: "AI learning, career development, skill building, personalized coaching, professional development",
  authors: [{ name: "Skillar.ai Team" }],
  viewport: "width=device-width, initial-scale=1.0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
