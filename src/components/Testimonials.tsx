"use client";

import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";

interface TestimonialCardProps {
  content: string;
  authorName: string;
  authorTitle: string;
  authorInitials: string;
  delay?: number;
}

function TestimonialCard({ 
  content, 
  authorName, 
  authorTitle, 
  authorInitials, 
  delay = 0 
}: TestimonialCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("slide-up");
          }, delay);
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div 
      ref={cardRef}
      className="opacity-0 translate-y-8"
    >
      <Card className="testimonial-card p-8 hover:shadow-2xl hover:shadow-accent-blue/5 transition-all duration-300 group">
        <div className="mb-6">
          <p className="text-lg leading-relaxed text-text-secondary italic group-hover:text-text-primary transition-colors duration-300">
            "{content}"
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold text-sm">
            {authorInitials}
          </div>
          <div>
            <div className="font-semibold text-text-primary">
              {authorName}
            </div>
            <div className="text-sm text-text-secondary">
              {authorTitle}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="testimonials">
      <div className="container">
        <h2 className="section-title">What Our Learners Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>"I've transformed my career trajectory. I went from struggling with complex concepts to mastering new frameworks in weeks, not months."</p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">SC</div>
              <div className="author-info">
                <div className="author-name">Sarah Chen</div>
                <div className="author-title">Software Engineer</div>
              </div>
            </div>
          </div>
          
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>"The personalized learning paths are game-changing! My specific learning style drives—changing to professional development."</p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">MR</div>
              <div className="author-info">
                <div className="author-name">Marcus Rodriguez</div>
                <div className="author-title">Product Manager</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}