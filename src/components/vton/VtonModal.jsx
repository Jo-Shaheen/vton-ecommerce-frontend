/* ─────────────────────────────────────────────
   AINAI – VtonModal Component
   Section 4: Side effects – handling side effects, cleanup, refs
   Section 3: State – complex state, conditional rendering
───────────────────────────────────────────── */

import { useState, useCallback } from "react";
import Modal from "../common/Modal";
import BodyPhotoUpload from "./BodyPhotoUpload";
import TryOnResult from "./TryOnResult";
import LoadingSpinner from "../common/LoadingSpinner";
import { addTryOnEntry } from "../../utils/localStorage";

const v = (name) => `var(${name})`;

// VTON processing stages for the stepper
const STAGES = ["Upload", "Processing", "Result"];

function VtonContent({ product, onClose }) {
  const [photo, setPhoto] = useState(null);
  const [stage, setStage] = useState(0); // 0=upload, 1=processing, 2=result
  const [resultUrl, setResultUrl] = useState(null);

  // Simulate VTON API call (fake processing)
  const generateTryOn = useCallback(async () => {
    if (!photo || !product) return;

    setStage(1);

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 2500));

    // In production this would call the Flux VTON API
    // For now, generate a placeholder result
    const fakeResult = `data:image/svg+xml,${encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500">
        <rect width="400" height="500" fill="${product.color}22"/>
        <text x="200" y="230" text-anchor="middle" font-family="serif" font-size="20" fill="${product.color}">✨ ${product.name}</text>
        <text x="200" y="270" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#8a7d76">Virtual Try-On Result</text>
      </svg>`
    )}`;

    setResultUrl(fakeResult);
    setStage(2);

    // Save to history
    addTryOnEntry({
      productId: product.id,
      productName: product.name,
      resultUrl: fakeResult,
    });
  }, [photo, product]);

  function handlePhotoReady(file) {
    setPhoto(file);
  }

  function handleRetry() {
    setPhoto(null);
    setStage(0);
    setResultUrl(null);
  }

  function handleDownload() {
    if (!resultUrl) return;
    const safeName = (product?.name || "result").replace(/[^a-zA-Z0-9_-]/g, "_");
    const link = document.createElement("a");
    link.href = resultUrl;
    link.download = `ainai-tryon-${safeName}.svg`;
    link.click();
  }

  return (
    <Modal isOpen onClose={onClose} title={`Try On: ${product.name}`}>
      {/* Stepper */}
      <div className="stepper" style={{ marginBottom: v("--space-6"), justifyContent: "center" }}>
        {STAGES.map((label, i) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: v("--space-2") }}>
            {i > 0 && <div className="step-line" />}
            <div className={`step ${stage > i ? "completed" : ""} ${stage === i ? "active" : ""}`}>
              <div className="step-dot" />
              <span>{label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Stage content */}
      {stage === 0 && (
        <div>
          <BodyPhotoUpload onPhotoReady={handlePhotoReady} />
          <button
            className="btn btn-gold btn-pill"
            onClick={generateTryOn}
            disabled={!photo}
            style={{ marginTop: v("--space-6") }}
          >
            Generate Try-On
          </button>
        </div>
      )}

      {stage === 1 && (
        <LoadingSpinner size={48} message="Generating your virtual try-on…" />
      )}

      {stage === 2 && (
        <TryOnResult
          resultUrl={resultUrl}
          productName={product.name}
          onRetry={handleRetry}
          onDownload={handleDownload}
        />
      )}
    </Modal>
  );
}

export default function VtonModal({ isOpen, onClose, product }) {
  if (!isOpen || !product) return null;

  // Using key to reset all internal state when product changes
  return <VtonContent key={product.id} product={product} onClose={onClose} />;
}
