import styles from '../../styles/Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Brand Section */}
        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>Ayyinai</h3>
          <p className={styles.footerSubtitle}>عَيِّناي</p>
          <p className={styles.footerDescription}>
            See yourself differently. Luxury virtual try-on for MENA fashion.
          </p>
        </div>

        {/* Quick Links */}
        <div className={styles.footerSection}>
          <h4 className={styles.footerHeading}>Shop</h4>
          <ul className={styles.footerLinks}>
            <li><a href="#" className={styles.footerLink}>New Arrivals</a></li>
            <li><a href="#" className={styles.footerLink}>Collections</a></li>
            <li><a href="#" className={styles.footerLink}>Sale</a></li>
            <li><a href="#" className={styles.footerLink}>About</a></li>
          </ul>
        </div>

        {/* Help */}
        <div className={styles.footerSection}>
          <h4 className={styles.footerHeading}>Help</h4>
          <ul className={styles.footerLinks}>
            <li><a href="#" className={styles.footerLink}>Contact</a></li>
            <li><a href="#" className={styles.footerLink}>Shipping</a></li>
            <li><a href="#" className={styles.footerLink}>Returns</a></li>
            <li><a href="#" className={styles.footerLink}>FAQ</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div className={styles.footerSection}>
          <h4 className={styles.footerHeading}>Legal</h4>
          <ul className={styles.footerLinks}>
            <li><a href="#" className={styles.footerLink}>Privacy</a></li>
            <li><a href="#" className={styles.footerLink}>Terms</a></li>
            <li><a href="#" className={styles.footerLink}>Cookies</a></li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className={styles.footerBottom}>
        <p className={styles.copyright}>
          © 2025 Ayyinai. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
