import { ShoppingBag, User } from 'lucide-react';
import styles from '../../styles/Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        {/* Logo */}
        <div className={styles.logoSection}>
          <h1 className={styles.logo}>Ayyinai</h1>
          <p className={styles.logoSubtext}>عَيِّناي</p>
        </div>

        {/* Navigation */}
        <nav className={styles.navigation}>
          <a href="/" className={styles.navLink}>Home</a>
          <a href="/browse" className={styles.navLink}>Browse</a>
          <a href="/try-on-history" className={styles.navLink}>Try-Ons</a>
        </nav>

        {/* Right Section */}
        <div className={styles.rightSection}>
          {/* Cart Icon */}
          <div className={styles.cartWrapper}>
            <button className={styles.cartButton} aria-label="Shopping cart">
              <ShoppingBag size={24} />
            </button>
            <span className={styles.cartBadge}>2</span>
          </div>

          {/* Profile Avatar */}
          <button className={styles.profileButton} aria-label="User profile">
            <User size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}
