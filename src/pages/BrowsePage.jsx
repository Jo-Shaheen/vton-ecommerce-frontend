/* ─────────────────────────────────────────────
   AINAI – BrowsePage
   Product browsing with search, filters, and grid
   Section 2: Data-driven – mapping data, props
   Section 3: State – complex state, forms, conditional rendering
───────────────────────────────────────────── */

import { useState, useCallback } from "react";
import SearchBar from "../components/browse/SearchBar";
import FilterSidebar from "../components/browse/FilterSidebar";
import ProductGrid from "../components/browse/ProductGrid";
import VtonModal from "../components/vton/VtonModal";
import { filterProducts } from "../utils/fakeData";

const v = (name) => `var(${name})`;

export default function BrowsePage({ onAddToCart }) {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ category: "", brand: "" });
  const [vtonProduct, setVtonProduct] = useState(null);

  const products = filterProducts({ search, ...filters });

  const handleTryOn = useCallback((product) => {
    setVtonProduct(product);
  }, []);

  return (
    <div style={{ maxWidth: v("--container-max"), margin: "0 auto", padding: v("--space-8") }}>
      <div style={{ marginBottom: v("--space-8") }}>
        <h1 style={{ fontFamily: v("--font-serif"), fontSize: v("--text-3xl"), marginBottom: v("--space-2") }}>
          Browse Collection
        </h1>
        <p style={{ color: v("--charcoal-muted") }}>
          Discover modest fashion from top MENA designers
        </p>
      </div>

      <div style={{ marginBottom: v("--space-6"), maxWidth: "400px" }}>
        <SearchBar value={search} onChange={setSearch} />
      </div>

      <div style={{ display: "flex", gap: v("--space-8") }}>
        <FilterSidebar filters={filters} onFilterChange={setFilters} />
        <ProductGrid products={products} onTryOn={handleTryOn} onAddToCart={onAddToCart} />
      </div>

      <VtonModal
        isOpen={!!vtonProduct}
        onClose={() => setVtonProduct(null)}
        product={vtonProduct}
      />
    </div>
  );
}
