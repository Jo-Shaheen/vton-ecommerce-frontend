import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import styles from "../../styles/RegistrationForm.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../utils/authFunctions";
import { useAuth } from "../../context/AuthContext";

export default function RegistrationForm() {
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
  const { login: _login } = useAuth();

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
    <div className={styles.formWrapper}>
      <div className={styles.formContainer}>
        {/* Header */}
        <div className={styles.formHeader}>
          <h1 className={styles.formTitle}>Create Account</h1>
          <p className={styles.formSubtitle}>
            Join Ayyinai and discover luxury fashion
          </p>
        </div>

        {/* Form */}
        <form className={styles.form} onSubmit={handleSubmit}>
          {/* Full Name Field */}
          <div className={styles.formGroup}>
            <label htmlFor="fullName" className={styles.label}>
              Full Name
            </label>
            <div className={styles.inputWrapper}>
              <User className={styles.inputIcon} size={20} />
              <input
                id="fullName"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                className={styles.input}
              />
            </div>
          </div>

          {/* Email Field */}
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email Address
            </label>
            <div className={styles.inputWrapper}>
              <Mail className={styles.inputIcon} size={20} />
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
              <Lock className={styles.inputIcon} size={20} />
              <input
                id="password"
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

          {/* Confirm Password Field */}
          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>
              Confirm Password
            </label>
            <div className={styles.inputWrapper}>
              <Lock className={styles.inputIcon} size={20} />
              <input
                id="confirmPassword"
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
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label="Toggle password visibility"
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
            <label className={styles.termsLabel}>
              <input type="checkbox" className={styles.checkbox} />
              <span>
                I agree to the{" "}
                <a href="#" className={styles.termsLink}>
                  Terms & Conditions
                </a>{" "}
                and
                <a href="#" className={styles.termsLink}>
                  {" "}
                  Privacy Policy
                </a>
              </span>
            </label>
          </div>

          {/* Sign Up Button */}
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
          Already have an account?{" "}
          <a href="/auth" className={styles.signInLink}>
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
