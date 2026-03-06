import { Search, X } from 'lucide-react';
import styles from '../../styles/SearchBar.module.css';

export default function SearchBar({ value = '', onSearch, onClear }) {
  return (
    <div className={styles.searchBarWrapper}>
      <div className={styles.searchBarContainer}>
        <Search className={styles.searchIcon} size={20} />
        <input
          type="text"
          placeholder="Search for products, styles, or collections..."
          className={styles.searchInput}
          value={value}
          onChange={(e) => onSearch?.(e.target.value)}
        />
        {value && (
          <button 
            className={styles.clearButton}
            onClick={onClear}
            aria-label="Clear search"
          >
            <X size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
