import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import AinaiLogo from "../components/common/AinaiLogo";
import LoginForm from "../components/auth/LoginForm";
import RegistrationForm from "../components/auth/RegistrationForm";
import styles from "../styles/AuthPage.module.css";

/* ─────────────────────────────────────────────
   AuthPage – Login / Sign-Up
   Split-screen layout: brand panel + form panel.
   Form logic lives in LoginForm & RegistrationForm.
───────────────────────────────────────────── */

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login"); // 'login' | 'signup'

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

          {/* Render the active form */}
          {activeTab === "login" && (
            <LoginForm
              styles={styles}
              onSwitchToSignup={() => setActiveTab("signup")}
            />
          )}

          {activeTab === "signup" && (
            <RegistrationForm
              styles={styles}
              onSwitchToLogin={() => setActiveTab("login")}
            />
          )}
        </div>
      </main>
    </div>
  );
}
