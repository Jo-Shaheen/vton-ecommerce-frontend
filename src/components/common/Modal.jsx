/* ─────────────────────────────────────────────
   AINAI – Modal Component
   Section 3: State – conditional rendering, dynamic styles
───────────────────────────────────────────── */

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

const v = (name) => `var(${name})`;

export default function Modal({ isOpen, onClose, title, children }) {
  const overlayRef = useRef(null);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  function handleOverlayClick(e) {
    if (e.target === overlayRef.current) onClose();
  }

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: v("--z-modal"),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(58, 48, 43, 0.5)",
        backdropFilter: "blur(4px)",
        animation: "fadeIn 0.2s ease",
      }}
    >
      <div
        style={{
          background: v("--white"),
          borderRadius: v("--radius-lg"),
          boxShadow: v("--shadow-lg"),
          width: "90%",
          maxWidth: "520px",
          maxHeight: "85vh",
          overflow: "auto",
          animation: "fadeIn 0.3s ease",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: `${v("--space-4")} ${v("--space-6")}`,
            borderBottom: v("--border-light"),
          }}
        >
          <h3
            style={{
              fontFamily: v("--font-serif"),
              fontSize: v("--text-lg"),
              margin: 0,
            }}
          >
            {title}
          </h3>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            style={{
              cursor: "pointer",
              padding: "4px",
              borderRadius: v("--radius-sm"),
              background: "none",
              border: "none",
              display: "flex",
            }}
          >
            <X size={20} color="var(--charcoal-muted)" />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: v("--space-6") }}>{children}</div>
      </div>
    </div>
  );
}
