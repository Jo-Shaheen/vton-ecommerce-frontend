/* ─────────────────────────────────────────────
   AINAI – TryOnResult Component
   Section 4: Side effects – handling side effects, dynamic styles
───────────────────────────────────────────── */

import { Download, RefreshCw } from "lucide-react";

const v = (name) => `var(${name})`;

export default function TryOnResult({ resultUrl, productName, onRetry, onDownload }) {
  if (!resultUrl) return null;

  return (
    <div style={{ textAlign: "center" }}>
      <p
        style={{
          fontFamily: v("--font-serif"),
          fontSize: v("--text-base"),
          marginBottom: v("--space-4"),
          color: v("--charcoal"),
        }}
      >
        Virtual Try-On: <strong>{productName}</strong>
      </p>

      <div
        style={{
          borderRadius: v("--radius-lg"),
          overflow: "hidden",
          border: v("--border-light"),
          marginBottom: v("--space-4"),
          background: v("--ivory"),
        }}
      >
        <img
          src={resultUrl}
          alt={`Virtual try-on result for ${productName}`}
          style={{ width: "100%", maxHeight: "400px", objectFit: "contain" }}
        />
      </div>

      <div style={{ display: "flex", gap: v("--space-3"), justifyContent: "center" }}>
        <button
          className="btn btn-gold"
          onClick={onDownload}
          style={{ fontSize: v("--text-sm") }}
        >
          <Download size={16} />
          Download
        </button>
        <button
          className="btn btn-outline"
          onClick={onRetry}
          style={{ fontSize: v("--text-sm") }}
        >
          <RefreshCw size={16} />
          Try Again
        </button>
      </div>
    </div>
  );
}
