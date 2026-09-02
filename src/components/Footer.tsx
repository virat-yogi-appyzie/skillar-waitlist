"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  Linkedin,
  Instagram,
  Twitter,
  ArrowUpRight,
  ArrowUp,
  MapPin
} from "lucide-react";

import {
  footerTagline,
  footerProductLinks as productLinks,
  footerSolutionLinks as solutionLinks,
  footerCompanyLinks as companyLinks,
  footerGovernanceLinks as governanceLinks,
  footerSocialLinks,
} from "@/content/navigation";
import { SITE_CONFIG } from "@/lib/site-config";

// Icons stay here: the content module is strings and data only.
const socialIcons: Record<string, typeof Linkedin> = {
  LinkedIn: Linkedin,
  Twitter: Twitter,
  Instagram: Instagram,
};

const socialLinks = footerSocialLinks.map((link) => ({
  ...link,
  icon: socialIcons[link.label],
}));

export default function Footer() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-surface border-t border-navy-200/90 pt-12 sm:pt-14 pb-8 text-navy-900">
      <div className="w-full max-w-7xl xl:max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16">
        
        {/* Main Content: Left Brand Info + Right Navigation Matrix */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10 lg:gap-12 xl:gap-16">
          
          {/* Brand & Meta Column */}
          <div className="lg:max-w-xs xl:max-w-sm space-y-4 shrink-0">
            <Link href="/" className="inline-block">
              <Image
                src="/skillar-logo.svg"
                alt="Skillar.ai"
                width={1170}
                height={263}
                className="h-7 w-auto"
              />
            </Link>
            
            <p className="text-sm text-navy-800 font-normal leading-relaxed">
              {footerTagline}
            </p>

            {/* Direct Contact */}
            <div className="space-y-2 pt-0.5 text-sm text-navy-800">
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={SITE_CONFIG.contact.emailHref}
                  className="inline-flex items-center gap-1.5 text-navy-900 hover:text-accent font-medium transition-colors"
                >
                  <Mail className="w-4 h-4 text-accent shrink-0" />
                  <span>{SITE_CONFIG.contact.email}</span>
                </a>
                <a
                  href={SITE_CONFIG.contact.phoneHref}
                  className="inline-flex items-center gap-1.5 text-navy-900 hover:text-accent font-mono font-medium transition-colors"
                >
                  <Phone className="w-4 h-4 text-accent shrink-0" />
                  <span>{SITE_CONFIG.contact.phone}</span>
                </a>
              </div>
              <div className="flex items-center gap-1.5 text-navy-700 text-xs font-medium">
                <MapPin className="w-3.5 h-3.5 text-navy-500 shrink-0" />
                <span>{SITE_CONFIG.contact.location}</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4 pt-1">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-navy-600 hover:text-accent transition-colors duration-150"
                  aria-label={link.label}
                  title={link.label}
                >
                  <link.icon className="w-4.5 h-4.5" strokeWidth={1.75} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Matrix: 4 Columns Spread Evenly Across Remaining Space */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-10 lg:gap-10 xl:gap-14 flex-1 lg:max-w-2xl xl:max-w-3xl">
            
            {/* Platform Column */}
            <div className="space-y-3.5">
              <p className="text-xs font-semibold text-navy-950 tracking-wider uppercase">
                Platform
              </p>
              <ul className="space-y-2.5">
                {productLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm font-medium text-navy-700 hover:text-navy-950 hover:underline underline-offset-2 transition-colors duration-150 block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solutions Column */}
            <div className="space-y-3.5">
              <p className="text-xs font-semibold text-navy-950 tracking-wider uppercase">
                Solutions
              </p>
              <ul className="space-y-2.5">
                {solutionLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm font-medium text-navy-700 hover:text-navy-950 hover:underline underline-offset-2 transition-colors duration-150 block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div className="space-y-3.5">
              <p className="text-xs font-semibold text-navy-950 tracking-wider uppercase">
                Company
              </p>
              <ul className="space-y-2.5">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-navy-700 hover:text-accent transition-colors duration-150 inline-flex items-center gap-1 group"
                      >
                        <span>{link.label}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-navy-500 group-hover:text-accent transition-colors" />
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm font-medium text-navy-700 hover:text-navy-950 hover:underline underline-offset-2 transition-colors duration-150 block"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Governance Column */}
            <div className="space-y-3.5">
              <p className="text-xs font-semibold text-navy-950 tracking-wider uppercase">
                Governance
              </p>
              <ul className="space-y-2.5">
                {governanceLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm font-medium text-navy-700 hover:text-navy-950 hover:underline underline-offset-2 transition-colors duration-150 block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

        {/* Structural Divider */}
        <div className="w-full h-px bg-navy-200/80 mt-10" />

        {/* Sub-Footer Utility Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-navy-700">
          
          {/* Left: Copyright & Appyzie Link */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1 font-medium">
            <span>© {new Date().getFullYear()} Skillar.ai. All rights reserved.</span>
            <span>
              Skillar.ai is a part of{" "}
              <a
                href="https://www.appyzie.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-navy-950 font-bold hover:text-accent transition-colors inline-flex items-center gap-0.5 group underline decoration-navy-400 hover:decoration-accent underline-offset-4"
              >
                <span>Appyzie</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-navy-600 group-hover:text-accent transition-colors" />
              </a>
            </span>
          </div>

          {/* Right: Quick Links & Back to Top */}
          <div className="flex items-center gap-6 text-xs text-navy-700 font-medium">
            <Link
              href="/privacy-policy"
              className="hover:text-navy-950 hover:underline underline-offset-2 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-navy-950 hover:underline underline-offset-2 transition-colors"
            >
              Terms of Service
            </Link>
            <button
              onClick={scrollToTop}
              className="text-navy-900 hover:text-accent transition-colors inline-flex items-center gap-1 cursor-pointer font-semibold"
              aria-label="Scroll back to top"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
}

