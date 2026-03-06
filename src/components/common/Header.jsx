/* ─────────────────────────────────────────────
   AINAI – Header Component
   Section 1: Static pages – custom components, JSX, styling
   Section 3: State – event listeners, conditional rendering
───────────────────────────────────────────── */

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, User, Menu, X } from "lucide-react";

const v = (name) => `var(${name})`;

function EyeLogo({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" aria-hidden="true">
      <path
        d="M10 40 C10 40 25 15 40 15 C55 15 70 40 70 40 C70 40 55 65 40 65 C25 65 10 40 10 40Z"
        fill="#8B4852"
        opacity="0.15"
      />
      <ellipse cx="40" cy="40" rx="20" ry="20" fill="#8B4852" opacity="0.9" />
      <ellipse cx="40" cy="40" rx="10" ry="10" fill="#D4AF7A" />
      <ellipse cx="44" cy="36" rx="3" ry="3" fill="white" opacity="0.8" />
    </svg>
  );
}

export default function Header({ cartCount = 0, onCartClick, isAuthenticated = false }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const NAV_LINKS = [
    { to: "/", label: "Home" },
    { to: "/browse", label: "Browse" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/tryon-history", label: "Try-On History" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: v("--z-sticky"),
        background: v("--white"),
        borderBottom: v("--border-light"),
        padding: `0 ${v("--space-6")}`,
      }}
    >
      <div
        style={{
          maxWidth: v("--container-max"),
          margin: "0 auto",
          height: v("--topbar-height"),
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <EyeLogo />
          <span
            style={{
              fontFamily: v("--font-serif"),
              fontSize: "1.4rem",
              fontWeight: 700,
              letterSpacing: v("--tracking-logo"),
              background: v("--gradient-brand"),
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            AINAI
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav
          style={{ display: "flex", gap: v("--space-6"), alignItems: "center" }}
          className="desktop-nav"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                fontSize: v("--text-sm"),
                fontWeight: isActive(link.to) ? 600 : 400,
                color: isActive(link.to) ? "var(--burgundy)" : "var(--charcoal)",
                borderBottom: isActive(link.to) ? "2px solid var(--burgundy)" : "2px solid transparent",
                paddingBottom: "4px",
                transition: `all ${v("--transition-fast")}`,
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: v("--space-4") }}>
          <button
            onClick={onCartClick}
            style={{ position: "relative", cursor: "pointer", background: "none", border: "none" }}
            aria-label={`Shopping cart with ${cartCount} items`}
          >
            <ShoppingBag size={22} color="var(--charcoal)" />
            {cartCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-6px",
                  right: "-6px",
                  background: v("--burgundy"),
                  color: v("--white"),
                  fontSize: "10px",
                  fontWeight: 700,
                  width: "18px",
                  height: "18px",
                  borderRadius: v("--radius-circle"),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {cartCount}
              </span>
            )}
          </button>

          <Link
            to={isAuthenticated ? "/dashboard" : "/login"}
            aria-label={isAuthenticated ? "Go to dashboard" : "Sign in"}
          >
            <User size={22} color="var(--charcoal)" />
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            style={{ display: "none", cursor: "pointer", background: "none", border: "none" }}
            className="mobile-menu-btn"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav
          style={{
            padding: v("--space-4"),
            display: "flex",
            flexDirection: "column",
            gap: v("--space-3"),
            borderTop: v("--border-light"),
          }}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              style={{
                padding: `${v("--space-2")} ${v("--space-4")}`,
                borderRadius: v("--radius-md"),
                fontWeight: isActive(link.to) ? 600 : 400,
                color: isActive(link.to) ? "var(--burgundy)" : "var(--charcoal)",
                background: isActive(link.to) ? "rgba(139,72,82,0.08)" : "transparent",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
