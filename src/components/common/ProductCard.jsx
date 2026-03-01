import { ShoppingBag, Eye } from 'lucide-react';
import styles from '../../styles/ProductCard.module.css';

export default function ProductCard({ image, name, price, onTryOn, onAddToCart }) {
  return (
    <div className={styles.card}>
      {/* Image Container */}
      <div className={styles.imageWrapper}>
        <img 
          src={image} 
          alt={name} 
          className={styles.productImage}
        />
        
        {/* Overlay Actions */}
        <div className={styles.imageOverlay}>
          <button className={styles.tryOnButton} onClick={onTryOn}>
            <Eye size={20} />
            <span>Try This On</span>
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className={styles.productInfo}>
        <h3 className={styles.productName}>{name}</h3>
        <p className={styles.productPrice}>${price.toFixed(2)}</p>
        
        {/* Add to Cart Button */}
        <button className={styles.addToCartButton} onClick={onAddToCart}>
          <ShoppingBag size={18} />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
}
