"use client";

import { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { submitToWaitlist, type WaitlistSubmissionResult } from "@/lib/actions";
import { DiscoveryCombobox } from "@/components/ui/discovery-combobox";
import { useWaitlist } from "@/lib/waitlist-context";

export default function Waitlist() {
  const { waitlistCount, incrementWaitlistCount } = useWaitlist();
  const [email, setEmail] = useState("");
  const [discoverySource, setDiscoverySource] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [userPosition, setUserPosition] = useState<number>(0);
  const [errors, setErrors] = useState({
    email: "",
    discoverySource: "",
    recaptcha: "",
    general: "",
  });
  
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  // Handle reCAPTCHA change
  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
    if (token && errors.recaptcha) {
      setErrors(prev => ({ ...prev, recaptcha: "" }));
    }
  };

  // Reset reCAPTCHA
  const resetRecaptcha = () => {
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
    }
    setRecaptchaToken(null);
  };

  // Handle discovery source change
  const handleDiscoverySourceChange = (value: string) => {
    setDiscoverySource(value);
    if (value && errors.discoverySource) {
      setErrors(prev => ({ ...prev, discoverySource: "" }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    setErrors({ email: "", discoverySource: "", recaptcha: "", general: "" });

    // Validate discovery source
    if (!discoverySource) {
      setErrors(prev => ({ ...prev, discoverySource: "Please select how you discovered us" }));
      setIsLoading(false);
      return;
    }

    // Validate reCAPTCHA token
    if (!recaptchaToken) {
      setErrors(prev => ({ ...prev, recaptcha: "Please complete the reCAPTCHA verification" }));
      setIsLoading(false);
      return;
    }

    try {
      // Call server action with reCAPTCHA token and discovery source
      const result: WaitlistSubmissionResult = await submitToWaitlist(
        email,
        recaptchaToken,
        'waitlist-form',
        discoverySource
      );

      if (result.success) {
        // Store user position for success message
        if (result.userPosition) setUserPosition(result.userPosition);
        
        // Update the shared waitlist count immediately
        incrementWaitlistCount();
        
        // Show success message
        setShowSuccess(true);
        
        // Reset form
        setEmail("");
        setDiscoverySource("");
        resetRecaptcha();
      } else {
        // Handle validation errors
        if (result.errors) {
          setErrors({
            email: result.errors.email || "",
            discoverySource: "",
            recaptcha: result.errors.recaptcha || "",
            general: result.errors.general || "",
          });
        } else {
          setErrors({
            email: "",
            discoverySource: "",
            recaptcha: "",
            general: result.message || "Something went wrong. Please try again.",
          });
        }
        
        // Reset reCAPTCHA on error
        if (result.errors?.recaptcha) {
          resetRecaptcha();
        }
      }
    } catch (error) {
      console.error('Submission error:', error);
      setErrors({
        email: "",
        discoverySource: "",
        recaptcha: "",
        general: "Something went wrong. Please try again.",
      });
      resetRecaptcha();
    } finally {
      setIsLoading(false);
    }
  };

  // Reset success message and show form again
  const resetForm = () => {
    setShowSuccess(false);
    resetRecaptcha();
    // No need to reload waitlist count - it's managed by the shared context
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
          {waitlistCount > 0 && (
            <div className="waitlist-stats" style={{
              textAlign: 'center',
              margin: 'var(--space-24) 0',
              padding: 'var(--space-12) var(--space-16)',
              background: 'var(--bg-card)',
              borderRadius: 'var(--radius-base)',
              border: '1px solid var(--border-color)'
            }}>
              <p style={{
                color: 'var(--color-primary)',
                fontSize: '1.2rem',
                fontWeight: '600',
                marginBottom: 'var(--space-4)'
              }}>
                🚀 {waitlistCount.toLocaleString()} users already joined!
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
                Email Address*
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

            <div className="form-group">
              <label htmlFor="discovery-source" className="form-label">
                How did you discover us?*
              </label>
              <DiscoveryCombobox
                value={discoverySource}
                onChange={handleDiscoverySourceChange}
                placeholder="Please choose an option"
                className="form-control"
              />
              {errors.discoverySource && (
                <div className="error-message show">
                  {errors.discoverySource}
                </div>
              )}
            </div>

            {/* Google reCAPTCHA */}
            <div className="form-group">
              <label className="form-label">
                Verify you&apos;re human
              </label>
              <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                  onChange={handleRecaptchaChange}
                  theme="dark" // You can change this to "light" if needed
                />
              </div>
              {errors.recaptcha && (
                <div className="error-message show">
                  {errors.recaptcha}
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