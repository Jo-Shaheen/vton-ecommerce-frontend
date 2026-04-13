import styles from "../../styles/VtonModal.module.css";
import TryOnModalContent from "../modal/TryOnModalContent";

export default function VtonModal({
  isOpen,
  onClose,
  productMainImageUrl,
  productName,
}) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <TryOnModalContent
          onClose={onClose}
          productMainImageUrl={productMainImageUrl}
          productName={productName}
        />
      </div>
    </div>
  );
}
