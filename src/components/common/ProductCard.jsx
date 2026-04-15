import { ShoppingBag, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "../../styles/ProductCard.module.css";
import { formatPrice, getProductImage } from "../../utils/productHelpers";

export default function ProductCard({ product, onTryOn, onAddToCart }) {
  if (!product) return null;

  const imageUrl = getProductImage(product);
  const initials = (product.name || "PR")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className={styles.card}>
      <Link to={`/product/${product.id}`} className={styles.imageWrapper}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name}
            className={styles.productImage}
          />
        ) : (
          <div className={styles.imagePlaceholder}>
            <span>{initials}</span>
          </div>
        )}

        {product.isLowStock === true && (
          <span className={styles.lowStockBadge}>Low Stock</span>
        )}

        <div className={styles.imageOverlay}>
          <button
            className={styles.tryOnButton}
            onClick={(e) => {
              e.preventDefault();
              onTryOn?.();
            }}
          >
            <Eye size={20} />
            <span>Try This On</span>
          </button>
        </div>
      </Link>

      <div className={styles.productInfo}>
        <p className={styles.brandName}>{product.vendor?.brandName || ""}</p>

        <Link to={`/product/${product.id}`} className={styles.productNameLink}>
          <h3 className={styles.productName}>{product.name}</h3>
        </Link>
        <p className={styles.productPrice}>
          {formatPrice(product.basePrice, product.currency)}
        </p>

        <button
          className={styles.addToCartButton}
          onClick={() => onAddToCart?.()}
        >
          <ShoppingBag size={18} />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
}
