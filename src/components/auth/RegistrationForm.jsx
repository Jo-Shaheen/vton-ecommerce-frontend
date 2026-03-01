import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import styles from '../../styles/RegistrationForm.module.css';
import { useState } from 'react';

export default function RegistrationForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className={styles.formWrapper}>
      <div className={styles.formContainer}>
        {/* Header */}
        <div className={styles.formHeader}>
          <h1 className={styles.formTitle}>Create Account</h1>
          <p className={styles.formSubtitle}>Join Ayyinai and discover luxury fashion</p>
        </div>

        {/* Form */}
        <form className={styles.form}>
          {/* Full Name Field */}
          <div className={styles.formGroup}>
            <label htmlFor="fullName" className={styles.label}>Full Name</label>
            <div className={styles.inputWrapper}>
              <User className={styles.inputIcon} size={20} />
              <input 
                id="fullName"
                type="text" 
                placeholder="Your full name" 
                className={styles.input}
              />
            </div>
          </div>

          {/* Email Field */}
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>Email Address</label>
            <div className={styles.inputWrapper}>
              <Mail className={styles.inputIcon} size={20} />
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
              <Lock className={styles.inputIcon} size={20} />
              <input 
                id="password"
                type={showPassword ? 'text' : 'password'} 
                placeholder="Create a strong password" 
                className={styles.input}
              />
              <button
                type="button"
                className={styles.togglePassword}
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>Confirm Password</label>
            <div className={styles.inputWrapper}>
              <Lock className={styles.inputIcon} size={20} />
              <input 
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'} 
                placeholder="Confirm your password" 
                className={styles.input}
              />
              <button
                type="button"
                className={styles.togglePassword}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label="Toggle password visibility"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Terms */}
          <div className={styles.termsWrapper}>
            <label className={styles.termsLabel}>
              <input type="checkbox" className={styles.checkbox} />
              <span>
                I agree to the <a href="#" className={styles.termsLink}>Terms & Conditions</a> and 
                <a href="#" className={styles.termsLink}> Privacy Policy</a>
              </span>
            </label>
          </div>

          {/* Sign Up Button */}
          <button type="submit" className={styles.submitButton}>
            Create Account
          </button>
        </form>

        {/* Divider */}
        <div className={styles.divider}>
          <span>Or sign up with</span>
        </div>

        {/* Social Register */}
        <div className={styles.socialButtons}>
          <button className={styles.socialButton}>
            <span>Google</span>
          </button>
          <button className={styles.socialButton}>
            <span>Apple</span>
          </button>
        </div>

        {/* Sign In Link */}
        <p className={styles.signInPrompt}>
          Already have an account? <a href="/login" className={styles.signInLink}>Sign in</a>
        </p>
      </div>
    </div>
  );
}
