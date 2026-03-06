import { ChevronDown } from 'lucide-react';
import styles from '../../styles/FilterSidebar.module.css';
import { useState } from 'react';

export default function FilterSidebar() {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    size: false,
    brand: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <h2 className={styles.sidebarTitle}>Filters</h2>
        <button className={styles.resetButton}>Reset</button>
      </div>

      {/* Category Filter */}
      <div className={styles.filterSection}>
        <button
          className={styles.filterHeader}
          onClick={() => toggleSection('category')}
        >
          <span>Category</span>
          <ChevronDown 
            size={20} 
            className={expandedSections.category ? styles.chevronOpen : ''}
          />
        </button>
        {expandedSections.category && (
          <div className={styles.filterOptions}>
            <label className={styles.filterLabel}>
              <input type="checkbox" className={styles.checkbox} />
              <span>Abayas</span>
            </label>
            <label className={styles.filterLabel}>
              <input type="checkbox" className={styles.checkbox} />
              <span>Dresses</span>
            </label>
            <label className={styles.filterLabel}>
              <input type="checkbox" className={styles.checkbox} />
              <span>Kaftans</span>
            </label>
            <label className={styles.filterLabel}>
              <input type="checkbox" className={styles.checkbox} />
              <span>Jalabiyas</span>
            </label>
            <label className={styles.filterLabel}>
              <input type="checkbox" className={styles.checkbox} />
              <span>Accessories</span>
            </label>
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className={styles.filterSection}>
        <button
          className={styles.filterHeader}
          onClick={() => toggleSection('price')}
        >
          <span>Price</span>
          <ChevronDown 
            size={20} 
            className={expandedSections.price ? styles.chevronOpen : ''}
          />
        </button>
        {expandedSections.price && (
          <div className={styles.filterOptions}>
            <label className={styles.filterLabel}>
              <input type="checkbox" className={styles.checkbox} />
              <span>Under $100</span>
            </label>
            <label className={styles.filterLabel}>
              <input type="checkbox" className={styles.checkbox} />
              <span>$100 - $250</span>
            </label>
            <label className={styles.filterLabel}>
              <input type="checkbox" className={styles.checkbox} />
              <span>$250 - $500</span>
            </label>
            <label className={styles.filterLabel}>
              <input type="checkbox" className={styles.checkbox} />
              <span>$500 - $1000</span>
            </label>
            <label className={styles.filterLabel}>
              <input type="checkbox" className={styles.checkbox} />
              <span>Over $1000</span>
            </label>
          </div>
        )}
      </div>

      {/* Size Filter */}
      <div className={styles.filterSection}>
        <button
          className={styles.filterHeader}
          onClick={() => toggleSection('size')}
        >
          <span>Size</span>
          <ChevronDown 
            size={20} 
            className={expandedSections.size ? styles.chevronOpen : ''}
          />
        </button>
        {expandedSections.size && (
          <div className={styles.filterOptions}>
            <label className={styles.filterLabel}>
              <input type="checkbox" className={styles.checkbox} />
              <span>XS</span>
            </label>
            <label className={styles.filterLabel}>
              <input type="checkbox" className={styles.checkbox} />
              <span>S</span>
            </label>
            <label className={styles.filterLabel}>
              <input type="checkbox" className={styles.checkbox} />
              <span>M</span>
            </label>
            <label className={styles.filterLabel}>
              <input type="checkbox" className={styles.checkbox} />
              <span>L</span>
            </label>
            <label className={styles.filterLabel}>
              <input type="checkbox" className={styles.checkbox} />
              <span>XL</span>
            </label>
            <label className={styles.filterLabel}>
              <input type="checkbox" className={styles.checkbox} />
              <span>XXL</span>
            </label>
          </div>
        )}
      </div>

      {/* Brand Filter */}
      <div className={styles.filterSection}>
        <button
          className={styles.filterHeader}
          onClick={() => toggleSection('brand')}
        >
          <span>Brand</span>
          <ChevronDown 
            size={20} 
            className={expandedSections.brand ? styles.chevronOpen : ''}
          />
        </button>
        {expandedSections.brand && (
          <div className={styles.filterOptions}>
            <label className={styles.filterLabel}>
              <input type="checkbox" className={styles.checkbox} />
              <span>Designer</span>
            </label>
            <label className={styles.filterLabel}>
              <input type="checkbox" className={styles.checkbox} />
              <span>Premium</span>
            </label>
            <label className={styles.filterLabel}>
              <input type="checkbox" className={styles.checkbox} />
              <span>Luxury</span>
            </label>
            <label className={styles.filterLabel}>
              <input type="checkbox" className={styles.checkbox} />
              <span>Contemporary</span>
            </label>
          </div>
        )}
      </div>
    </aside>
  );
}
