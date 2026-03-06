/* ─────────────────────────────────────────────
   AINAI – ProductGrid Component
   Section 2: Data-driven – mapping data to components, reusable components
───────────────────────────────────────────── */

import ProductCard from "../common/ProductCard";

const v = (name) => `var(${name})`;

export default function ProductGrid({ products, onTryOn, onAddToCart }) {
  if (products.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: v("--space-16"),
          color: v("--charcoal-muted"),
        }}
      >
        <p style={{ fontFamily: "var(--font-serif)", fontSize: v("--text-xl"), marginBottom: v("--space-2") }}>
          No products found
        </p>
        <p style={{ fontSize: v("--text-sm") }}>Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: v("--space-6"),
        flex: 1,
      }}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onTryOn={onTryOn}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}
