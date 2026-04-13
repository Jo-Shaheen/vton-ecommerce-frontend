import ProductCard from "../common/ProductCard";
import LoadingSpinner from "../common/LoadingSpinner";
import styles from "../../styles/ProductGrid.module.css";

export default function ProductGrid({
  products = [],
  loading = false,
  error = null,
}) {
  return (
    <div className={styles.gridWrapper}>
      <div className={styles.gridContainer}>
        {loading ? (
          <div className={styles.loadingState}>
            <LoadingSpinner message="Loading products..." />
          </div>
        ) : error ? (
          <div className={styles.errorState}>
            <h3 className={styles.emptyTitle}>Something Went Wrong</h3>
            <p className={styles.emptyMessage}>{error}</p>
          </div>
        ) : products.length > 0 ? (
          <div className={styles.productsGrid}>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onTryOn={() => console.log("VTON Phase 7:", product.id)}
                onAddToCart={() => console.log("Cart Phase 4:", product.id)}
              />
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>∅</div>
            <h3 className={styles.emptyTitle}>No Products Found</h3>
            <p className={styles.emptyMessage}>
              Try adjusting your filters or search terms to find what you're
              looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
