import { useState } from "react";
import { AlertCircle, Download, RotateCcw, X } from "lucide-react";
import PhotoUploadArea from "../common/PhotoUploadArea";
import { multipartClient } from "../../utils/apiClient";
import styles from "../../styles/VtonModal.module.css";

const MODAL_PHASE = {
  UPLOAD: "upload",
  GENERATING: "generating",
  RESULTS: "results",
  ERROR: "error",
};

const GENERATION_ENDPOINT = "/ai/vton/generate";
const GENERATION_TIMEOUT_MS = 120000;

function isValidHttpUrl(value) {
  if (typeof value !== "string" || !value.trim()) {
    return false;
  }

  try {
    const parsedUrl = new URL(value);
    return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
  } catch {
    return false;
  }
}

function getFilenameFromUrl(value) {
  if (!isValidHttpUrl(value)) {
    return "try-on-result.png";
  }

  try {
    const url = new URL(value);
    const lastSegment = url.pathname.split("/").filter(Boolean).pop();
    if (!lastSegment) {
      return "try-on-result.png";
    }

    return lastSegment.includes(".") ? lastSegment : `${lastSegment}.png`;
  } catch {
    return "try-on-result.png";
  }
}

function extractGeneratedImageUrl(payload) {
  if (typeof payload === "string") {
    const trimmedPayload = payload.trim();
    return trimmedPayload || null;
  }

  if (!payload || typeof payload !== "object") {
    return null;
  }

  return (
    payload.generatedImageUrl ??
    payload.imageUrl ??
    payload.url ??
    payload.data?.generatedImageUrl ??
    payload.data?.imageUrl ??
    payload.data?.url ??
    null
  );
}

async function downloadImage(url) {
  const fileName = getFilenameFromUrl(url);

  try {
    const response = await fetch(url, { mode: "cors" });
    if (!response.ok) {
      throw new Error("Unable to download generated image.");
    }

    const blob = await response.blob();
    const objectUrl = window.URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = objectUrl;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => window.URL.revokeObjectURL(objectUrl), 1000);
    return;
  } catch {
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = fileName;
    anchor.target = "_blank";
    anchor.rel = "noreferrer";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  }
}

