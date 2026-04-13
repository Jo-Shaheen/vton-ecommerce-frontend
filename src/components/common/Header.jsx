import { ShoppingBag, LogIn, LogOut } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import AinaiLogo from "./AinaiLogo";
import { useAuth } from "../../context/AuthContext";
import styles from "../../styles/Header.module.css";

export default function Header() {
  const { isAuthenticated, user, userRole, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  const getInitials = () => {
    if (!user) return "?";
    if (user.firstName?.trim()) return user.firstName[0].toUpperCase();
    if (user.email?.trim()) return user.email[0].toUpperCase();
    return "?";
  };

  const getProfilePath = () => {
    switch (userRole) {
      case "vendor":
        return "/vendor";
      case "admin":
        return "/admin";
      case "customer":
      default:
        return "/profile";
    }
  };

  const renderNavLink = (to, label, end = false) => (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
      }
    >
      {label}
    </NavLink>
  );

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
          {renderNavLink("/", "Home", true)}
          {renderNavLink("/browse", "Browse")}
          {isAuthenticated &&
            userRole === "customer" &&
            renderNavLink("/try-on-history", "Try-Ons")}
          {isAuthenticated &&
            userRole === "vendor" &&
            renderNavLink("/vendor", "Vendor Dashboard")}
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

          {isAuthenticated ? (
            <>
              {/* Profile Avatar */}
              <Link
                to={getProfilePath()}
                className={styles.avatarButton}
                aria-label="User profile"
              >
                {getInitials()}
              </Link>

              {/* Logout Button */}
              <button
                type="button"
                className={styles.logoutButton}
                aria-label="Logout"
                onClick={handleLogout}
              >
                <LogOut size={20} />
              </button>
            </>
          ) : (
            /* Login Button */
            <Link to="/auth" className={styles.loginButton}>
              <LogIn size={18} />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
