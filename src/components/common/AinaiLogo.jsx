import { useState, useEffect } from "react";
import styles from "../../styles/AinaiLogo.module.css";

/* ─────────────────────────────────────────────
   AinaiLogo – Brand logo matching ayyinai-logo-demo.html
   Two almond-shaped eyes with gold pupils + blink animation
   
   Props:
   - size: 'sm' | 'md' | 'lg' | 'xl'  (default 'md')
   - variant: 'light' | 'dark' | 'colored'  (default 'light')
   - showText: boolean  (default true)
   - showArabic: boolean  (default true)
   - showTagline: boolean  (default false)
   - animated: boolean  (default true)
───────────────────────────────────────────── */

export default function AinaiLogo({
  size = "md",
  variant = "light",
  showText = true,
  showArabic = true,
  showTagline = false,
  animated = true,
}) {
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    if (!animated) return;
    const interval = setInterval(() => {
      setBlink(true);
      const timeout = setTimeout(() => setBlink(false), 200);
      return () => clearTimeout(timeout);
    }, 4000);
    return () => clearInterval(interval);
  }, [animated]);

  const sizeClass = styles[`size_${size}`] || styles.size_md;
  const variantClass = styles[`variant_${variant}`] || styles.variant_light;

  return (
    <div className={`${styles.logoWrapper} ${sizeClass} ${variantClass}`}>
      {/* Eye Icon */}
      <div className={styles.eyeContainer}>
        <div
          className={`${styles.eye} ${styles.eyeLeft} ${blink ? styles.blink : ""}`}
        >
          <div className={styles.pupil} />
        </div>
        <div
          className={`${styles.eye} ${styles.eyeRight} ${blink ? styles.blinkRight : ""}`}
        >
          <div className={styles.pupil} />
        </div>
      </div>

      {/* Text */}
      {showText && (
        <div className={styles.textGroup}>
          <span className={styles.brandText}>AINAI</span>
          {showArabic && <span className={styles.arabicText}>عَيناي</span>}
        </div>
      )}

      {showTagline && (
        <p className={styles.tagline}>See Yourself Differently</p>
      )}
    </div>
  );
}
