// src/mail/templates/templates.ts
export const emailTemplates = {
  welcome: (
    name: string,
    dashboardUrl: string,
    unsubscribeToken: string,
    userEmail: string,
  ) => ({
    subject: 'Welcome to Skillar.ai',
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Skillar.ai - Start Your Learning Journey!</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            background-color: #667eea;
            margin: 0;
            padding: 40px 20px;
        }
        
        .email-wrapper {
            max-width: 600px;
            margin: 0 auto;
        }
        
        .email-container {
            background: white;
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            position: relative;
        }
        
        .corner-decoration {
            position: absolute;
            width: 200px;
            height: 200px;
            background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
            background-color: rgba(102, 126, 234, 0.1);
            border-radius: 50%;
            top: -100px;
            right: -100px;
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            background-color: #667eea;
            padding: 20px 30px 20px;
            text-align: center;
            color: white;
            position: relative;
            overflow: hidden;
        }
        
        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 200" opacity="0.1"><path d="M0,0 Q300,100 600,0 L600,200 L0,200 Z" fill="white"/></svg>');
            background-size: cover;
            background-color: #667eea;
        }
        
        .welcome-badge {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(10px);
            border-radius: 50px;
            padding: 12px 30px;
            display: inline-block;
            margin-bottom: 30px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            position: relative;
            z-index: 1;
        }
        
        .welcome-badge span {
            font-size: 14px;
            font-weight: 600;
            letter-spacing: 1px;
            text-transform: uppercase;
        }
        
        .logo-container {
            margin-bottom: 25px;
            position: relative;
            z-index: 1;
        }
        
        .logo-text {
            font-size: 42px;
            font-weight: 800;
            background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
            background-color: #e2e8f0;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            letter-spacing: -1px;
        }
        
        .logo-text .ai {
            font-size: 24px;
            vertical-align: super;
            margin-left: 2px;
        }
        
        .tagline {
            font-size: 18px;
            font-weight: 300;
            opacity: 0.95;
            max-width: 400px;
            margin: 0 auto;
            line-height: 1.5;
            position: relative;
            z-index: 1;
        }
        
        .content {
            padding: 50px 30px;
            position: relative;
        }
        
        .greeting-section {
            text-align: center;
            margin-bottom: 40px;
        }
        
        .greeting {
            font-size: 32px;
            font-weight: 700;
            color: #1e293b;
            margin-bottom: 15px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            background-color: #667eea;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .welcome-message {
            font-size: 18px;
            color: #475569;
            max-width: 500px;
            margin: 0 auto;
            line-height: 1.7;
        }
        
        .features-grid {
            display: grid !important;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)) !important;
            gap: 25px !important;
            margin: 50px 0 !important;
        }
        
        .feature-card {
            background: #f8fafc;
            border-radius: 16px;
            padding: 25px;
            text-align: center;
            border: 1px solid #e2e8f0;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .feature-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
        }
        
        .feature-icon {
            font-size: 48px;
            margin-bottom: 20px;
            display: inline-block;
        }
        
        .feature-title {
            font-size: 18px;
            font-weight: 600;
            color: #1e293b;
            margin-bottom: 12px;
        }
        
        .feature-description {
            font-size: 14px;
            color: #64748b;
            line-height: 1.6;
        }
        
        .getting-started {
            background-color: #f1f5f9;
            background: linear-gradient(135deg, #f0f4ff 0%, #f8f0ff 100%);
            border-radius: 20px;
            padding: 40px;
            margin: 40px 0;
            text-align: center;
            border: 1px solid #e2e8f0;
        }
        
        .getting-started-title {
            font-size: 24px;
            font-weight: 700;
            color: #1e293b;
            margin-bottom: 20px;
        }
        
        .step-list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin: 30px 0;
        }
        
        .step-item {
            background: white;
            border-radius: 12px;
            padding: 20px;
            text-align: center;
        }
        
        .step-number {
            width: 40px;
            height: 40px;
            background-color: #667eea;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 50%;
            text-align: center;
            line-height: 40px;
            margin: 0 auto 15px;
            font-weight: 700;
        }
        
        .step-text {
            font-size: 14px;
            color: #475569;
        }
        
        .primary-cta {
            display: inline-block;
            background-color: #059669;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: #ffffff !important;
            padding: 18px 50px;
            text-decoration: none;
            border-radius: 50px;
            font-weight: 600;
            font-size: 18px;
            margin: 20px 0 0;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            box-shadow: 0 8px 20px rgba(16, 185, 129, 0.2);
        }
        
        .primary-cta:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 25px rgba(16, 185, 129, 0.3);
            color: #ffffff !important;
        }
        
        .secondary-cta {
            display: inline-block;
            background: white;
            color: #667eea;
            padding: 14px 30px;
            text-decoration: none;
            border-radius: 50px;
            font-weight: 600;
            font-size: 16px;
            margin: 10px;
            border: 2px solid #667eea;
            transition: all 0.3s ease;
        }
        
        .secondary-cta:hover {
            background: #667eea;
            color: white;
        }
        
        .inspiration-quote {
            font-style: italic;
            text-align: center;
            color: #64748b;
            padding: 30px;
            margin: 40px 0;
            font-size: 16px;
            background: #f8fafc;
            border-radius: 16px;
            border-left: 4px solid #667eea;
        }
        
        .quote-author {
            display: block;
            margin-top: 10px;
            font-weight: 600;
            color: #475569;
        }
        
        .social-proof {
            background: #1e293b;
            color: white;
            padding: 40px;
            text-align: center;
            border-radius: 20px;
            margin: 40px 0 0;
        }
        
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 20px;
            margin: 30px 0;
        }
        
        .stat-item {
            text-align: center;
        }
        
        .stat-number {
            font-size: 36px;
            font-weight: 700;
            color: #10b981;
            margin-bottom: 5px;
        }
        
        .stat-label {
            font-size: 14px;
            opacity: 0.8;
        }
        
        .footer {
            background: #1e293b;
            color: #cbd5e1;
            padding: 20px 30px;
            text-align: center;
        }
        
        .footer-logo {
            font-size: 24px;
            font-weight: 700;
            color: white;
            margin-bottom: 15px;
        }
        
        .footer-tagline {
            font-size: 14px;
            opacity: 0.9;
            margin-bottom: 30px;
            max-width: 400px;
            margin-left: auto;
            margin-right: auto;
            font-weight: 300;
        }
        
        .contact-info {
            margin: 25px 0;
            padding: 20px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 12px;
        }
        
        .contact-info a {
            color: #cbd5e1;
            text-decoration: none;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            margin-bottom: 15px;
            transition: color 0.3s ease;
        }
        
        .contact-info a:hover {
            color: white;
        }
        
        .social-links {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin: 30px 0;
        }
        
        .social-icon {
            width: 44px;
            height: 44px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            display: inline-block;
            text-align: center;
            line-height: 44px;
            color: white;
            text-decoration: none;
            font-weight: 600;
            font-size: 18px;
            transition: transform 0.3s ease, background 0.3s ease;
        }
        
        .social-icon:hover {
            transform: translateY(-3px);
            background: #667eea;
        }
        
        .footer-links {
            margin: 10px 0;
        }
        
        .footer-links a {
            color: #cbd5e1;
            text-decoration: none;
            font-size: 14px;
            transition: color 0.3s ease;
        }
        
        .footer-links a:hover {
            color: white;
            text-decoration: underline;
        }
        
        .copyright {
            font-size: 12px;
            opacity: 0.6;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        @media (max-width: 1000px) {
            body {
                padding: 20px 10px;
            }
            
            .header {
                padding: 20px 20px 15px;
            }
            
            .content {
                padding: 30px 20px;
            }
            
            .logo-text {
                font-size: 36px;
            }
            
            .greeting {
                font-size: 28px;
            }
            
            .features-grid {
                grid-template-columns: 1fr;
            }
            
            .primary-cta {
                display: block;
                margin: 30px auto 0px;
                padding: 16px 30px;
                color: #ffffff !important;
            }
            
            .step-list {
                grid-template-columns: 1fr;
            }
            
            .contact-info {
                padding: 15px;
            }
        }

        @media (max-width: 600px) {
            .social-mobile-only {
                display: block !important;
            }
            .social-web-only {
                display: none !important;
            }
            .desktop-steps {
                display: none !important;
            }
            .mobile-steps {
                display: block !important;
            }
        }

        @media (min-width: 601px) {
            .desktop-steps {
                display: block !important;
            }
            .mobile-steps {
                display: none !important;
            }
        }
        
    </style>
</head>
<body>
    <div class="email-wrapper">
        <div class="email-container">
            
            <div class="header">
                <div class="welcome-badge">
                    <span>Welcome Aboard 🚀</span>
                </div>
                
                <div class="logo-container">
                <a href="${process.env.NEXT_PUBLIC_APP_URL}" target="_blank" rel="noopener noreferrer">
                    <img src="${process.env.NEXT_PUBLIC_APP_URL}/full-skillar-logo.png" alt="Skillar.ai Logo" class="logo-image logo-image-light" style="max-width: 180px; height: 60px; background-color: #ffffff;">
                </a>
                </div>
                
                <div class="tagline">
                    AI-powered learning platform that adapts to your goals and pace
                </div>
            </div>
            
            <div class="content">
                <div class="greeting-section">
                    <h1 class="greeting">Welcome to Skillar.ai, ${name}!</h1>
                    <p class="welcome-message">
                        We're thrilled to have you join our community of lifelong learners. 
                        Get ready to transform your skills with personalized, AI-powered learning paths.
                    </p>
                </div>
                
                <div class="features-grid">
                    <div class="feature-card">
                        <div class="feature-icon">🤖</div>
                        <h3 class="feature-title">AI-Powered Learning</h3>
                        <p class="feature-description">
                            Our AI adapts to your learning style and pace, creating personalized paths just for you.
                        </p>
                    </div>
                    
                    <div class="feature-card">
                        <div class="feature-icon">📊</div>
                        <h3 class="feature-title">Progress Tracking</h3>
                        <p class="feature-description">
                            Visualize your growth with detailed analytics and streak tracking.
                        </p>
                    </div>
                    
                    <div class="feature-card">
                        <div class="feature-icon">🎯</div>
                        <h3 class="feature-title">Smart Goals</h3>
                        <p class="feature-description">
                            Set and achieve your learning objectives with our intelligent goal-setting system.
                        </p>
                    </div>
                </div>
                
                <div class="getting-started">
                    <h2 class="getting-started-title">Let's Get Started!</h2>
                    <p style="color: #64748b; margin-bottom: 30px;">
                        Follow these simple steps to begin your learning journey:
                    </p>
                    
                    <!-- DESKTOP VERSION (3 columns) -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0; display: block;" class="desktop-steps">
                        <tr>
                            <td align="center" width="33%" style="padding: 10px;">
                                <table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;">
                                    <tr>
                                        <td align="center" height="160" style="padding: 20px; height: 160px;">
                                            <div class="step-number">1</div>
                                            <p class="step-text">Log into our platform</p>
                                        </td>
                                    </tr>
                                </table>
                            </td>

                            <td align="center" width="33%" style="padding: 10px;">
                                <table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;">
                                    <tr>
                                        <td align="center" height="160" style="padding: 20px; height: 160px;">
                                            <div class="step-number">2</div>
                                            <p class="step-text">Create your first learning roadmap</p>
                                        </td>
                                    </tr>
                                </table>
                            </td>

                            <td align="center" width="33%" style="padding: 10px;">
                                <table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;">
                                    <tr>
                                        <td align="center" height="160" style="padding: 20px; height: 160px;">
                                            <div class="step-number">3</div>
                                            <p class="step-text">Start your AI-generated roadmap</p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>

                    <!-- MOBILE VERSION (Stacked) -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0; display: none;" class="mobile-steps">
                        <tr>
                            <td align="center" style="padding: 10px 0;">
                                <table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px; margin-bottom: 15px;">
                                    <tr>
                                        <td align="center" style="padding: 20px; min-height: 140px;">
                                            <div class="step-number">1</div>
                                            <p class="step-text" style="margin: 10px 0 0; font-size: 14px;">Log into our platform</p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td align="center" style="padding: 10px 0;">
                                <table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px; margin-bottom: 15px;">
                                    <tr>
                                        <td align="center" style="padding: 20px; min-height: 140px;">
                                            <div class="step-number">2</div>
                                            <p class="step-text" style="margin: 10px 0 0; font-size: 14px;">Create your first learning roadmap</p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td align="center" style="padding: 10px 0;">
                                <table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;">
                                    <tr>
                                        <td align="center" style="padding: 20px; min-height: 140px;">
                                            <div class="step-number">3</div>
                                            <p class="step-text" style="margin: 10px 0 0; font-size: 14px;">Start your AI-generated roadmap</p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                    
                    <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" class="primary-cta">
                        Launch Your Dashboard →
                    </a>
                </div>
                
                <div class="inspiration-quote">
                    "The beautiful thing about learning is that nobody can take it away from you."
                    <span class="quote-author">— B.B. King</span>
                </div>
                
                <div class="social-proof">
                    <h2 style="color: white; font-size: 24px;">
                        Join Community of Successful Learners
                    </h2>
                </div>
            </div>
            
            <!-- Simplified Footer -->
            <div class="footer">
                <div class="footer-logo">Skillar.ai</div>
                <p class="footer-tagline">
                    Accelerating skills through AI-powered learning
                </p>
                
                <table
                    align="center"
                    width="100%"
                    cellpadding="0"
                    cellspacing="0"
                    style="max-width:600px;margin:30px auto;background:rgba(255,255,255,0.05);border-radius:12px;"
                    >
                    <!-- DESKTOP ROW -->
                    <tr>
                        <td align="center">

                        <!-- INNER TABLE -->
                        <table cellpadding="0" cellspacing="0" align="center">
                            <tr>

                            <!-- CONTACT INFO -->
                            <td
                                align="center"
                                valign="middle"
                                style="padding-right:25px;font-size:14px;white-space:nowrap;"
                            >
                                <a href="mailto:hello@skillar.ai"
                                style="color:#cbd5e1;text-decoration:none;">
                                ✉️ hello@skillar.ai
                                </a>
                                &nbsp;&nbsp;|&nbsp;&nbsp;
                                <a href="tel:+919256219292"
                                style="color:#cbd5e1;text-decoration:none;">
                                📞 +91 9256219292
                                </a>
                            </td>

                            <!-- SOCIAL ICONS -->
                            <td align="center" valign="middle" style="white-space:nowrap;" class="social-web-only">
                                <a href="https://www.linkedin.com/company/skillar-ai"
                                style="display:inline-block;width:40px;height:40px;
                                        line-height:40px;text-align:center;
                                        background:rgba(255,255,255,0.1);
                                        border-radius:50%;color:white;
                                        text-decoration:none;font-weight:600;
                                        margin-right:8px;">
                                in
                                </a>

                                <a href="https://instagram.com/skillar.ai"
                                style="display:inline-block;width:40px;height:40px;
                                        line-height:40px;text-align:center;
                                        background:rgba(255,255,255,0.1);
                                        border-radius:50%;color:white;
                                        text-decoration:none;">
                                📸
                                </a>
                            </td>

                            </tr>
                        </table>

                        </td>
                    </tr>

                    <!-- MOBILE STACK -->
                    <tr>
                        <td align="center" style="padding:10px 20px;display:none;" class="social-mobile-only">
                        <a href="https://www.linkedin.com/company/skillar-ai"
                            style="display:inline-block;width:40px;height:40px;
                                    line-height:40px;text-align:center;
                                    background:rgba(255,255,255,0.1);
                                    border-radius:50%;color:white;
                                    text-decoration:none;margin-right:8px;">
                            in
                        </a>

                        <a href="https://instagram.com/skillar.ai"
                            style="display:inline-block;width:40px;height:40px;
                                    line-height:40px;text-align:center;
                                    background:rgba(255,255,255,0.1);
                                    border-radius:50%;color:white;
                                    text-decoration:none;">
                            📸
                        </a>
                        </td>
                    </tr>
                </table>

                
                <div class="footer-links">
                    <a href="https://skillar.ai/privacy-policy" style="color: #cbd5e1; text-decoration: none; font-size: 14px;">
                        Privacy Policy
                    </a>
                </div>
                
                <div class="copyright">
                    © 2025 Skillar.ai. All rights reserved.<br>
                    <span style="font-size: 11px; opacity: 0.7;">
                        This email was sent to ${userEmail} as part of your Skillar.ai membership.
                    </span>
                    <div style="margin-top: 15px;">
                        <a href="${process.env.NEXT_PUBLIC_APP_URL}/unsubscribe/${unsubscribeToken}" style="color: #94a3b8; font-size: 12px; text-decoration: none;">
                            Unsubscribe from these emails
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`,
    text: `Welcome to Skillar.ai, ${name}!`,
  }),

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////

  otp: (otp: string) => ({
    subject: 'Skillar.ai | Verification OTP',
    html: `<div style="text-align: center; padding: 20px;">
  <h2>Your OTP Code</h2>
  <div style="font-size: 32px; font-weight: bold; color: #3182ce;">${otp}</div>
  <p>This code expires in 5 minutes.</p>
</div>`,
    text: `Your OTP is: ${otp}`,
  }),

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  streakReminder: (
    name: string,
    unsubscribeToken: string,
    userEmail: string,
    subject?: string,
    specialText?: string,
  ) => ({
    subject: subject || "Don't lose your streak! 🔥",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Keep Your Learning Streak Alive!</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f8fafc;
            margin: 0;
            padding: 20px;
        }
        
        .email-container {
            max-width: 1000px;
            margin: 0 auto;
            background: white;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            background-color: #667eea;
            padding: 20px 30px;
            text-align: center;
            color: white;
        }
        
        .logo-container {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 20px;
            width: 100%;
        }
        
        .logo-image {
            max-width: 180px;
            height: auto;
            object-fit: contain;
        }
        
        .logo-fallback {
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 10px;
            letter-spacing: -0.5px;
            color: white;
        }
        
        .tagline {
            font-size: 16px;
            opacity: 0.9;
            font-weight: 300;
        }
        
        .content {
            padding: 20px 30px;
        }
        
        .greeting {
            font-size: 24px;
            font-weight: 600;
            color: #1e293b;
            margin-bottom: 10px;
        }
        
        .user-name {
            color: #667eea;
        }
        
        .message {
            font-size: 16px;
            color: #475569;
            margin-bottom: 30px;
        }
        
        .streak-card {
            background: linear-gradient(to right, #fef3c7, #fde68a);
            background-color: #fde68a;
            border-radius: 12px;
            padding: 25px;
            margin: 30px 0;
            text-align: center;
            border: 1px solid #fbbf24;
        }
        
        .streak-icon {
            font-size: 48px;
            margin-bottom: 15px;
        }
        
        .streak-title {
            font-size: 20px;
            font-weight: 700;
            color: #92400e;
            margin-bottom: 10px;
        }
        
        .streak-description {
            color: #92400e;
            font-size: 15px;
            opacity: 0.9;
        }
        
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            background-color: #10b981;
            color: #ffffff !important;
            padding: 16px 40px;
            text-decoration: none;
            border-radius: 50px;
            font-weight: 600;
            font-size: 16px;
            margin: 20px 0;
            transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
        }
        
        .suggestions {
            background: #f1f5f9;
            border-radius: 12px;
            padding: 25px;
            margin: 30px 0;
        }
        
        .suggestions-title {
            font-size: 18px;
            font-weight: 600;
            color: #1e293b;
            margin-bottom: 15px;
        }
        
        .suggestion-item {
            display: flex;
            align-items: flex-start;
            margin-bottom: 12px;
        }
        
        .suggestion-icon {
            color: #667eea;
            margin-right: 10px;
            flex-shrink: 0;
        }
        
        .motivation-quote {
            font-style: italic;
            text-align: center;
            color: #64748b;
            padding: 20px;
            border-top: 1px solid #e2e8f0;
            margin-top: 30px;
            font-size: 15px;
        }
        
        .footer {
            background: #1e293b;
            color: #cbd5e1;
            padding: 20px 30px;
            text-align: center;
        }
        
        .footer-logo {
            font-size: 24px;
            font-weight: 700;
            color: white;
            margin-bottom: 15px;
        }
        
        .footer-tagline {
            font-size: 14px;
            opacity: 0.9;
            margin-bottom: 30px;
            max-width: 400px;
            margin-left: auto;
            margin-right: auto;
            font-weight: 300;
        }
        
        .contact-info {
            margin: 25px 0;
            padding: 20px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 12px;
        }
        
        .contact-info a {
            color: #cbd5e1;
            text-decoration: none;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            margin-bottom: 15px;
            transition: color 0.3s ease;
        }
        
        .contact-info a:hover {
            color: white;
        }
        
        .social-links {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin: 30px 0;
        }
        
        .social-icon {
            width: 44px;
            height: 44px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            display: inline-block;
            text-align: center;
            line-height: 44px;
            color: white;
            text-decoration: none;
            font-weight: 600;
            font-size: 18px;
            transition: transform 0.3s ease, background 0.3s ease;
        }
        
        .social-icon:hover {
            transform: translateY(-3px);
            background: #667eea;
        }
        
        .footer-links {
            margin: 0px;
        }
        
        .footer-links a {
            color: #cbd5e1;
            text-decoration: none;
            font-size: 14px;
            transition: color 0.3s ease;
        }
        
        .footer-links a:hover {
            color: white;
            text-decoration: underline;
        }
        
        .copyright {
            font-size: 12px;
            opacity: 0.6;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        @media (max-width: 1000px) {
            .content {
                padding: 30px 20px;
            }
            
            .header {
                padding: 18px 20px;
            }
            
            .greeting {
                font-size: 22px;
            }
            
            .cta-button {
                display: block;
                text-align: center;
                margin: 30px auto;
                color: #ffffff !important;
            }
            .step-list {
                grid-template-columns: 1fr;
            }
            .contact-info {
                padding: 15px;
            }
        }
        @media (max-width: 600px) {
            .social-mobile-only {
                display: block !important;
            }
            .social-web-only {
                display: none !important;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <div class="logo-container" style="text-align: left;">
                <!-- Light mode logo -->
                <img src="${process.env.NEXT_PUBLIC_APP_URL}/full-skillar-logo.png" alt="Skillar.ai Logo" class="logo-image logo-image-light" style="max-width: 180px; height: 60px; background-color: #ffffff;">
                
                <!-- Fallback text if images don't load -->
                <div class="logo-fallback" style="display: none;">📚 Skillar.ai</div>
            </div>
            <div class="tagline">Daily progress leads to mastery</div>
        </div>
        
        <div class="content">
            <h1 class="greeting">Hello <span class="user-name">${name || ''}</span>!</h1>
            
            <p class="message">
                We noticed you haven't logged any learning activity today. 
                Consistency is the key to mastery, and we're here to help you stay on track!
            </p>
            
            <div class="streak-card">
                <div class="streak-icon">🔥</div>
                <h2 class="streak-title">${specialText || "Don't Break Your Streak!"}</h2>
                <p class="streak-description">
                    Just 15-30 minutes of focused learning today will keep your momentum going. 
                    Your future self will thank you!
                </p>
            </div>
            
            <div style="text-align: center;">
                <a href="${process.env.APP_URL || ''}/dashboard" class="cta-button">
                    Log Today's Activity Now
                </a>
            </div>
            
            <div class="suggestions">
                <h3 class="suggestions-title">Quick Learning Ideas:</h3>
                
                <div class="suggestion-item">
                    <span class="suggestion-icon">🎯</span>
                    <span>Complete one step</span>
                </div>
                
                <div class="suggestion-item">
                    <span class="suggestion-icon">💡</span>
                    <span>Review what you have learned</span>
                </div>
                
                <div class="suggestion-item">
                    <span class="suggestion-icon">✍️</span>
                    <span>Engage in community discussions</span>
                </div>
            </div>
            
            <div class="motivation-quote">
                "The only way to learn is to do. The only way to master is to practice." 
                <br>— Richard Feynman
            </div>
        </div>
        
        <div class="footer">
                <div class="footer-logo">Skillar.ai</div>
                <p class="footer-tagline">
                    Accelerating skills through AI-powered learning
                </p>
                
                <!-- FOOTER CONTACT + SOCIAL -->
                <table
                    align="center"
                    width="100%"
                    cellpadding="0"
                    cellspacing="0"
                    style="max-width:600px;margin:30px auto;background:rgba(255,255,255,0.05);border-radius:12px;"
                    >
                    <!-- DESKTOP ROW -->
                    <tr>
                        <td align="center" style="padding:20px;">

                        <!-- INNER TABLE -->
                        <table cellpadding="0" cellspacing="0" align="center">
                            <tr>

                            <!-- CONTACT INFO -->
                            <td
                                align="center"
                                valign="middle"
                                style="padding-right:25px;font-size:14px;white-space:nowrap;"
                            >
                                <a href="mailto:hello@skillar.ai"
                                style="color:#cbd5e1;text-decoration:none;">
                                ✉️ hello@skillar.ai
                                </a>
                                &nbsp;&nbsp;|&nbsp;&nbsp;
                                <a href="tel:+919256219292"
                                style="color:#cbd5e1;text-decoration:none;">
                                📞 +91 9256219292
                                </a>
                            </td>

                            <!-- SOCIAL ICONS -->
                            <td align="center" valign="middle" style="white-space:nowrap;" class="social-web-only">
                                <a href="https://www.linkedin.com/company/skillar-ai"
                                style="display:inline-block;width:40px;height:40px;
                                        line-height:40px;text-align:center;
                                        background:rgba(255,255,255,0.1);
                                        border-radius:50%;color:white;
                                        text-decoration:none;font-weight:600;
                                        margin-right:8px;">
                                in
                                </a>

                                <a href="https://instagram.com/skillar.ai"
                                style="display:inline-block;width:40px;height:40px;
                                        line-height:40px;text-align:center;
                                        background:rgba(255,255,255,0.1);
                                        border-radius:50%;color:white;
                                        text-decoration:none;">
                                📸
                                </a>
                            </td>

                            </tr>
                        </table>

                        </td>
                    </tr>

                    <!-- MOBILE STACK -->
                    <tr>
                        <td align="center" style="padding:10px 20px;display:none;" class="social-mobile-only">
                        <a href="https://www.linkedin.com/company/skillar-ai"
                            style="display:inline-block;width:40px;height:40px;
                                    line-height:40px;text-align:center;
                                    background:rgba(255,255,255,0.1);
                                    border-radius:50%;color:white;
                                    text-decoration:none;margin-right:8px;">
                            in
                        </a>

                        <a href="https://instagram.com/skillar.ai"
                            style="display:inline-block;width:40px;height:40px;
                                    line-height:40px;text-align:center;
                                    background:rgba(255,255,255,0.1);
                                    border-radius:50%;color:white;
                                    text-decoration:none;">
                            📸
                        </a>
                        </td>
                    </tr>
                </table>
                
                <div class="footer-links">
                    <a href="https://skillar.ai/privacy-policy" style="color: #cbd5e1; text-decoration: none; font-size: 14px;">
                        Privacy Policy
                    </a>
                </div>
                
                <div class="copyright">
                    © 2025 Skillar.ai. All rights reserved.<br>
                    <span style="font-size: 11px; opacity: 0.7;">
                        This email was sent to ${userEmail} as part of your Skillar.ai membership.
                    </span>
                    <div style="margin-top: 15px;">
                        <a href="${process.env.NEXT_PUBLIC_APP_URL}/unsubscribe/${unsubscribeToken}" style="color: #94a3b8; font-size: 12px; text-decoration: none;">
                            Unsubscribe from these emails
                        </a>
                    </div>
                </div>
            </div>
    </div>
</body>
</html>`,
    text: `Hi ${name},\n\nYou haven't logged activity today. Keep your streak alive!`,
  }),
  engagementFollowup: ({
    name,
    message,
    unsubscribeToken,
    userEmail,
  }: {
    name: string;
    message: { subject: string; text: string };
    unsubscribeToken: string;
    userEmail: string;
  }) => ({
    subject: message.subject,
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${message.subject}</title>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap');

* {
  margin: 0; padding: 0; box-sizing: border-box;
}

body {
  background: #f8fafc;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  padding: 30px 10px;
  color: #1e293b;
}

.email-wrapper {
  max-width: 800px;
  margin: 0 auto;
}

.email-container {
  background: #ffffff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.06);
  position: relative;
}

.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-color: #667eea;
  padding: 25px 30px;
  text-align: center;
  color: white;
  position: relative;
}

.header::before {
  content: '';
  position: absolute;
  inset: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" opacity="0.1" viewBox="0 0 600 200"><path d="M0,0 Q300,100 600,0 L600,200 L0,200 Z" fill="white"/></svg>');
  background-size: cover;
}

.logo-container {
  position: relative;
  z-index: 3;
}

.logo-image {
  max-width: 170px;
  height: 45px;
  object-fit: contain;
}

.logo-fallback {
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -1px;
  display: none;
}

.tagline {
  position: relative;
  z-index: 3;
  margin-top: 10px;
  font-size: 15px;
  opacity: 0.9;
}

.content {
  padding: 40px 35px;
}

.greeting {
  font-size: 26px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 15px;
}

.highlight {
  color: #667eea;
}

.message-text {
  font-size: 17px;
  color: #475569;
  line-height: 1.7;
  margin-bottom: 30px;
}

.card {
  padding: 25px;
  background: #f1f5f9;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  margin-top: 20px;
}

.card-title {
  font-size: 20px;
  font-weight: 600;
  color: #334155;
  margin-bottom: 10px;
}

.card-body {
  font-size: 15px;
  color: #475569;
  line-height: 1.6;
}

.cta-container {
  text-align: center;
  margin-top: 35px;
}

.cta-button {
  display: inline-block;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  background-color: #10b981;
  color: white;
  padding: 16px 42px;
  border-radius: 40px;
  font-size: 17px;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 6px 16px rgba(16,185,129,0.25);
  transition: all .25s ease;
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 22px rgba(16,185,129,0.35);
}

.footer {
  background: #1e293b;
  padding: 40px 20px;
  text-align: center;
  color: #cbd5e1;
}

.footer-logo {
  font-size: 22px;
  font-weight: 700;
  color: white;
}

.footer-tagline {
  font-size: 14px;
  margin-top: 5px;
  margin-bottom: 25px;
  opacity: 0.9;
}

.contact-info div {
  margin-bottom: 12px;
}

.contact-info a {
  color: #cbd5e1;
  text-decoration: none;
  font-size: 14px;
  transition: .2s;
}

.contact-info a:hover {
  color: white;
}

.social-links {
  margin-top: 18px;
  display: flex;
  justify-content: center;
  gap: 12px;
}

.social-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255,255,255,0.1);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-size: 18px;
}

