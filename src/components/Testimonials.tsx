"use client";

import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";

export default function Testimonials() {
  return (
    <section id="testimonials" className="testimonials">
      <div className="container">
        <h2 className="section-title">What Our Learners Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>&ldquo;I&apos;ve transformed my career trajectory. I went from struggling with complex concepts to mastering new frameworks in weeks, not months.&rdquo;</p>
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
              <p>&ldquo;The personalized learning paths are game-changing! My specific learning style drives&mdash;changing to professional development.&rdquo;</p>
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