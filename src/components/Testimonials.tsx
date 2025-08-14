"use client";

export default function Testimonials() {
  return (
    <section id="testimonials" className="testimonials">
      <div className="container">
        <h2 className="section-title">What led to Skillar.ai</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>&ldquo;I&apos;ve been struggling with traditional learning methods that don&apos;t adapt to my pace. I need a more personalized approach that can accelerate my skill development in today&apos;s fast-changing tech landscape.&rdquo;</p>
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
              <p>&ldquo;The challenge of keeping up with rapidly evolving technologies while managing a full-time job is overwhelming. I need a solution that maximizes learning efficiency and fits into my busy schedule.&rdquo;</p>
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