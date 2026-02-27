 "use client";

 import type React from "react";
 import Link from "next/link";
 import { usePathname } from "next/navigation";
 import { Button } from "@/components/ui/button";

 export default function Header() {
   const pathname = usePathname();

   const scrollToSection = (sectionId: string) => {
     const element = document.getElementById(sectionId);
     if (element) {
       element.scrollIntoView({ behavior: "smooth" });
     }
   };

   const handleNavClick = (
     e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
     sectionId: string
   ) => {
     if (pathname === "/") {
       e.preventDefault();
       scrollToSection(sectionId);
     }
     // If not on home, allow default navigation to "/#sectionId"
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
             <Button
               asChild
               variant="outline"
               className="relative mr-4 inline-flex items-center gap-2 rounded-full border border-primary-300/80 bg-gradient-to-r from-primary-300/10 via-primary-300/5 to-background-secondary px-4 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-primary-100 shadow-sm hover:from-primary-300/20 hover:via-primary-300/10 hover:to-background-secondary/80 hover:shadow-primary-300/30"
             >
               <Link href="/skills-gap-diagnostic" className="relative inline-flex items-center gap-2">
                 <span>AI Skills Gap Lab</span>
                 <span className="absolute -right-2 -top-2 inline-flex items-center rounded-full bg-gradient-primary px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-white shadow-lg shadow-primary-300/40">
                   New
                 </span>
               </Link>
             </Button>
             <Link
               href="/#features"
               onClick={(e) => handleNavClick(e, "features")}
             >
               Features
             </Link>
             <Link
               href="/#testimonials"
               onClick={(e) => handleNavClick(e, "testimonials")}
             >
               Testimonials
             </Link>
             <Link
               href="/#contact"
               onClick={(e) => handleNavClick(e, "contact")}
             >
               Contact
             </Link>
             <Button asChild className="btn btn--primary btn--lg">
               <a
                 className="nav-cta"
                 href="https://app.skillar.ai/"
                 target="_blank"
                 rel="noopener noreferrer"
               >
                 Login / Signup
               </a>
             </Button>
           </nav>
         </div>
       </div>
     </header>
   );
 }