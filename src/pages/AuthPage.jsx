import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, Eye, EyeOff, ArrowLeft } from "lucide-react";
import AinaiLogo from "../components/common/AinaiLogo";
import styles from "../styles/AuthPage.module.css";
import { loginUser, registerUser } from "../utils/authFunctions";
import { useAuth } from "../context/AuthContext";

/* ─────────────────────────────────────────────
   AuthPage – Login / Sign-Up
   Auth logic wired to form handlers below.
───────────────────────────────────────────── */

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login"); // 'login' | 'signup'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Login form state
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginMessage, setLoginMessage] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Signup form state
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [signupMessage, setSignupMessage] = useState("");
  const [signupLoading, setSignupLoading] = useState(false);

  const navigate = useNavigate();
  const { login: _login } = useAuth();

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginMessage("");
    const result = await loginUser(loginData.email, loginData.password);
    setLoginMessage(result.output);
    if (result.status) {
      // Placeholder: Set user and token from API response
      // login({ email: loginData.email }, result.token);
      navigate("/profile");
    }
    setLoginLoading(false);
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setSignupLoading(true);
    setSignupMessage("");
    if (signupData.password !== signupData.confirmPassword) {
      setSignupMessage("Passwords do not match.");
      setSignupLoading(false);
      return;
    }
    const result = await registerUser(
      signupData.name,
      signupData.email,
      signupData.password,
    );
    setSignupMessage(result.output);
    if (result.status) {
      // Placeholder: Set user and token from API response
      // login({ name: signupData.name }, result.token);
      navigate("/profile");
    }
    setSignupLoading(false);
  };

  return (
    <div className={styles.pageWrapper}>
      {/* ── Left Panel — Brand / Illustration ── */}
      <aside className={styles.brandPanel}>
        <div className={styles.brandContent}>
          <Link to="/" className={styles.backHome}>
            <ArrowLeft size={18} />
            <span>Back to store</span>
          </Link>

          <div className={styles.brandLogo}>
            <AinaiLogo size="lg" variant="dark" showTagline={false} />
          </div>

          <h2 className={styles.brandTagline}>
            See Yourself <span>Differently</span>
          </h2>
          <p className={styles.brandDescription}>
            Experience luxury MENA fashion with AI-powered virtual try-on.
            Discover your perfect look before you buy.
          </p>

          <div className={styles.brandFeatures}>
            <div className={styles.brandFeature}>
              <span className={styles.featureDot} />
              <span>AI Virtual Try-On</span>
            </div>
            <div className={styles.brandFeature}>
              <span className={styles.featureDot} />
              <span>Curated Collections</span>
            </div>
            <div className={styles.brandFeature}>
              <span className={styles.featureDot} />
              <span>Free Shipping & Returns</span>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Right Panel — Forms ── */}
      <main className={styles.formPanel}>
        <div className={styles.formContainer}>
          {/* Tab Switcher */}
          <div className={styles.tabSwitcher}>
            <button
              className={`${styles.tab} ${activeTab === "login" ? styles.tabActive : ""}`}
              onClick={() => setActiveTab("login")}
            >
              Sign In
            </button>
            <button
              className={`${styles.tab} ${activeTab === "signup" ? styles.tabActive : ""}`}
              onClick={() => setActiveTab("signup")}
            >
              Create Account
            </button>
          </div>

          {/* ════════════ LOGIN FORM ════════════ */}
          {activeTab === "login" && (
            <div className={styles.formContent}>
              <div className={styles.formHeader}>
                <h2 className={styles.formTitle}>Welcome Back</h2>
                <p className={styles.formSubtitle}>
                  Sign in to your Ayyinai account
                </p>
              </div>

              <form className={styles.form} onSubmit={handleLoginSubmit}>
                {/* Email */}
                <div className={styles.formGroup}>
                  <label htmlFor="login-email" className={styles.label}>
                    Email Address
                  </label>
                  <div className={styles.inputWrapper}>
                    <Mail className={styles.inputIcon} size={20} />
                    <input
                      id="login-email"
                      name="email"
                      type="email"
                      value={loginData.email}
                      onChange={handleLoginChange}
                      placeholder="your@email.com"
                      className={styles.input}
                    />
                  </div>
                </div>

                {/* Password */}
                <div className={styles.formGroup}>
                  <label htmlFor="login-password" className={styles.label}>
                    Password
                  </label>
                  <div className={styles.inputWrapper}>
                    <Lock className={styles.inputIcon} size={20} />
                    <input
                      id="login-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={loginData.password}
                      onChange={handleLoginChange}
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

                {/* Remember / Forgot */}
                <div className={styles.rememberForgot}>
                  <label className={styles.checkboxLabel}>
                    <input type="checkbox" className={styles.checkbox} />
                    <span>Remember me</span>
                  </label>
                  <a href="#" className={styles.forgotLink}>
                    Forgot password?
                  </a>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loginLoading}
                  className={styles.submitButton}
                >
                  {loginLoading ? "Signing In..." : "Sign In"}
                </button>
              </form>

              {loginMessage && <p>{loginMessage}</p>}

              {/* Divider */}
              <div className={styles.divider}>
                <span>Or continue with</span>
              </div>

              {/* Social */}
              <div className={styles.socialButtons}>
                <button type="button" className={styles.socialButton}>
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>Google</span>
                </button>
                <button type="button" className={styles.socialButton}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                  </svg>
                  <span>Apple</span>
                </button>
              </div>

              {/* Switch prompt */}
              <p className={styles.switchPrompt}>
                Don't have an account?{" "}
                <button
                  type="button"
                  className={styles.switchLink}
                  onClick={() => setActiveTab("signup")}
                >
                  Sign up
                </button>
              </p>
            </div>
          )}

          {/* ════════════ SIGNUP FORM ════════════ */}
          {activeTab === "signup" && (
            <div className={styles.formContent}>
              <div className={styles.formHeader}>
                <h2 className={styles.formTitle}>Create Account</h2>
                <p className={styles.formSubtitle}>
                  Join Ayyinai and discover luxury fashion
                </p>
              </div>

              <form className={styles.form} onSubmit={handleSignupSubmit}>
                {/* Full Name */}
                <div className={styles.formGroup}>
                  <label htmlFor="signup-name" className={styles.label}>
                    Full Name
                  </label>
                  <div className={styles.inputWrapper}>
                    <User className={styles.inputIcon} size={20} />
                    <input
                      id="signup-name"
                      name="name"
                      type="text"
                      value={signupData.name}
                      onChange={handleSignupChange}
                      placeholder="Your full name"
                      className={styles.input}
                    />
                  </div>
                </div>

                {/* Email */}
                <div className={styles.formGroup}>
                  <label htmlFor="signup-email" className={styles.label}>
                    Email Address
                  </label>
                  <div className={styles.inputWrapper}>
                    <Mail className={styles.inputIcon} size={20} />
                    <input
                      id="signup-email"
                      name="email"
                      type="email"
                      value={signupData.email}
                      onChange={handleSignupChange}
                      placeholder="your@email.com"
                      className={styles.input}
                    />
                  </div>
                </div>

                {/* Password */}
                <div className={styles.formGroup}>
                  <label htmlFor="signup-password" className={styles.label}>
                    Password
                  </label>
                  <div className={styles.inputWrapper}>
                    <Lock className={styles.inputIcon} size={20} />
                    <input
                      id="signup-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={signupData.password}
                      onChange={handleSignupChange}
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

                {/* Confirm Password */}
                <div className={styles.formGroup}>
                  <label htmlFor="signup-confirm" className={styles.label}>
                    Confirm Password
                  </label>
                  <div className={styles.inputWrapper}>
                    <Lock className={styles.inputIcon} size={20} />
                    <input
                      id="signup-confirm"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={signupData.confirmPassword}
                      onChange={handleSignupChange}
                      placeholder="Confirm your password"
                      className={styles.input}
                    />
                    <button
                      type="button"
                      className={styles.togglePassword}
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      aria-label="Toggle confirm password visibility"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Terms */}
                <div className={styles.termsWrapper}>
                  <label className={styles.checkboxLabel}>
                    <input type="checkbox" className={styles.checkbox} />
                    <span>
                      I agree to the{" "}
                      <a href="#" className={styles.termsLink}>
                        Terms &amp; Conditions
                      </a>{" "}
                      and{" "}
                      <a href="#" className={styles.termsLink}>
                        Privacy Policy
                      </a>
                    </span>
                  </label>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={signupLoading}
                  className={styles.submitButton}
                >
                  {signupLoading ? "Creating Account..." : "Create Account"}
                </button>
              </form>

              {signupMessage && <p>{signupMessage}</p>}

              {/* Divider */}
              <div className={styles.divider}>
                <span>Or sign up with</span>
              </div>

              {/* Social */}
              <div className={styles.socialButtons}>
                <button type="button" className={styles.socialButton}>
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>Google</span>
                </button>
                <button type="button" className={styles.socialButton}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                  </svg>
                  <span>Apple</span>
                </button>
              </div>

              {/* Switch prompt */}
              <p className={styles.switchPrompt}>
                Already have an account?{" "}
                <button
                  type="button"
                  className={styles.switchLink}
                  onClick={() => setActiveTab("login")}
                >
                  Sign in
                </button>
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
