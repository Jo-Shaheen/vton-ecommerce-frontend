/* ─────────────────────────────────────────────
   AINAI – CartDrawer Component
   Section 3: State – conditional rendering, complex state, dynamic styles
───────────────────────────────────────────── */

import { useEffect } from "react";
import { X, ShoppingBag } from "lucide-react";
import CartItem from "./CartItem";
import { formatPrice } from "../../utils/fakeData";

const v = (name) => `var(${name})`;

export default function CartDrawer({ isOpen, onClose, items, onUpdateQuantity, onRemove, onClearCart }) {
  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const currency = items.length > 0 ? items[0].product.currency : "AED";

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(58,48,43,0.4)",
            zIndex: v("--z-overlay"),
          }}
        />
      )}

      {/* Drawer */}
      <div
        role="dialog"
        aria-label="Shopping cart"
        aria-modal={isOpen}
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "380px",
          maxWidth: "90vw",
          height: "100vh",
          background: v("--white"),
          boxShadow: v("--shadow-lg"),
          zIndex: v("--z-modal"),
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: `transform ${v("--transition-base")}`,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: v("--space-6"),
            borderBottom: v("--border-light"),
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: v("--space-2") }}>
            <ShoppingBag size={20} />
            <h3 style={{ fontFamily: v("--font-serif"), fontSize: v("--text-lg"), margin: 0 }}>
              Cart ({items.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close cart"
            style={{ cursor: "pointer", padding: "4px", background: "none", border: "none", display: "flex" }}
          >
            <X size={20} color="var(--charcoal-muted)" />
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: `0 ${v("--space-6")}` }}>
          {items.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: v("--space-12"),
                color: v("--charcoal-muted"),
              }}
            >
              <ShoppingBag size={40} strokeWidth={1} style={{ margin: "0 auto", marginBottom: v("--space-4"), opacity: 0.4 }} />
              <p style={{ fontFamily: v("--font-serif"), marginBottom: v("--space-2") }}>Your cart is empty</p>
              <p style={{ fontSize: v("--text-sm") }}>Browse our collection and add items.</p>
            </div>
          ) : (
            items.map((item) => (
              <CartItem
                key={item.product.id}
                item={item}
                onUpdateQuantity={onUpdateQuantity}
                onRemove={onRemove}
              />
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div
            style={{
              padding: v("--space-6"),
              borderTop: v("--border-light"),
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: v("--space-4"),
              }}
            >
              <span style={{ fontSize: v("--text-sm"), color: v("--charcoal-muted") }}>Total</span>
              <span
                style={{
                  fontFamily: v("--font-serif"),
                  fontSize: v("--text-xl"),
                  fontWeight: 700,
                  color: v("--charcoal"),
                }}
              >
                {formatPrice(total, currency)}
              </span>
            </div>
            <button className="btn btn-primary btn-pill" style={{ marginBottom: v("--space-2") }}>
              Checkout
            </button>
            <button
              onClick={onClearCart}
              style={{
                width: "100%",
                textAlign: "center",
                fontSize: v("--text-xs"),
                color: v("--charcoal-muted"),
                cursor: "pointer",
                padding: v("--space-2"),
                background: "none",
                border: "none",
              }}
            >
              Clear cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}
