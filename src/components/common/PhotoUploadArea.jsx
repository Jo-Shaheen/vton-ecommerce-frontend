import { useRef, useState } from "react";
import { ImageUp } from "lucide-react";
import styles from "../../styles/PhotoUploadArea.module.css";

const ACCEPTED_FILE_TYPES = ".png, .jpeg, .jpg";

export default function PhotoUploadArea({ onFileChange }) {
  const fileInputRef = useRef(null);
  const [selectedFileName, setSelectedFileName] = useState("");

  const handleFileSelection = (event) => {
    const file = event.target.files?.[0] ?? null;
    setSelectedFileName(file?.name ?? "");
    onFileChange?.(file);
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openFilePicker();
    }
  };

  return (
    <div className={styles.uploadShell}>
      <input
        ref={fileInputRef}
        type="file"
        className={styles.fileInput}
        accept={ACCEPTED_FILE_TYPES}
        onChange={handleFileSelection}
      />

      <button
        type="button"
        className={styles.uploadZone}
        onClick={openFilePicker}
        onKeyDown={handleKeyDown}
        aria-label="Upload body photo"
      >
        <span className={styles.iconWrap}>
          <ImageUp size={44} />
        </span>
        <p className={styles.title}>
          Drag & Drop your photo or Click to upload
        </p>
        <p className={styles.subtitle}>Accepted formats: PNG, JPEG, JPG</p>
        {selectedFileName && (
          <p className={styles.fileName}>Selected: {selectedFileName}</p>
        )}
      </button>
    </div>
  );
}
