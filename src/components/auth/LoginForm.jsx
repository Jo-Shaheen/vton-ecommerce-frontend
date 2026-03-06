/* ─────────────────────────────────────────────
   AINAI – LoginForm Component
   Section 3: State – forms, conditional rendering
   Section 4: Side effects – controlled components
───────────────────────────────────────────── */

import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const v = (name) => `var(${name})`;

export default function LoginForm({ onSubmit, isLoading = false, error = null }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(email, password);
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: v("--space-5") }}>
      <div style={{ textAlign: "center", marginBottom: v("--space-4") }}>
        <h2 style={{ fontFamily: v("--font-serif"), fontSize: v("--text-2xl"), marginBottom: v("--space-2") }}>
          Welcome Back
        </h2>
        <p style={{ fontSize: v("--text-sm"), color: v("--charcoal-muted") }}>
          Sign in to your AINAI account
        </p>
      </div>

      {error && (
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
          {error}
        </div>
      )}

      {/* Email */}
      <div>
        <label
          htmlFor="login-email"
          style={{
            display: "block",
            fontSize: v("--text-sm"),
            fontWeight: 600,
            marginBottom: v("--space-1"),
          }}
        >
          Email
        </label>
        <input
          id="login-email"
          type="email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          autoComplete="email"
        />
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="login-password"
          style={{
            display: "block",
            fontSize: v("--text-sm"),
            fontWeight: 600,
            marginBottom: v("--space-1"),
          }}
        >
          Password
        </label>
        <div style={{ position: "relative" }}>
          <input
            id="login-password"
            type={showPassword ? "text" : "password"}
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            autoComplete="current-password"
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

      <button
        type="submit"
        className="btn btn-primary btn-pill"
        disabled={isLoading || !email || !password}
      >
        {isLoading ? "Signing in…" : "Sign In"}
      </button>

      <p style={{ textAlign: "center", fontSize: v("--text-sm"), color: v("--charcoal-muted") }}>
        Don&apos;t have an account?{" "}
        <Link to="/register" style={{ color: "var(--burgundy)", fontWeight: 600 }}>
          Create one
        </Link>
      </p>

      {/* Demo hint */}
      <p style={{ textAlign: "center", fontSize: v("--text-xs"), color: v("--charcoal-muted"), fontStyle: "italic" }}>
        Demo: demo@ainai.com / demo123
      </p>
    </form>
  );
}
