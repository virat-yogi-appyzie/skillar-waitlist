import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Skillar.ai - Accelerate Your Skills with AI-Powered Learning",
  description: "Join thousands of professionals who will 3x their skill development speed with personalized learning journeys aligned with your specific skill goals and industry demands.",
  keywords: "AI learning, career development, skill building, personalized coaching, professional development",
  authors: [{ name: "Skillar.ai Team" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
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
        <Script id="apollo-tracker" strategy="afterInteractive">
          {`
            function initApollo(){
              var n=Math.random().toString(36).substring(7),
                  o=document.createElement("script");
              o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n;
              o.async=!0;
              o.defer=!0;
              o.onload=function(){
                window.trackingFunctions.onLoad({appId:"6a16a7d95414da00147e04e9"})
              };
              document.head.appendChild(o);
            }
            initApollo();
          `}
        </Script>
      </body>
    </html>
  );
}
