import ProductCard from '../common/ProductCard';
import styles from '../../styles/ProductGrid.module.css';

export default function ProductGrid({ products = [] }) {
  return (
    <div className={styles.gridWrapper}>
      <div className={styles.gridContainer}>
        {products.length > 0 ? (
          <div className={styles.productsGrid}>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                image={product.image}
                name={product.name}
                price={product.price}
                onTryOn={() => console.log('Try on:', product.id)}
                onAddToCart={() => console.log('Add to cart:', product.id)}
              />
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>∅</div>
            <h3 className={styles.emptyTitle}>No Products Found</h3>
            <p className={styles.emptyMessage}>
              Try adjusting your filters or search terms to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
