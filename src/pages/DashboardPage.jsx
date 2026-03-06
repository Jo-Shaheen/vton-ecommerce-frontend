import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import styles from '../styles/DashboardPage.module.css';

export default function DashboardPage() {
  return (
    <div className={styles.pageWrapper}>
      <Header />

      <main className={styles.mainContent}>
        <div className={styles.container}>
          {/* Welcome Section */}
          <section className={styles.welcomeSection}>
            <h1 className={styles.welcomeTitle}>Welcome to Your Dashboard</h1>
            <p className={styles.welcomeSubtitle}>Manage your account and explore your style</p>
          </section>

          {/* Dashboard Grid */}
          <div className={styles.dashboardGrid}>
            {/* Card 1: Account Info */}
            <div className={styles.card}>
              <div className={styles.cardIcon}>👤</div>
              <h3 className={styles.cardTitle}>My Account</h3>
              <p className={styles.cardDescription}>View and update your profile information</p>
              <a href="#" className={styles.cardLink}>Manage Account</a>
            </div>

            {/* Card 2: Orders */}
            <div className={styles.card}>
              <div className={styles.cardIcon}>📦</div>
              <h3 className={styles.cardTitle}>My Orders</h3>
              <p className={styles.cardDescription}>Track your orders and view history</p>
              <a href="#" className={styles.cardLink}>View Orders</a>
            </div>

            {/* Card 3: Favorites */}
            <div className={styles.card}>
              <div className={styles.cardIcon}>❤️</div>
              <h3 className={styles.cardTitle}>Saved Items</h3>
              <p className={styles.cardDescription}>Access your favorite pieces</p>
              <a href="#" className={styles.cardLink}>View Saved</a>
            </div>

            {/* Card 4: Try-On History */}
            <div className={styles.card}>
              <div className={styles.cardIcon}>📸</div>
              <h3 className={styles.cardTitle}>Try-On History</h3>
              <p className={styles.cardDescription}>Review your virtual try-ons</p>
              <a href="/try-on-history" className={styles.cardLink}>View History</a>
            </div>

            {/* Card 5: Addresses */}
            <div className={styles.card}>
              <div className={styles.cardIcon}>🏠</div>
              <h3 className={styles.cardTitle}>Addresses</h3>
              <p className={styles.cardDescription}>Manage your shipping addresses</p>
              <a href="#" className={styles.cardLink}>Manage Addresses</a>
            </div>

            {/* Card 6: Settings */}
            <div className={styles.card}>
              <div className={styles.cardIcon}>⚙️</div>
              <h3 className={styles.cardTitle}>Settings</h3>
              <p className={styles.cardDescription}>Update preferences and notifications</p>
              <a href="#" className={styles.cardLink}>Go to Settings</a>
            </div>
          </div>

          {/* Info Sections */}
          <div className={styles.infoSections}>
            {/* Recent Activity */}
            <div className={styles.infoCard}>
              <h2 className={styles.infoTitle}>Recent Activity</h2>
              <div className={styles.activityList}>
                <div className={styles.activityItem}>
                  <span className={styles.activityBadge}>Purchase</span>
                  <span className={styles.activityText}>Silk Jalabiya purchased</span>
                  <span className={styles.activityDate}>Feb 28, 2025</span>
                </div>
                <div className={styles.activityItem}>
                  <span className={styles.activityBadge}>Try-On</span>
                  <span className={styles.activityText}>Tried on Embroidered Kaftan</span>
                  <span className={styles.activityDate}>Feb 27, 2025</span>
                </div>
              </div>
            </div>

            {/* Loyalty Info */}
            <div className={styles.infoCard}>
              <h2 className={styles.infoTitle}>Loyalty Points</h2>
              <div className={styles.loyaltyInfo}>
                <div className={styles.loyaltyPoints}>
                  <span className={styles.pointsValue}>850</span>
                  <span className={styles.pointsLabel}>Points Available</span>
                </div>
                <p className={styles.loyaltyDescription}>
                  Earn points with every purchase and redeem for exclusive rewards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
