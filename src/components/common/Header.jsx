import { ShoppingBag, User, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import AinaiLogo from "./AinaiLogo";
import styles from "../../styles/Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        {/* Logo */}
        <div className={styles.logoSection}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <AinaiLogo size="md" variant="light" showArabic={false} />
          </Link>
        </div>

        {/* Navigation */}
        <nav className={styles.navigation}>
          <Link to="/" className={styles.navLink}>
            Home
          </Link>
          <Link to="/browse" className={styles.navLink}>
            Browse
          </Link>
          <Link to="/try-on-history" className={styles.navLink}>
            Try-Ons
          </Link>
        </nav>

        {/* Right Section */}
        <div className={styles.rightSection}>
          {/* Cart Icon */}
          <div className={styles.cartWrapper}>
            <Link
              to="/cart"
              className={styles.cartButton}
              aria-label="Shopping cart"
            >
              <ShoppingBag size={24} />
            </Link>
          </div>

          {/* Profile Avatar */}
          <Link
            to="/dashboard"
            className={styles.profileButton}
            aria-label="User profile"
          >
            <User size={24} />
          </Link>

          {/* Login Button */}
          <Link to="/auth" className={styles.loginButton}>
            <LogIn size={18} />
            <span>Login</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
