"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Link href="/">
              <h2>Skillar.ai</h2>
            </Link>
          </div>
          <nav className="nav">
            <a href="#features" onClick={(e) => { e.preventDefault(); scrollToSection("features"); }}>
              Features
            </a>
            <a href="#testimonials" onClick={(e) => { e.preventDefault(); scrollToSection("testimonials"); }}>
              Testimonials
            </a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection("contact"); }}>
              Contact
            </a>
            <Button asChild className="btn btn--primary btn--lg">
              <a className="nav-cta" href="https://app.skillar.ai/" target="_blank" rel="noopener noreferrer">Login / Signup</a>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}