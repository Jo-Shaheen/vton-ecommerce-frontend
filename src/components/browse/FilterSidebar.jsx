/* ─────────────────────────────────────────────
   AINAI – FilterSidebar Component
   Section 3: State – complex state, conditional rendering, setting state from children
───────────────────────────────────────────── */

import { CATEGORIES, BRANDS } from "../../utils/fakeData";

const v = (name) => `var(${name})`;

export default function FilterSidebar({ filters, onFilterChange }) {
  const { category, brand } = filters;

  function handleSelect(key, value) {
    // Toggle: clicking the active filter clears it
    onFilterChange({ ...filters, [key]: filters[key] === value ? "" : value });
  }

  function handleReset() {
    onFilterChange({ category: "", brand: "" });
  }

  const hasActiveFilters = category || brand;

  return (
    <aside
      style={{
        width: "220px",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: v("--space-6"),
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h4
          style={{
            fontFamily: v("--font-serif"),
            fontSize: v("--text-base"),
            margin: 0,
          }}
        >
          Filters
        </h4>
        {hasActiveFilters && (
          <button
            onClick={handleReset}
            style={{
              fontSize: v("--text-xs"),
              color: v("--burgundy"),
              cursor: "pointer",
              background: "none",
              border: "none",
              textDecoration: "underline",
            }}
          >
            Clear all
          </button>
        )}
      </div>

      {/* Category */}
      <div>
        <p
          style={{
            fontSize: v("--text-xs"),
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: v("--tracking-wide"),
            color: v("--charcoal-muted"),
            marginBottom: v("--space-3"),
          }}
        >
          Category
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: v("--space-1") }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleSelect("category", cat)}
              style={{
                textAlign: "left",
                padding: `${v("--space-2")} ${v("--space-3")}`,
                borderRadius: v("--radius-sm"),
                fontSize: v("--text-sm"),
                cursor: "pointer",
                background: category === cat ? "rgba(139,72,82,0.1)" : "transparent",
                color: category === cat ? "var(--burgundy)" : "var(--charcoal)",
                fontWeight: category === cat ? 600 : 400,
                border: "none",
                transition: `all ${v("--transition-fast")}`,
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Brand */}
      <div>
        <p
          style={{
            fontSize: v("--text-xs"),
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: v("--tracking-wide"),
            color: v("--charcoal-muted"),
            marginBottom: v("--space-3"),
          }}
        >
          Brand
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: v("--space-1") }}>
          {BRANDS.map((b) => (
            <button
              key={b}
              onClick={() => handleSelect("brand", b)}
              style={{
                textAlign: "left",
                padding: `${v("--space-2")} ${v("--space-3")}`,
                borderRadius: v("--radius-sm"),
                fontSize: v("--text-sm"),
                cursor: "pointer",
                background: brand === b ? "rgba(139,72,82,0.1)" : "transparent",
                color: brand === b ? "var(--burgundy)" : "var(--charcoal)",
                fontWeight: brand === b ? 600 : 400,
                border: "none",
                transition: `all ${v("--transition-fast")}`,
              }}
            >
              {b}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
