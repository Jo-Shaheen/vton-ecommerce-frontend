/* ─────────────────────────────────────────────
   AINAI – CartItem Component
   Section 3: State – setting state from children, dynamic styles
───────────────────────────────────────────── */

import { Minus, Plus, Trash2 } from "lucide-react";
import { formatPrice } from "../../utils/fakeData";

const v = (name) => `var(${name})`;

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  const { product, quantity } = item;

  return (
    <div
      style={{
        display: "flex",
        gap: v("--space-4"),
        padding: `${v("--space-4")} 0`,
        borderBottom: v("--border-light"),
      }}
    >
      {/* Thumbnail */}
      <div
        style={{
          width: "72px",
          height: "72px",
          borderRadius: v("--radius-md"),
          background: `linear-gradient(135deg, ${product.color}33 0%, ${product.color}66 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <span style={{ fontFamily: v("--font-serif"), color: product.color, opacity: 0.6 }}>
          {product.name.charAt(0)}
        </span>
      </div>

      {/* Details */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontFamily: v("--font-serif"),
            fontSize: v("--text-sm"),
            fontWeight: 600,
            marginBottom: "2px",
          }}
          className="truncate"
        >
          {product.name}
        </p>
        <p style={{ fontSize: v("--text-xs"), color: v("--charcoal-muted"), marginBottom: v("--space-2") }}>
          {product.brand}
        </p>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Quantity controls */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: v("--space-2"),
              border: v("--border-light"),
              borderRadius: v("--radius-sm"),
              padding: "2px",
            }}
          >
            <button
              onClick={() => onUpdateQuantity(product.id, quantity - 1)}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
              style={{
                width: "28px",
                height: "28px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: quantity <= 1 ? "not-allowed" : "pointer",
                opacity: quantity <= 1 ? 0.4 : 1,
                background: "none",
                border: "none",
              }}
            >
              <Minus size={14} />
            </button>
            <span style={{ fontSize: v("--text-sm"), fontWeight: 600, minWidth: "20px", textAlign: "center" }}>
              {quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(product.id, quantity + 1)}
              aria-label="Increase quantity"
              style={{
                width: "28px",
                height: "28px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                background: "none",
                border: "none",
              }}
            >
              <Plus size={14} />
            </button>
          </div>

          {/* Price */}
          <span style={{ fontWeight: 600, color: v("--burgundy"), fontSize: v("--text-sm") }}>
            {formatPrice(product.price * quantity, product.currency)}
          </span>
        </div>
      </div>

      {/* Remove */}
      <button
        onClick={() => onRemove(product.id)}
        aria-label={`Remove ${product.name} from cart`}
        style={{
          alignSelf: "flex-start",
          cursor: "pointer",
          padding: "4px",
          background: "none",
          border: "none",
        }}
      >
        <Trash2 size={16} color="var(--charcoal-muted)" />
      </button>
    </div>
  );
}
