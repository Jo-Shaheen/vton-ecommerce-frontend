import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, ArrowLeft, Trash2, Plus, Minus } from "lucide-react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import styles from "../styles/CartPage.module.css";

// Empty initial cart — user can browse even when empty
const initialCart = [];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCart);

  const updateQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = subtotal > 0 ? (subtotal >= 500 ? 0 : 25) : 0;
  const total = subtotal + shipping;

  return (
    <div className={styles.pageWrapper}>
      <Header />

      <main className={styles.mainContent}>
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb}>
          <Link to="/">Home</Link>
          <span className={styles.sep}>/</span>
          <span className={styles.current}>Shopping Cart</span>
        </nav>

        <h1 className={styles.pageTitle}>
          <ShoppingBag size={28} />
          Your Cart
          {cartItems.length > 0 && (
            <span className={styles.itemCount}>
              ({cartItems.reduce((s, i) => s + i.quantity, 0)} items)
            </span>
          )}
        </h1>

        {cartItems.length === 0 ? (
          /* ── Empty State ── */
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <ShoppingBag size={64} strokeWidth={1} />
            </div>
            <h2 className={styles.emptyTitle}>Your cart is empty</h2>
            <p className={styles.emptyMessage}>
              Looks like you haven't added any items yet. Start exploring our
              collection and find something you love!
            </p>
            <Link to="/browse" className={styles.browseCta}>
              Start Shopping
            </Link>
          </div>
        ) : (
          /* ── Cart Contents ── */
          <div className={styles.cartLayout}>
            {/* Items List */}
            <section className={styles.itemsSection}>
              {cartItems.map((item) => (
                <div key={item.id} className={styles.cartItem}>
                  <Link
                    to={`/product/${item.id}`}
                    className={styles.itemImageLink}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className={styles.itemImage}
                    />
                  </Link>

                  <div className={styles.itemDetails}>
                    <Link
                      to={`/product/${item.id}`}
                      className={styles.itemName}
                    >
                      {item.name}
                    </Link>
                    {item.size && (
                      <p className={styles.itemMeta}>Size: {item.size}</p>
                    )}
                    {item.color && (
                      <p className={styles.itemMeta}>Color: {item.color}</p>
                    )}
                    <p className={styles.itemPrice}>${item.price.toFixed(2)}</p>

                    <div className={styles.quantityRow}>
                      <button
                        className={styles.qtyButton}
                        onClick={() => updateQuantity(item.id, -1)}
                        aria-label="Decrease"
                      >
                        <Minus size={16} />
                      </button>
                      <span className={styles.qtyValue}>{item.quantity}</span>
                      <button
                        className={styles.qtyButton}
                        onClick={() => updateQuantity(item.id, 1)}
                        aria-label="Increase"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  <div className={styles.itemRight}>
                    <p className={styles.lineTotal}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      className={styles.removeButton}
                      onClick={() => removeItem(item.id)}
                      aria-label="Remove"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </section>

            {/* Order Summary */}
            <aside className={styles.summary}>
              <h3 className={styles.summaryTitle}>Order Summary</h3>

              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              {subtotal > 0 && subtotal < 500 && (
                <p className={styles.shippingHint}>
                  Add ${(500 - subtotal).toFixed(2)} more for free shipping
                </p>
              )}
              <div className={styles.summaryDivider} />
              <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <button className={styles.checkoutButton}>
                Proceed to Checkout
              </button>

              <Link to="/browse" className={styles.continueShopping}>
                <ArrowLeft size={16} />
                Continue Shopping
              </Link>
            </aside>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
