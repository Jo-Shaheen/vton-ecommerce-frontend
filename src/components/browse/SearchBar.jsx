import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import styles from "../../styles/SearchBar.module.css";

export default function SearchBar({ value = "", onChange }) {
  const [inputValue, setInputValue] = useState(value);
  const skipDebounceRef = useRef(false);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    if (skipDebounceRef.current) {
      skipDebounceRef.current = false;
      return;
    }

    // THE FIX: Prevent echo. If the current input matches the prop passed from
    // the parent, do nothing. The user hasn't typed anything new.
    if (inputValue === value) {
      return;
    }

    const timeout = setTimeout(() => {
      onChange?.(inputValue);
    }, 400);

    return () => clearTimeout(timeout);
  }, [inputValue, onChange, value]);

  const handleClear = () => {
    skipDebounceRef.current = true;
    setInputValue("");
    onChange?.("");
  };

  return (
    <div className={styles.searchBarWrapper}>
      <div className={styles.searchBarContainer}>
        <Search className={styles.searchIcon} size={20} />
        <input
          type="text"
          placeholder="Search products, brands, styles..."
          className={styles.searchInput}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        {inputValue && (
          <button
            className={styles.clearButton}
            onClick={handleClear}
            aria-label="Clear search"
          >
            <X size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
