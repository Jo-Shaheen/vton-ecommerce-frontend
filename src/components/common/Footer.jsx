import { Link } from "react-router-dom";
import AinaiLogo from "./AinaiLogo";
import styles from "../../styles/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Brand Section */}
        <div className={styles.footerSection}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <AinaiLogo size="sm" variant="dark" showTagline={false} />
          </Link>
          <p className={styles.footerDescription}>
            See yourself differently. Luxury virtual try-on for MENA fashion.
          </p>
        </div>

        {/* Quick Links */}
        <div className={styles.footerSection}>
          <h4 className={styles.footerHeading}>Shop</h4>
          <ul className={styles.footerLinks}>
            <li>
              <Link to="#" className={styles.footerLink}>
                New Arrivals
              </Link>
            </li>
            <li>
              <Link to="#" className={styles.footerLink}>
                Collections
              </Link>
            </li>
            <li>
              <Link to="#" className={styles.footerLink}>
                Sale
              </Link>
            </li>
            <li>
              <Link to="#" className={styles.footerLink}>
                About
              </Link>
            </li>
          </ul>
        </div>

        {/* Help */}
        <div className={styles.footerSection}>
          <h4 className={styles.footerHeading}>Help</h4>
          <ul className={styles.footerLinks}>
            <li>
              <Link to="#" className={styles.footerLink}>
                Contact
              </Link>
            </li>
            <li>
              <Link to="#" className={styles.footerLink}>
                Shipping
              </Link>
            </li>
            <li>
              <Link to="#" className={styles.footerLink}>
                Returns
              </Link>
            </li>
            <li>
              <Link to="#" className={styles.footerLink}>
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div className={styles.footerSection}>
          <h4 className={styles.footerHeading}>Legal</h4>
          <ul className={styles.footerLinks}>
            <li>
              <Link to="#" className={styles.footerLink}>
                Privacy
              </Link>
            </li>
            <li>
              <Link to="#" className={styles.footerLink}>
                Terms
              </Link>
            </li>
            <li>
              <Link to="#" className={styles.footerLink}>
                Cookies
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className={styles.footerBottom}>
        <p className={styles.copyright}>© 2025 AINAI. All rights reserved.</p>
      </div>
    </footer>
  );
}
