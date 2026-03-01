import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import styles from '../../styles/LoginForm.module.css';
import { useState } from 'react';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.formWrapper}>
      <div className={styles.formContainer}>
        {/* Header */}
        <div className={styles.formHeader}>
          <h1 className={styles.formTitle}>Welcome Back</h1>
          <p className={styles.formSubtitle}>Sign in to your Ayyinai account</p>
        </div>

        {/* Form */}
        <form className={styles.form}>
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
                placeholder="Enter your password" 
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
          Don't have an account? <a href="/register" className={styles.signUpLink}>Sign up</a>
        </p>
      </div>
    </div>
  );
}
