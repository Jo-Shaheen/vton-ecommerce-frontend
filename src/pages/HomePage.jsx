import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import styles from '../styles/HomePage.module.css';

export default function HomePage() {
  return (
    <div className={styles.pageWrapper}>
      <Header />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            See Yourself <span className={styles.highlight}>Differently</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Experience luxury fashion with our virtual try-on technology. 
            Perfect your style before you buy.
          </p>
          <div className={styles.heroCTA}>
            <a href="/browse" className={styles.primaryButton}>
              Start Exploring
            </a>
            <a href="#features" className={styles.secondaryButton}>
              Learn More
            </a>
          </div>
        </div>
        <div className={styles.heroImage} />
      </section>

      {/* Features Section */}
      <section id="features" className={styles.features}>
        <h2 className={styles.featuresTitle}>Why Choose Ayyinai?</h2>
        
        <div className={styles.featureGrid}>
          {/* Feature 1 */}
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>✨</div>
            <h3 className={styles.featureTitle}>Virtual Try-On</h3>
            <p className={styles.featureDescription}>
              See how our pieces look on you before making a purchase. Powered by advanced AI.
            </p>
          </div>

          {/* Feature 2 */}
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🛍</div>
            <h3 className={styles.featureTitle}>Curated Collections</h3>
            <p className={styles.featureDescription}>
              Explore carefully selected luxury pieces from the finest MENA designers.
            </p>
          </div>

          {/* Feature 3 */}
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🚚</div>
            <h3 className={styles.featureTitle}>Free Shipping</h3>
            <p className={styles.featureDescription}>
              Enjoy complimentary shipping on all orders. Easy returns within 30 days.
            </p>
          </div>

          {/* Feature 4 */}
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>💎</div>
            <h3 className={styles.featureTitle}>Premium Quality</h3>
            <p className={styles.featureDescription}>
              Every piece is handpicked for its exceptional craftsmanship and elegance.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Ready to Discover Your Style?</h2>
          <p className={styles.ctaDescription}>
            Join thousands of fashion enthusiasts discovering their perfect look.
          </p>
          <a href="/browse" className={styles.ctaButton}>
            Start Your Journey
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
