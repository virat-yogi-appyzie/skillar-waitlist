import type { Metadata } from "next";
import { Newsreader, Public_Sans, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/site-config";

// Type system, chosen deliberately rather than inherited:
// - Newsreader: a literary text serif with real optical sizing. Warmer and less
//   saturated than the display faces every generated site reaches for.
// - Public Sans: designed for the U.S. federal web standards, which is exactly
//   the register of a compliance product. Plainspoken, sturdy, human.
// - IBM Plex Mono: used only where content is genuinely data or measurement,
//   never as a costume for "technical".
const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  style: ["normal"],
  axes: ["opsz"],
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.siteUrl),
  title: "Skillar.ai | Workforce Compliance & Skill Intelligence",
  description: "Skillar maps the skills each role is accountable for, assesses them on a schedule, and generates revision roadmaps for whatever the results flag.",
  openGraph: {
    title: "Skillar.ai | Workforce Compliance & Skill Intelligence",
    description: "Assessment-led learning: skill maps, scheduled assessments, revision roadmaps, certification tracking.",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Skillar.ai: know what your people need to learn next.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Skillar.ai | Workforce Compliance & Skill Intelligence",
    description: "Assessment-led learning: skill maps, scheduled assessments, revision roadmaps, certification tracking.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${publicSans.variable} ${plexMono.variable}`}
    >
      <body>
        <a href="#main-content" className="skip-link">Skip to content</a>
        {children}
        {/* Apollo website tracker, added on main in PR #11 and carried
            forward here so the redesign doesn't silently drop it. */}
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