.footer-links {
  margin-top: 0px;
}

.footer-links a {
  color: #94a3b8;
  font-size: 13px;
  text-decoration: none;
}

.footer-links a:hover {
  text-decoration: underline;
}

.unsubscribe {
  margin-top: 22px;
  font-size: 12px;
  opacity: .65;
}

.copyright {
    font-size: 12px;
    opacity: 0.6;
    margin-top: 30px;
    padding-top: 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}


        @media (max-width: 600px) {
            .social-mobile-only {
                display: block !important;
            }
            .social-web-only {
                display: none !important;
            }
        }

</style>
</head>

<body>

<div class="email-wrapper">
  <div class="email-container">

    <!-- HEADER -->
    <div class="header">
      <div class="logo-container">
        <img src="${process.env.NEXT_PUBLIC_APP_URL}/full-skillar-logo.png"
             alt="Skillar.ai Logo"
             class="logo-image" height="60" style="background-color: #ffffff;" />

        <div class="logo-fallback">Skillar.ai</div>
      </div>
      <div class="tagline">
        Smarter learning starts with small steps.
      </div>
    </div>

    <!-- CONTENT -->
    <div class="content">

      <div class="greeting">
        Hey <span class="highlight">${name || 'there'}</span> 👋
      </div>

      <div class="message-text">
        ${message.text}
      </div>

      <div class="cta-container">
        <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://app.skillar.ai'}/dashboard"
           class="cta-button">
           Continue Learning →
        </a>
      </div>

    </div>

    <!-- FOOTER -->
    <div class="footer">
      <div class="footer-logo">Skillar.ai</div>
      <div class="footer-tagline">Accelerating skills through AI-powered learning</div>

      <table
                    align="center"
                    width="100%"
                    cellpadding="0"
                    cellspacing="0"
                    style="max-width:600px;margin:30px auto;background:rgba(255,255,255,0.05);border-radius:12px;"
                    >
                    <!-- DESKTOP ROW -->
                    <tr>
                        <td align="center" style="padding:20px;">

                        <!-- INNER TABLE -->
                        <table cellpadding="0" cellspacing="0" align="center">
                            <tr>

                            <!-- CONTACT INFO -->
                            <td
                                align="center"
                                valign="middle"
                                style="padding-right:25px;font-size:14px;white-space:nowrap;"
                            >
                                <a href="mailto:hello@skillar.ai"
                                style="color:#cbd5e1;text-decoration:none;">
                                ✉️ hello@skillar.ai
                                </a>
                                &nbsp;&nbsp;|&nbsp;&nbsp;
                                <a href="tel:+919256219292"
                                style="color:#cbd5e1;text-decoration:none;">
                                📞 +91 9256219292
                                </a>
                            </td>

                            <!-- SOCIAL ICONS -->
                            <td align="center" valign="middle" style="white-space:nowrap;" class="social-web-only">
                                <a href="https://www.linkedin.com/company/skillar-ai"
                                style="display:inline-block;width:40px;height:40px;
                                        line-height:40px;text-align:center;
                                        background:rgba(255,255,255,0.1);
                                        border-radius:50%;color:white;
                                        text-decoration:none;font-weight:600;
                                        margin-right:8px;">
                                in
                                </a>

                                <a href="https://instagram.com/skillar.ai"
                                style="display:inline-block;width:40px;height:40px;
                                        line-height:40px;text-align:center;
                                        background:rgba(255,255,255,0.1);
                                        border-radius:50%;color:white;
                                        text-decoration:none;">
                                📸
                                </a>
                            </td>

                            </tr>
                        </table>

                        </td>
                    </tr>

                    <!-- MOBILE STACK -->
                    <tr>
                        <td align="center" style="padding:10px 20px;display:none;" class="social-mobile-only">
                        <a href="https://www.linkedin.com/company/skillar-ai"
                            style="display:inline-block;width:40px;height:40px;
                                    line-height:40px;text-align:center;
                                    background:rgba(255,255,255,0.1);
                                    border-radius:50%;color:white;
                                    text-decoration:none;margin-right:8px;">
                            in
                        </a>

                        <a href="https://instagram.com/skillar.ai"
                            style="display:inline-block;width:40px;height:40px;
                                    line-height:40px;text-align:center;
                                    background:rgba(255,255,255,0.1);
                                    border-radius:50%;color:white;
                                    text-decoration:none;">
                            📸
                        </a>
                        </td>
                    </tr>
                </table>

      <div class="footer-links">
        <a href="https://skillar.ai/privacy-policy" style="color: #cbd5e1; text-decoration: none; font-size: 14px;">Privacy Policy</a>
      </div>

      <div class="copyright">
                    © 2025 Skillar.ai. All rights reserved.<br>
                    <span style="font-size: 11px; opacity: 0.7;">
                        This email was sent to ${userEmail} as part of your Skillar.ai membership.
                    </span>
                    <div style="margin-top: 15px;">
                        <a href="${process.env.NEXT_PUBLIC_APP_URL}/unsubscribe/${unsubscribeToken}" style="color: #94a3b8; font-size: 12px; text-decoration: none;">
                            Unsubscribe from these emails
                        </a>
                    </div>
                </div>
    </div>

  </div>
</div>

</body>
</html>
`,
    text: `${message.text}`,
  }),
};
