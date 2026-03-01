import { Upload, Camera } from 'lucide-react';
import styles from '../../styles/BodyPhotoUpload.module.css';
import { useState } from 'react';

export default function BodyPhotoUpload({ onPhotoSelect }) {
  const [preview, setPreview] = useState(null);

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
        onPhotoSelect?.(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className={styles.uploadContainer}>
      <h2 className={styles.uploadTitle}>Upload Your Photo</h2>
      <p className={styles.uploadDescription}>
        Show us your style! Upload a full-body photo to try on our latest collections.
      </p>

      {!preview ? (
        <>
          {/* Drop Zone */}
          <div 
            className={styles.dropZone}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <Upload className={styles.uploadIcon} size={48} />
            <h3 className={styles.dropZoneTitle}>Drag and drop your photo</h3>
            <p className={styles.dropZoneSubtitle}>or</p>
            <label className={styles.fileInputLabel}>
              <input
                type="file"
                accept="image/*"
                className={styles.fileInput}
                onChange={(e) => handleFileSelect(e.target.files?.[0])}
              />
              <span className={styles.fileInputText}>Browse files</span>
            </label>
            <p className={styles.fileHint}>JPG, PNG or GIF (max. 10MB)</p>
          </div>

          {/* Camera Option */}
          <div className={styles.divider}>
            <span>Or</span>
          </div>

          <button className={styles.cameraButton}>
            <Camera size={20} />
            <span>Take a Photo</span>
          </button>
        </>
      ) : (
        <>
          {/* Preview */}
          <div className={styles.previewWrapper}>
            <img src={preview} alt="Preview" className={styles.preview} />
          </div>

          {/* Actions */}
          <div className={styles.previewActions}>
            <button className={styles.proceedButton}>
              Proceed to Try-On
            </button>
            <button 
              className={styles.changeButton}
              onClick={() => setPreview(null)}
            >
              Change Photo
            </button>
          </div>
        </>
      )}

      {/* Guidelines */}
      <div className={styles.guidelines}>
        <h4 className={styles.guidelinesTitle}>For best results:</h4>
        <ul className={styles.guidelinesList}>
          <li>Full-body photo from head to feet</li>
          <li>Well-lit, clear background</li>
          <li>Wearing fitted clothing</li>
          <li>Standing straight and facing camera</li>
        </ul>
      </div>
    </div>
  );
}