export default function TryOnModalContent({
  onClose,
  productMainImageUrl,
  productName,
}) {
  const [phase, setPhase] = useState(MODAL_PHASE.UPLOAD);
  const [selectedFile, setSelectedFile] = useState(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const canGenerate =
    Boolean(selectedFile && productMainImageUrl) &&
    phase !== MODAL_PHASE.GENERATING;

  const handleFileChange = (file) => {
    setSelectedFile(file);
  };

  const handleGenerateTryOn = async () => {
    if (!selectedFile) {
      setPhase(MODAL_PHASE.ERROR);
      setErrorMessage(
        "Please upload a clear photo before generating a try-on.",
      );
      return;
    }

    if (!isValidHttpUrl(productMainImageUrl)) {
      setPhase(MODAL_PHASE.ERROR);
      setErrorMessage(
        "The product image could not be prepared for try-on. Please try another image.",
      );
      return;
    }

    setPhase(MODAL_PHASE.GENERATING);
    setErrorMessage("");

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("productImageUrl", productMainImageUrl);

    try {
      const response = await multipartClient.post(
        GENERATION_ENDPOINT,
        formData,
        {
          timeout: GENERATION_TIMEOUT_MS,
        },
      );

      const nextImageUrl = extractGeneratedImageUrl(response.data);
      if (!nextImageUrl) {
        throw new Error("The try-on response did not include an image URL.");
      }

      setGeneratedImageUrl(nextImageUrl);
      setPhase(MODAL_PHASE.RESULTS);
    } catch (error) {
      console.error("VTON Generation failed:", error);
      const timeoutMessage =
        error?.code === "ECONNABORTED" || error?.message?.includes("timeout")
          ? "The try-on request timed out. Please try again."
          : "The try-on could not be generated. Please try again.";

      setGeneratedImageUrl("");
      setErrorMessage(timeoutMessage);
      setPhase(MODAL_PHASE.ERROR);
    }
  };

  const handleDownload = async () => {
    if (!generatedImageUrl) {
      return;
    }

    await downloadImage(generatedImageUrl);
  };

  const handleTryAgain = () => {
    setPhase(MODAL_PHASE.UPLOAD);
    setErrorMessage("");
  };

  const handleResultImageClick = () => {
    setLightboxOpen((current) => !current);
  };

  return (
    <>
      <div className={styles.modalHeader}>
        <h2 className={styles.modalTitle}>Virtual Try-On</h2>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close modal"
          type="button"
        >
          <X size={24} />
        </button>
      </div>

      <div className={styles.stepIndicator}>
        <div
          className={`${styles.step} ${
            phase === MODAL_PHASE.UPLOAD || phase === MODAL_PHASE.ERROR
              ? styles.active
              : styles.completed
          }`}
        >
          <span className={styles.stepNumber}>1</span>
          <span className={styles.stepLabel}>Upload</span>
        </div>
        <div className={styles.stepConnector} />
        <div
          className={`${styles.step} ${
            phase === MODAL_PHASE.GENERATING
              ? styles.active
              : phase === MODAL_PHASE.RESULTS
                ? styles.completed
                : ""
          }`}
        >
          <span className={styles.stepNumber}>2</span>
          <span className={styles.stepLabel}>Generating</span>
        </div>
        <div className={styles.stepConnector} />
        <div
          className={`${styles.step} ${
            phase === MODAL_PHASE.RESULTS ? styles.active : ""
          }`}
        >
          <span className={styles.stepNumber}>3</span>
          <span className={styles.stepLabel}>Results</span>
        </div>
      </div>

      <div className={styles.modalBody}>
        {phase === MODAL_PHASE.UPLOAD && (
          <div className={styles.uploadState}>
            <div className={styles.uploadPanel}>
              <h3 className={styles.panelTitle}>Upload your photo</h3>
              <p className={styles.panelDescription}>
                Add a clear front-facing photo and we will generate a virtual
                try-on for {productName || "this product"}.
              </p>
              <PhotoUploadArea onFileChange={handleFileChange} />
            </div>
          </div>
        )}

        {phase === MODAL_PHASE.GENERATING && (
          <div className={styles.loadingState}>
            <div className={styles.loadingSpinner} />
            <h3 className={styles.loadingTitle}>Creating your try-on...</h3>
            <p className={styles.loadingMessage}>
              Our AI is generating the image now. This can take a few moments.
            </p>
          </div>
        )}

        {phase === MODAL_PHASE.RESULTS && generatedImageUrl && (
          <div className={styles.resultState}>
            <button
              type="button"
              className={styles.resultImageButton}
              onClick={handleResultImageClick}
              aria-label="View generated try-on image in full screen"
            >
              <img
                src={generatedImageUrl}
                alt="Generated try-on result"
                className={styles.resultImagePreview}
              />
            </button>
            <h3 className={styles.resultTitle}>Try-on ready</h3>
            <p className={styles.resultMessage}>
              Your generated result is ready to download or view full screen.
            </p>
          </div>
        )}

        {phase === MODAL_PHASE.ERROR && (
          <div className={styles.errorState} role="alert">
            <AlertCircle size={44} className={styles.errorIcon} />
            <h3 className={styles.errorTitle}>
              We could not generate the try-on
            </h3>
            <p className={styles.errorMessage}>
              {errorMessage ||
                "The try-on could not be generated. Please try again."}
            </p>
            <button
              type="button"
              className={styles.retryButton}
              onClick={handleTryAgain}
            >
              <RotateCcw size={18} />
              <span>Back to Upload</span>
            </button>
          </div>
        )}
      </div>

      <div className={styles.modalFooter}>
        {phase === MODAL_PHASE.UPLOAD && (
          <>
            <button
              className={styles.buttonSecondary}
              onClick={onClose}
              type="button"
            >
              Cancel
            </button>
            <button
              className={styles.buttonPrimary}
              onClick={handleGenerateTryOn}
              disabled={!canGenerate}
              type="button"
            >
              Generate Try-On
            </button>
          </>
        )}

        {phase === MODAL_PHASE.GENERATING && (
          <button
            className={styles.buttonSecondary}
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
        )}

        {phase === MODAL_PHASE.RESULTS && (
          <>
            <button
              className={styles.buttonSecondary}
              onClick={handleTryAgain}
              type="button"
            >
              Try Another
            </button>
            <button
              className={styles.buttonPrimary}
              onClick={handleDownload}
              type="button"
            >
              <Download size={18} />
              <span>Download Try-On</span>
            </button>
          </>
        )}

        {phase === MODAL_PHASE.ERROR && (
          <>
            <button
              className={styles.buttonSecondary}
              onClick={onClose}
              type="button"
            >
              Cancel
            </button>
            <button
              className={styles.buttonPrimary}
              onClick={handleGenerateTryOn}
              type="button"
            >
              Generate Try-On
            </button>
          </>
        )}
      </div>

      {lightboxOpen && generatedImageUrl && (
        <div
          className={styles.lightboxOverlay}
          onClick={() => setLightboxOpen(false)}
          role="presentation"
        >
          <div className={styles.lightboxContent}>
            <img
              src={generatedImageUrl}
              alt="Generated try-on full view"
              className={styles.lightboxImage}
            />
          </div>
        </div>
      )}
    </>
  );
}
