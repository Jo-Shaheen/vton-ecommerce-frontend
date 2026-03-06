/* ─────────────────────────────────────────────
   AINAI – Footer Component
   Section 1: Static pages – custom components, fragments, styling
───────────────────────────────────────────── */

import { Link } from "react-router-dom";

const v = (name) => `var(${name})`;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        background: v("--charcoal"),
        color: v("--ivory"),
        padding: `${v("--space-16")} ${v("--space-6")} ${v("--space-8")}`,
      }}
    >
      <div
        style={{
          maxWidth: v("--container-max"),
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: v("--space-10"),
        }}
      >
        {/* Brand */}
        <div>
          <h3
            style={{
              fontFamily: v("--font-serif"),
              fontSize: v("--text-xl"),
              background: v("--gradient-logo-dark"),
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: v("--space-4"),
            }}
          >
            AINAI
          </h3>
          <p style={{ fontSize: v("--text-sm"), color: "rgba(247,243,237,0.7)", lineHeight: 1.6 }}>
            AI-powered virtual try-on for MENA modest fashion. See yourself differently.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4
            style={{
              fontSize: v("--text-sm"),
              textTransform: "uppercase",
              letterSpacing: v("--tracking-wider"),
              color: v("--gold"),
              marginBottom: v("--space-4"),
            }}
          >
            Navigation
          </h4>
          <nav style={{ display: "flex", flexDirection: "column", gap: v("--space-2") }}>
            {[
              { to: "/", label: "Home" },
              { to: "/browse", label: "Browse" },
              { to: "/dashboard", label: "Dashboard" },
              { to: "/tryon-history", label: "Try-On History" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  fontSize: v("--text-sm"),
                  color: "rgba(247,243,237,0.65)",
                  transition: `color ${v("--transition-fast")}`,
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Support */}
        <div>
          <h4
            style={{
              fontSize: v("--text-sm"),
              textTransform: "uppercase",
              letterSpacing: v("--tracking-wider"),
              color: v("--gold"),
              marginBottom: v("--space-4"),
            }}
          >
            Support
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: v("--space-2") }}>
            {["Privacy Policy", "Terms of Service", "Contact Us"].map((item) => (
              <span
                key={item}
                style={{ fontSize: v("--text-sm"), color: "rgba(247,243,237,0.65)", cursor: "pointer" }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div
        style={{
          maxWidth: v("--container-max"),
          margin: `${v("--space-10")} auto 0`,
          paddingTop: v("--space-6"),
          borderTop: "1px solid rgba(247,243,237,0.15)",
          textAlign: "center",
          fontSize: v("--text-xs"),
          color: "rgba(247,243,237,0.45)",
        }}
      >
        &copy; {currentYear} AINAI. All rights reserved. Built with &hearts; for MENA modest fashion.
      </div>
    </footer>
  );
}
