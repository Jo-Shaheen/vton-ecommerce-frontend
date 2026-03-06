import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, ShoppingBag, Scan } from 'lucide-react';
import { Link } from 'react-router-dom';
import AinaiLogo from '../common/AinaiLogo';
import styles from '../../styles/LoginForm.module.css';

export default function LoginForm() {
  return (
    <div className={styles.formWrapper}>
      {/* Left brand panel */}
      <div className={styles.brandPanel}>
        <div className={styles.brandContent}>
          <AinaiLogo size="lg" variant="dark" showTagline={false} />

          <p className={styles.brandTagline}>
            Experience fashion like never before with <strong>AI-powered virtual try-on</strong>
          </p>

          <ul className={styles.brandFeatures}>
            <li className={styles.brandFeature}>
              <span className={styles.featureIcon}><Scan size={14} /></span>
              Virtual try-on technology
            </li>
            <li className={styles.brandFeature}>
              <span className={styles.featureIcon}><ShoppingBag size={14} /></span>
              Premium MENA fashion
            </li>
            <li className={styles.brandFeature}>
              <span className={styles.featureIcon}><Sparkles size={14} /></span>
              AI-curated recommendations
            </li>
          </ul>
        </div>
      </div>

      {/* Right form panel */}
      <div className={styles.formPanel}>
        <div className={styles.formContainer}>
          {/* Header */}
          <div className={styles.formHeader}>
            <p className={styles.formGreeting}>
              <span className={styles.wave}>&#x1F44B;</span> Welcome back
            </p>
            <h1 className={styles.formTitle}>Sign In</h1>
            <p className={styles.formSubtitle}>Enter your credentials to access your account</p>
          </div>

          {/* Form */}
          <form className={styles.form}>
            {/* Email Field */}
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>Email Address</label>
              <div className={styles.inputWrapper}>
                <Mail className={styles.inputIcon} size={18} />
                <input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className={styles.input}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>Password</label>
              <div className={styles.inputWrapper}>
                <Lock className={styles.inputIcon} size={18} />
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className={styles.input}
                />
                <button
                  type="button"
                  className={styles.togglePassword}
                  aria-label="Toggle password visibility"
                >
                  <Eye size={18} />
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className={styles.rememberForgot}>
              <label className={styles.rememberLabel}>
                <input type="checkbox" className={styles.checkbox} />
                <span>Remember me</span>
              </label>
              <a href="#" className={styles.forgotLink}>Forgot password?</a>
            </div>

            {/* Sign In Button */}
            <button type="submit" className={styles.submitButton}>
              Sign In
              <ArrowRight size={18} className={styles.btnArrow} />
            </button>
          </form>

          {/* Divider */}
          <div className={styles.divider}>
            <span>Or continue with</span>
          </div>

          {/* Social Login */}
          <div className={styles.socialButtons}>
            <button className={styles.socialButton}>
              <span>Google</span>
            </button>
            <button className={styles.socialButton}>
              <span>Apple</span>
            </button>
          </div>

          {/* Sign Up Link */}
          <p className={styles.signUpPrompt}>
            Don't have an account?{' '}
            <Link to="/auth" className={styles.signUpLink}>Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
