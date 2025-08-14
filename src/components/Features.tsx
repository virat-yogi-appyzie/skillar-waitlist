import { Target, Zap, Award } from "lucide-react";

export default function Features() {
  return (
    <section id="features" className="features">
      <div className="container">
        <h2 className="section-title">Powerful Features for Modern Learners</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <Target size={48} color="#ff6b6b" />
            </div>
            <h3 className="feature-title">Adaptive AI Coach</h3>
            <p className="feature-description">
              Your personal AI learns how you progress and creates optimized learning paths just for you.
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <Zap size={48} color="#ffd93d" />
            </div>
            <h3 className="feature-title">Hyper-Speed Learning</h3>
            <p className="feature-description">
              Advanced algorithms compress months of learning into weeks with optimized spaced repetition.
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <Award size={48} color="#6bcf7f" />
            </div>
            <h3 className="feature-title">Skill-Focused Paths</h3>
            <p className="feature-description">
              Personalized learning journeys aligned with your specific skill goals and industry demands.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}