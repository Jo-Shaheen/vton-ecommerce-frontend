/* ─────────────────────────────────────────────
   AINAI – ProductCard Component
   Section 2: Data-driven – reusable components, props
───────────────────────────────────────────── */

import { Eye } from "lucide-react";
import { formatPrice } from "../../utils/fakeData";

const v = (name) => `var(${name})`;

export default function ProductCard({ product, onTryOn, onAddToCart }) {
  const { name, brand, price, currency, tag, color } = product;

  return (
    <div className="card" style={{ padding: 0, overflow: "hidden" }}>
      {/* Image placeholder */}
      <div
        style={{
          height: "220px",
          background: `linear-gradient(135deg, ${color}33 0%, ${color}66 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <span
          style={{
            fontFamily: v("--font-serif"),
            fontSize: v("--text-xl"),
            color: color,
            opacity: 0.6,
          }}
        >
          {name.charAt(0)}
        </span>

        {/* Tag badge */}
        {tag && (
          <span
            className={`badge ${tag === "VTON Ready" ? "badge-ready" : tag === "Bestseller" ? "badge-burgundy" : "badge-gold"}`}
            style={{ position: "absolute", top: "12px", left: "12px" }}
          >
            {tag}
          </span>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: v("--space-4") }}>
        <p
          style={{
            fontSize: v("--text-xs"),
            color: v("--charcoal-muted"),
            textTransform: "uppercase",
            letterSpacing: v("--tracking-wide"),
            marginBottom: v("--space-1"),
          }}
        >
          {brand}
        </p>
        <h4
          style={{
            fontFamily: v("--font-serif"),
            fontSize: v("--text-base"),
            marginBottom: v("--space-2"),
          }}
        >
          {name}
        </h4>
        <p
          style={{
            fontWeight: 600,
            color: v("--burgundy"),
            marginBottom: v("--space-4"),
          }}
        >
          {formatPrice(price, currency)}
        </p>

        {/* Actions */}
        <div style={{ display: "flex", gap: v("--space-2") }}>
          {tag === "VTON Ready" && onTryOn && (
            <button
              className="btn btn-gold"
              style={{ flex: 1, fontSize: v("--text-sm"), padding: `${v("--space-2")} ${v("--space-3")}` }}
              onClick={() => onTryOn(product)}
              aria-label={`Try on ${name} virtually`}
            >
              <Eye size={14} />
              Try On
            </button>
          )}
          {onAddToCart && (
            <button
              className="btn btn-primary"
              style={{ flex: 1, fontSize: v("--text-sm"), padding: `${v("--space-2")} ${v("--space-3")}` }}
              onClick={() => onAddToCart(product)}
              aria-label={`Add ${name} to cart`}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
