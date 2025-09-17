"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useWaitlist } from "@/lib/waitlist-context";

export default function Hero() {
  const { waitlistCount } = useWaitlist();
  const [stats, setStats] = useState({
    waitlistUsers: 0,
    speedMultiplier: 0,
    aiPowered: 0,
  });

  useEffect(() => {
    // Animate the statistics numbers when waitlistCount changes
    const animateStats = () => {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;
      
      let currentStep = 0;
      
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setStats({
          waitlistUsers: Math.floor(waitlistCount * progress),
          speedMultiplier: Math.floor(3 * progress * 10) / 10,
          aiPowered: Math.floor(100 * progress),
        });
        
        if (currentStep >= steps) {
          clearInterval(timer);
          setStats({ waitlistUsers: waitlistCount, speedMultiplier: 3, aiPowered: 100 });
        }
      }, stepDuration);
      
      return () => clearInterval(timer);
    };

    // Only start animation if we have a waitlist count
    if (waitlistCount > 0) {
      const timeoutId = setTimeout(animateStats, 500);
      return () => clearTimeout(timeoutId);
    } else {
      // If no count loaded yet, show 0
      setStats({ waitlistUsers: 0, speedMultiplier: 3, aiPowered: 100 });
    }
  }, [waitlistCount]);

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            Accelerate your skills with{" "}
            <br />
            <span className="gradient-text">AI-powered learning</span>
          </h1>

          <p className="hero-description">
            Join thousands of professionals who will 3x their skill development speed 
            with personalized learning journeys aligned with your specific skill goals and industry demands.
          </p>

          <Button asChild className="btn btn--primary btn--lg mb-8">
            <a href="https://app.skillar.ai/" target="_blank" rel="noopener noreferrer">Go to Skillar</a>
          </Button>

          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">
                {stats.waitlistUsers >= 1000 ? `${Math.floor(stats.waitlistUsers / 1000)}K+` : stats.waitlistUsers}
              </span>
              <span className="stat-label">
                Waitlist Users
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
                {stats.aiPowered}%
              </span>
              <span className="stat-label">
                AI Powered
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}