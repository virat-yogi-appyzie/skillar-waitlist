"use client";

import { useState, useEffect } from "react";
import { submitToWaitlist, getWaitlistCount, type WaitlistSubmissionResult } from "@/lib/actions";

interface CaptchaQuestion {
  question: string;
  answer: number;
}

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [captchaQuestion, setCaptchaQuestion] = useState<CaptchaQuestion>({
    question: "",
    answer: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [userPosition, setUserPosition] = useState<number>(0);
  const [errors, setErrors] = useState({
    email: "",
    captcha: "",
    general: "",
  });

  // Generate a simple math captcha
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operators = ['+', '-', '*'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    
    let question = "";
    let answer = 0;
    
    switch (operator) {
      case '+':
        question = `${num1} + ${num2} = ?`;
        answer = num1 + num2;
        break;
      case '-':
        question = `${num1} - ${num2} = ?`;
        answer = num1 - num2;
        break;
      case '*':
        question = `${num1} × ${num2} = ?`;
        answer = num1 * num2;
        break;
    }
    
    setCaptchaQuestion({ question, answer });
    setCaptcha("");
  };

  // Load total users count on component mount
  useEffect(() => {
    const loadWaitlistCount = async () => {
      try {
        const count = await getWaitlistCount();
        setTotalUsers(count);
      } catch (error) {
        console.error('Error loading waitlist count:', error);
      }
    };

    generateCaptcha();
    loadWaitlistCount();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    setErrors({ email: "", captcha: "", general: "" });

    try {
      const captchaAnswer = parseInt(captcha);
      
      // Call server action
      const result: WaitlistSubmissionResult = await submitToWaitlist(
        email,
        captchaAnswer,
        captchaQuestion.answer,
        'waitlist-form'
      );

      if (result.success) {
        // Store user position and total users for success message
        if (result.userPosition) setUserPosition(result.userPosition);
        if (result.totalUsers) setTotalUsers(result.totalUsers);
        
        // Show success message
        setShowSuccess(true);
        
        // Reset form
        setEmail("");
        setCaptcha("");
        generateCaptcha();
      } else {
        // Handle validation errors
        if (result.errors) {
          setErrors({
            email: result.errors.email || "",
            captcha: result.errors.captcha || "",
            general: result.errors.general || "",
          });
        } else {
          setErrors({
            email: "",
            captcha: "",
            general: result.message || "Something went wrong. Please try again.",
          });
        }
        
        // Regenerate captcha on error
        if (result.errors?.captcha) {
          generateCaptcha();
        }
      }
    } catch (error) {
      console.error('Submission error:', error);
      setErrors({
        email: "",
        captcha: "",
        general: "Something went wrong. Please try again.",
      });
      generateCaptcha();
    } finally {
      setIsLoading(false);
    }
  };

  // Reset success message and show form again
  const resetForm = () => {
    setShowSuccess(false);
    generateCaptcha();
    // Reload waitlist count when returning to form
    getWaitlistCount().then(setTotalUsers).catch(console.error);
  };

  if (showSuccess) {
    return (
      <section id="waitlist" className="waitlist">
        <div className="container">
          <div className="waitlist-content">
            <div className="success-message show">
              <div className="success-icon">✓</div>
              <h3>Welcome to Skillar.ai!</h3>
              <p>Thanks for joining our waitlist. We&apos;ll notify you when we launch!</p>
              {userPosition > 0 && (
                <div className="user-position" style={{ 
                  margin: 'var(--space-16) 0',
                  padding: 'var(--space-12)',
                  background: 'rgba(99, 102, 241, 0.1)',
                  borderRadius: 'var(--border-radius)',
                  border: '1px solid rgba(99, 102, 241, 0.2)'
                }}>
                  <p style={{ 
                    color: '#6366f1',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    marginBottom: 'var(--space-8)'
                  }}>
                    🎉 You&apos;re #{userPosition} on the waitlist!
                  </p>
                  
                </div>
              )}
              <button
                onClick={resetForm}
                className="btn btn--outline"
                style={{ marginTop: 'var(--space-16)' }}
              >
                Join Another Email
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="waitlist" className="waitlist">
      <div className="container">
        <div className="waitlist-content">
          <h2 className="section-title">Join the Waitlist</h2>
          <p className="waitlist-description">
            Be among the first to experience the future of AI-powered learning
          </p>
          
          {/* Show total users count if greater than 0 */}
          {totalUsers > 0 && (
            <div className="waitlist-stats" style={{
              textAlign: 'center',
              margin: 'var(--space-24) 0',
              padding: 'var(--space-16)',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: 'var(--border-radius)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <p style={{
                color: 'var(--color-primary)',
                fontSize: '1.2rem',
                fontWeight: '600',
                marginBottom: 'var(--space-4)'
              }}>
                🚀 {totalUsers.toLocaleString()} users already joined!
              </p>
              <p style={{
                color: 'var(--color-text-secondary)',
                fontSize: '0.9rem'
              }}>
                Join others waiting for early access
              </p>
            </div>
          )}
          
          <form className="waitlist-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="your@email.com"
                required
              />
              {errors.email && (
                <div className="error-message show">
                  {errors.email}
                </div>
              )}
            </div>

            {/* CAPTCHA */}
            <div className="form-group captcha-group">
              <label htmlFor="captcha" className="form-label">
                Verify you&apos;re human
              </label>
              <div className="captcha-container">
                <span className="captcha-question">
                  {captchaQuestion.question}
                </span>
                <button
                  type="button"
                  onClick={generateCaptcha}
                  className="captcha-refresh"
                  title="Refresh captcha"
                >
                  ↻
                </button>
              </div>
              <input
                type="number"
                id="captcha"
                name="captcha"
                value={captcha}
                onChange={(e) => setCaptcha(e.target.value)}
                className="form-control"
                placeholder="Enter answer"
                required
              />
              {errors.captcha && (
                <div className="error-message show">
                  {errors.captcha}
                </div>
              )}
            </div>

            {/* General Error */}
            {errors.general && (
              <div className="error-message show" style={{ marginBottom: 'var(--space-16)' }}>
                {errors.general}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn--primary btn--full-width"
            >
              <span className={`btn-text ${isLoading ? 'hidden' : ''}`}>
                Join the Waitlist
              </span>
              <span className={`btn-loading ${isLoading ? '' : 'hidden'}`}>
                Processing...
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}