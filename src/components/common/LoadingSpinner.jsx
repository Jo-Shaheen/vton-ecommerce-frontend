/* ─────────────────────────────────────────────
   AINAI – LoadingSpinner Component
   Section 1: Static pages – custom components, styling
───────────────────────────────────────────── */

const v = (name) => `var(${name})`;

export default function LoadingSpinner({ size = 40, message = "Loading..." }) {
  return (
    <div
      role="status"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: v("--space-4"),
        padding: v("--space-12"),
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          border: `3px solid var(--ivory-dark)`,
          borderTopColor: "var(--burgundy)",
          borderRadius: v("--radius-circle"),
          animation: "spin 0.8s linear infinite",
        }}
      />
      {message && (
        <p style={{ fontSize: v("--text-sm"), color: v("--charcoal-muted") }}>{message}</p>
      )}
      <span className="sr-only">{message}</span>

      {/* Inline keyframe for spinner */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
