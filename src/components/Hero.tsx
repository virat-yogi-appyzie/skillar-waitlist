"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const [stats, setStats] = useState({
    learners: 0,
    speedMultiplier: 0,
    successRate: 0,
  });

  useEffect(() => {
    // Animate the statistics numbers when component mounts
    const animateStats = () => {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;
      
      let currentStep = 0;
      
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setStats({
          learners: Math.floor(10000 * progress),
          speedMultiplier: Math.floor(3 * progress * 10) / 10,
          successRate: Math.floor(95 * progress),
        });
        
        if (currentStep >= steps) {
          clearInterval(timer);
          setStats({ learners: 10000, speedMultiplier: 3, successRate: 95 });
        }
      }, stepDuration);
      
      return () => clearInterval(timer);
    };

    const timeoutId = setTimeout(animateStats, 500);
    return () => clearTimeout(timeoutId);
  }, []);

  const scrollToWaitlist = () => {
    const element = document.getElementById("waitlist");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            Accelerate your career with{" "}
            <span className="gradient-text">AI-powered learning</span>
          </h1>

          <p className="hero-description">
            Join thousands of professionals who&apos;ve 3x their skill development speed 
            with personalized AI coaching that adapts to your unique learning style.
          </p>

          <Button 
            onClick={scrollToWaitlist}
            className="btn btn--primary btn--lg mb-8"
          >
            Join the Waitlist
          </Button>

          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">
                {stats.learners >= 1000 ? `${Math.floor(stats.learners / 1000)}K+` : stats.learners}
              </span>
              <span className="stat-label">
                Active Learners
              </span>
            </div>
            <div className="stat">
              <span className="stat-number">
                {stats.speedMultiplier}x
              </span>
              <span className="stat-label">
                Faster Learning
              </span>
            </div>
            <div className="stat">
              <span className="stat-number">
                {stats.successRate}%
              </span>
              <span className="stat-label">
                Success Rate
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}