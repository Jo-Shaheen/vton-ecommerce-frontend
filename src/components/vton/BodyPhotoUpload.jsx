/* ─────────────────────────────────────────────
   AINAI – BodyPhotoUpload Component
   Section 4: Side effects – refs, controlled components, cleaning up side effects
───────────────────────────────────────────── */

import { useState, useRef, useEffect } from "react";
import { Upload, Camera, X } from "lucide-react";
import { compressImage, createPreviewUrl, revokePreviewUrl } from "../../utils/imageCompression";

const v = (name) => `var(${name})`;

export default function BodyPhotoUpload({ onPhotoReady, disabled = false }) {
  const [preview, setPreview] = useState(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  // Clean up preview URL on unmount
  useEffect(() => {
    return () => {
      if (preview) revokePreviewUrl(preview);
    };
  }, [preview]);

  async function handleFileSelect(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file (JPEG, PNG, etc.)");
      return;
    }

    // Validate file size (max 10MB before compression)
    if (file.size > 10 * 1024 * 1024) {
      setError("Image must be under 10 MB");
      return;
    }

    setError(null);
    setIsCompressing(true);

    try {
      const compressed = await compressImage(file);
      const url = createPreviewUrl(compressed);

      // Revoke old preview
      if (preview) revokePreviewUrl(preview);

      setPreview(url);
      onPhotoReady(compressed);
    } catch {
      setError("Failed to process image. Please try another photo.");
    } finally {
      setIsCompressing(false);
    }
  }

  function handleRemove() {
    if (preview) revokePreviewUrl(preview);
    setPreview(null);
    setError(null);
    onPhotoReady(null);
    // Reset file input
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        style={{ display: "none" }}
        aria-label="Upload body photo"
      />

      {!preview ? (
        <div
          className="upload-zone"
          onClick={() => !disabled && !isCompressing && fileInputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
          style={{
            opacity: disabled ? "var(--opacity-disabled)" : 1,
            cursor: disabled ? "not-allowed" : "pointer",
          }}
        >
          {isCompressing ? (
            <>
              <div className="animate-pulse" style={{ marginBottom: v("--space-2") }}>
                <Camera size={36} color="var(--sage)" />
              </div>
              <p style={{ fontSize: v("--text-sm"), color: v("--charcoal-muted") }}>
                Compressing image…
              </p>
            </>
          ) : (
            <>
              <Upload size={36} color="var(--sage)" style={{ marginBottom: v("--space-2") }} />
              <p style={{ fontFamily: v("--font-serif"), fontSize: v("--text-base"), marginBottom: v("--space-1") }}>
                Upload your photo
              </p>
              <p style={{ fontSize: v("--text-xs"), color: v("--charcoal-muted") }}>
                JPEG or PNG, max 10 MB. Your photo is private.
              </p>
            </>
          )}
        </div>
      ) : (
        <div style={{ position: "relative", textAlign: "center" }}>
          <img
            src={preview}
            alt="Your uploaded photo"
            style={{
              maxHeight: "280px",
              borderRadius: v("--radius-lg"),
              objectFit: "contain",
              border: v("--border-light"),
            }}
          />
          <button
            onClick={handleRemove}
            aria-label="Remove photo"
            style={{
              position: "absolute",
              top: "8px",
              right: "8px",
              width: "28px",
              height: "28px",
              borderRadius: v("--radius-circle"),
              background: "rgba(58,48,43,0.7)",
              color: v("--white"),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              border: "none",
            }}
          >
            <X size={14} />
          </button>
        </div>
      )}

      {error && (
        <p role="alert" style={{ fontSize: v("--text-xs"), color: v("--error"), marginTop: v("--space-2") }}>
          {error}
        </p>
      )}
    </div>
  );
}
