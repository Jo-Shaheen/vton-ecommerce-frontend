import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleIcon, AppleIcon } from "../common/SocialIcons";
import { registerUser } from "../../utils/authFunctions";
import { useAuth } from "../../context/AuthContext";

/* ─────────────────────────────────────────────
   RegistrationForm – Embeddable signup form
   Designed to be used inside AuthPage.
   Receives CSS module styles as a prop.
───────────────────────────────────────────── */

export default function RegistrationForm({ styles, onSwitchToLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      setLoading(false);
      return;
    }
    const result = await registerUser(
      formData.name,
      formData.email,
      formData.password,
    );
    setMessage(result.output);
    if (result.status) {
      // Placeholder: Set user and token from API response
      // login({ name: formData.name }, result.token);
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
        <h2 className={styles.formTitle}>Create Account</h2>
        <p className={styles.formSubtitle}>
          Join Ayyinai and discover luxury fashion
        </p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
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
              value={formData.name}
              onChange={handleChange}
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
              value={formData.email}
              onChange={handleChange}
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
              value={formData.password}
              onChange={handleChange}
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
              value={formData.confirmPassword}
              onChange={handleChange}
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
          disabled={loading}
          className={styles.submitButton}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>
      </form>

      {message && <p>{message}</p>}

      {/* Divider */}
      <div className={styles.divider}>
        <span>Or sign up with</span>
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
        Already have an account?{" "}
        <button
          type="button"
          className={styles.switchLink}
          onClick={onSwitchToLogin}
        >
          Sign in
        </button>
      </p>
    </div>
  );
}
