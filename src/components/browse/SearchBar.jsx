/* ─────────────────────────────────────────────
   AINAI – SearchBar Component
   Section 3: State – event listeners, creating & changing state
───────────────────────────────────────────── */

import { Search, X } from "lucide-react";

const v = (name) => `var(${name})`;

export default function SearchBar({ value, onChange, placeholder = "Search products..." }) {
  return (
    <div style={{ position: "relative", width: "100%" }}>
      <Search
        size={18}
        color="var(--charcoal-muted)"
        style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }}
      />
      <input
        type="text"
        className="input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ paddingLeft: "40px", paddingRight: value ? "36px" : v("--space-4") }}
        aria-label="Search products"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          aria-label="Clear search"
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            padding: "4px",
          }}
        >
          <X size={16} color="var(--charcoal-muted)" />
        </button>
      )}
    </div>
  );
}
