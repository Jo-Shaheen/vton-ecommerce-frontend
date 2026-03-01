import { X } from 'lucide-react';
import styles from '../../styles/VtonModal.module.css';
import { useState } from 'react';

export default function VtonModal({ isOpen, onClose }) {
  const [step, setStep] = useState('upload'); // upload, loading, result

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Virtual Try-On</h2>
          <button 
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        {/* Step Indicator */}
        {step !== 'upload' && (
          <div className={styles.stepIndicator}>
            <div className={styles.step + (step === 'upload' ? ` ${styles.active}` : step === 'result' ? ` ${styles.completed}` : '')}>
              <span className={styles.stepNumber}>1</span>
              <span className={styles.stepLabel}>Upload</span>
            </div>
            <div className={styles.stepConnector} />
            <div className={styles.step + (step === 'loading' ? ` ${styles.active}` : step === 'result' ? ` ${styles.completed}` : '')}>
              <span className={styles.stepNumber}>2</span>
              <span className={styles.stepLabel}>Processing</span>
            </div>
            <div className={styles.stepConnector} />
            <div className={styles.step + (step === 'result' ? ` ${styles.active}` : '')}>
              <span className={styles.stepNumber}>3</span>
              <span className={styles.stepLabel}>Result</span>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className={styles.modalBody}>
          {step === 'loading' && (
            <div className={styles.loadingState}>
              <div className={styles.loadingSpinner} />
              <h3 className={styles.loadingTitle}>Creating Your Try-On</h3>
              <p className={styles.loadingMessage}>
                Our AI is working its magic... This may take a few moments.
              </p>
            </div>
          )}
          
          {step === 'result' && (
            <div className={styles.resultState}>
              <div className={styles.resultImage} />
              <h3 className={styles.resultTitle}>Try-On Ready!</h3>
              <p className={styles.resultMessage}>
                Your personalized try-on is complete
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className={styles.modalFooter}>
          {step === 'upload' && (
            <>
              <button className={styles.buttonSecondary} onClick={onClose}>
                Cancel
              </button>
              <button className={styles.buttonPrimary} onClick={() => setStep('loading')}>
                Generate Try-On
              </button>
            </>
          )}
          
          {step === 'loading' && (
            <button className={styles.buttonSecondary} onClick={onClose}>
              Cancel
            </button>
          )}
          
          {step === 'result' && (
            <>
              <button className={styles.buttonSecondary} onClick={() => setStep('upload')}>
                Try Another
              </button>
              <button className={styles.buttonPrimary} onClick={onClose}>
                Done
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
