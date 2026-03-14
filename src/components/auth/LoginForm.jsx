import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleIcon, AppleIcon } from "../common/SocialIcons";
import { loginUser } from "../../utils/authFunctions";
import { useAuth } from "../../context/AuthContext";

/* ─────────────────────────────────────────────
   LoginForm – Embeddable login form component
   Designed to be used inside AuthPage.
   Receives CSS module styles as a prop.
───────────────────────────────────────────── */

export default function LoginForm({ styles, onSwitchToSignup }) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

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
    <div className={styles.formContent}>
      <div className={styles.formHeader}>
        <h2 className={styles.formTitle}>Welcome Back</h2>
        <p className={styles.formSubtitle}>
          Sign in to your Ayyinai account
        </p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
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
              value={formData.email}
              onChange={handleChange}
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
          disabled={loading}
          className={styles.submitButton}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      {message && <p>{message}</p>}

      {/* Divider */}
      <div className={styles.divider}>
        <span>Or continue with</span>
      </div>

      {/* Social */}
      <div className={styles.socialButtons}>
        <button type="button" className={styles.socialButton}>
          <GoogleIcon />
          <span>Google</span>
        </button>
        <button type="button" className={styles.socialButton}>
          <AppleIcon />
          <span>Apple</span>
        </button>
      </div>

      {/* Switch prompt */}
      <p className={styles.switchPrompt}>
        Don't have an account?{" "}
        <button
          type="button"
          className={styles.switchLink}
          onClick={onSwitchToSignup}
        >
          Sign up
        </button>
      </p>
    </div>
  );
}
