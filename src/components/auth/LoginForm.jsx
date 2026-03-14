import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Scan,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AinaiLogo from "../common/AinaiLogo";
import styles from "../../styles/LoginForm.module.css";
import { loginUser } from "../../utils/authFunctions";
import { useAuth } from "../../context/AuthContext";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login: _login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const result = await loginUser(formData.email, formData.password);
    setMessage(result.output);
    if (result.status) {
      // Placeholder: Set user and token from API response
      // login({ email: formData.email }, result.token);
      navigate("/profile");
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.formWrapper}>
      {/* Left brand panel */}
      <div className={styles.brandPanel}>
        <div className={styles.brandContent}>
          <AinaiLogo size="lg" variant="dark" showTagline={false} />

          <p className={styles.brandTagline}>
            Experience fashion like never before with{" "}
            <strong>AI-powered virtual try-on</strong>
          </p>

          <ul className={styles.brandFeatures}>
            <li className={styles.brandFeature}>
              <span className={styles.featureIcon}>
                <Scan size={14} />
              </span>
              Virtual try-on technology
            </li>
            <li className={styles.brandFeature}>
              <span className={styles.featureIcon}>
                <ShoppingBag size={14} />
              </span>
              Premium MENA fashion
            </li>
            <li className={styles.brandFeature}>
              <span className={styles.featureIcon}>
                <Sparkles size={14} />
              </span>
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
            <p className={styles.formSubtitle}>
              Enter your credentials to access your account
            </p>
          </div>

          {/* Form */}
          <form className={styles.form} onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email Address
              </label>
              <div className={styles.inputWrapper}>
                <Mail className={styles.inputIcon} size={18} />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className={styles.input}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <div className={styles.inputWrapper}>
                <Lock className={styles.inputIcon} size={18} />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={styles.input}
                />
                <button
                  type="button"
                  className={styles.togglePassword}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className={styles.rememberForgot}>
              <label className={styles.rememberLabel}>
                <input type="checkbox" className={styles.checkbox} />
                <span>Remember me</span>
              </label>
              <a href="#" className={styles.forgotLink}>
                Forgot password?
              </a>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className={styles.submitButton}
            >
              {loading ? "Signing In..." : "Sign In"}
              {!loading && (
                <ArrowRight size={18} className={styles.btnArrow} />
              )}
            </button>
          </form>

          {message && <p>{message}</p>}

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
            Don&apos;t have an account?{" "}
            <Link to="/auth" className={styles.signUpLink}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
