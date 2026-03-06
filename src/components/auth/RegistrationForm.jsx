/* ─────────────────────────────────────────────
   AINAI – RegistrationForm Component
   Section 3: State – forms, complex state, conditional rendering
   Section 4: Side effects – controlled components
───────────────────────────────────────────── */

import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const v = (name) => `var(${name})`;

export default function RegistrationForm({ onSubmit, isLoading = false, error = null }) {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setValidationError(null);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (formData.password.length < 6) {
      setValidationError("Password must be at least 6 characters");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setValidationError("Passwords do not match");
      return;
    }

    onSubmit(formData.name, formData.email, formData.password);
  }

  const displayError = validationError || error;

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: v("--space-5") }}>
      <div style={{ textAlign: "center", marginBottom: v("--space-4") }}>
        <h2 style={{ fontFamily: v("--font-serif"), fontSize: v("--text-2xl"), marginBottom: v("--space-2") }}>
          Create Account
        </h2>
        <p style={{ fontSize: v("--text-sm"), color: v("--charcoal-muted") }}>
          Join AINAI and experience virtual try-on
        </p>
      </div>

      {displayError && (
        <div
          role="alert"
          style={{
            padding: v("--space-3"),
            borderRadius: v("--radius-sm"),
            background: "rgba(192,57,43,0.08)",
            color: v("--error"),
            fontSize: v("--text-sm"),
            textAlign: "center",
          }}
        >
          {displayError}
        </div>
      )}

      {/* Name */}
      <div>
        <label
          htmlFor="register-name"
          style={{ display: "block", fontSize: v("--text-sm"), fontWeight: 600, marginBottom: v("--space-1") }}
        >
          Full Name
        </label>
        <input
          id="register-name"
          name="name"
          type="text"
          className="input"
          value={formData.name}
          onChange={handleChange}
          placeholder="Fatima Al-Salem"
          required
          autoComplete="name"
        />
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="register-email"
          style={{ display: "block", fontSize: v("--text-sm"), fontWeight: 600, marginBottom: v("--space-1") }}
        >
          Email
        </label>
        <input
          id="register-email"
          name="email"
          type="email"
          className="input"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          required
          autoComplete="email"
        />
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="register-password"
          style={{ display: "block", fontSize: v("--text-sm"), fontWeight: 600, marginBottom: v("--space-1") }}
        >
          Password
        </label>
        <div style={{ position: "relative" }}>
          <input
            id="register-password"
            name="password"
            type={showPassword ? "text" : "password"}
            className="input"
            value={formData.password}
            onChange={handleChange}
            placeholder="At least 6 characters"
            required
            autoComplete="new-password"
            style={{ paddingRight: "40px" }}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              padding: "4px",
            }}
          >
            {showPassword ? <EyeOff size={18} color="var(--charcoal-muted)" /> : <Eye size={18} color="var(--charcoal-muted)" />}
          </button>
        </div>
      </div>

      {/* Confirm Password */}
      <div>
        <label
          htmlFor="register-confirm"
          style={{ display: "block", fontSize: v("--text-sm"), fontWeight: 600, marginBottom: v("--space-1") }}
        >
          Confirm Password
        </label>
        <input
          id="register-confirm"
          name="confirmPassword"
          type="password"
          className="input"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Re-enter your password"
          required
          autoComplete="new-password"
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary btn-pill"
        disabled={isLoading || !formData.name || !formData.email || !formData.password || !formData.confirmPassword}
      >
        {isLoading ? "Creating account…" : "Create Account"}
      </button>

      <p style={{ textAlign: "center", fontSize: v("--text-sm"), color: v("--charcoal-muted") }}>
        Already have an account?{" "}
        <Link to="/login" style={{ color: "var(--burgundy)", fontWeight: 600 }}>
          Sign in
        </Link>
      </p>
    </form>
  );
}
