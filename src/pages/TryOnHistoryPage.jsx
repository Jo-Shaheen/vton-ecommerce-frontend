/* ─────────────────────────────────────────────
   AINAI – TryOnHistoryPage
   Full-page wrapper for Try-On History
   Section 4: Side effects – fetching data, side effect dependencies
───────────────────────────────────────────── */

import TryOnHistory from "../components/vton/TryOnHistory";

const v = (name) => `var(${name})`;

export default function TryOnHistoryPage() {
  return (
    <div style={{ maxWidth: v("--container-max"), margin: "0 auto", padding: v("--space-8") }}>
      <div style={{ marginBottom: v("--space-8") }}>
        <h1 style={{ fontFamily: v("--font-serif"), fontSize: v("--text-3xl"), marginBottom: v("--space-2") }}>
          Try-On History
        </h1>
        <p style={{ color: v("--charcoal-muted") }}>
          View and download your virtual try-on results
        </p>
      </div>

      <TryOnHistory />
    </div>
  );
}
