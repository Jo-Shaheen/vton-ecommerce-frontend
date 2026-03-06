/* ─────────────────────────────────────────────
   AINAI – TryOnHistory Component
   Section 4: Side effects – fetching data, side effect dependencies
───────────────────────────────────────────── */

import { useState } from "react";
import { Download, Trash2, Clock } from "lucide-react";
import { getTryOnHistory, clearTryOnHistory } from "../../utils/localStorage";

const v = (name) => `var(${name})`;

export default function TryOnHistory() {
  const [history, setHistory] = useState(() => getTryOnHistory());

  function handleClearAll() {
    clearTryOnHistory();
    setHistory([]);
  }

  function formatDate(isoString) {
    return new Date(isoString).toLocaleDateString("en-AE", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  if (history.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: v("--space-12"), color: v("--charcoal-muted") }}>
        <Clock size={40} strokeWidth={1} style={{ margin: "0 auto", marginBottom: v("--space-4"), opacity: 0.4 }} />
        <p style={{ fontFamily: v("--font-serif"), marginBottom: v("--space-2") }}>No try-on history yet</p>
        <p style={{ fontSize: v("--text-sm") }}>Your virtual try-on results will appear here.</p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: v("--space-6") }}>
        <h3 style={{ fontFamily: v("--font-serif"), fontSize: v("--text-xl"), margin: 0 }}>
          Try-On History
        </h3>
        <button
          onClick={handleClearAll}
          style={{
            fontSize: v("--text-xs"),
            color: v("--charcoal-muted"),
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: v("--space-1"),
            background: "none",
            border: "none",
          }}
        >
          <Trash2 size={14} />
          Clear all
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: v("--space-4"),
        }}
      >
        {history.map((entry) => (
          <div key={entry.id} className="card" style={{ padding: 0, overflow: "hidden" }}>
            <div
              style={{
                height: "160px",
                background: v("--ivory"),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {entry.resultUrl ? (
                <img
                  src={entry.resultUrl}
                  alt={`Try-on: ${entry.productName}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <span style={{ color: v("--charcoal-muted"), fontSize: v("--text-sm") }}>
                  No preview
                </span>
              )}
            </div>
            <div style={{ padding: v("--space-3") }}>
              <p style={{ fontFamily: v("--font-serif"), fontSize: v("--text-sm"), fontWeight: 600, marginBottom: "2px" }}>
                {entry.productName}
              </p>
              <p style={{ fontSize: v("--text-xs"), color: v("--charcoal-muted"), marginBottom: v("--space-2") }}>
                {formatDate(entry.createdAt)}
              </p>
              {entry.resultUrl && (
                <a
                  href={entry.resultUrl}
                  download={`ainai-tryon-${entry.id}.svg`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: v("--text-xs"),
                    color: v("--burgundy"),
                    fontWeight: 600,
                  }}
                >
                  <Download size={12} /> Download
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
