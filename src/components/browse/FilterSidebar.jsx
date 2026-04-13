import { ChevronDown } from "lucide-react";
import styles from "../../styles/FilterSidebar.module.css";
import { useEffect, useMemo, useState } from "react";
import apiClient from "../../utils/apiClient";

const PRICE_RANGES = [
  { label: "Under 500 EGP", minPrice: 0, maxPrice: 499 },
  { label: "500 - 1000 EGP", minPrice: 500, maxPrice: 1000 },
  { label: "1001 - 2000 EGP", minPrice: 1001, maxPrice: 2000 },
  { label: "2001 - 5000 EGP", minPrice: 2001, maxPrice: 5000 },
  { label: "Over 5000 EGP", minPrice: 5001, maxPrice: null },
];

const GENDER_OPTIONS = [
  { label: "All", value: "" },
  { label: "Male", value: "MEN" },
  { label: "Female", value: "WOMEN" },
  { label: "Boys", value: "BOYS" },
  { label: "Girls", value: "GIRLS" },
  { label: "Unisex", value: "UNISEX" },
];

function parseIds(searchParams, key) {
  const value = searchParams.get(key);
  if (!value) return [];
  return value.split(",").filter(Boolean);
}

export default function FilterSidebar({
  searchParams,
  onFilterChange,
  onReset,
}) {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [brands, setBrands] = useState([]);

  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    size: true,
    color: true,
    brand: true,
    gender: true,
    stock: true,
  });

  const activeCategories = useMemo(
    () => parseIds(searchParams, "categoryIds"),
    [searchParams],
  );
  const activeColors = useMemo(
    () => parseIds(searchParams, "colorIds"),
    [searchParams],
  );
  const activeSizes = useMemo(
    () => parseIds(searchParams, "sizeIds"),
    [searchParams],
  );
  const activeBrands = useMemo(
    () => parseIds(searchParams, "brandIds"),
    [searchParams],
  );

  const activeGender = searchParams.get("gender") ?? "";
  const activeMinPrice = searchParams.get("minPrice");
  const activeMaxPrice = searchParams.get("maxPrice");
  const inStockOnly = searchParams.get("inStock") === "true";

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleId = (key, currentActive, id) => {
    const next = currentActive.includes(id)
      ? currentActive.filter((value) => value !== id)
      : [...currentActive, id];

    onFilterChange(key, next);
  };

  useEffect(() => {
    const loadFilterData = async () => {
      setLoading(true);
      try {
        const [catRes, colorRes, sizeRes, brandRes] = await Promise.all([
          apiClient.get("/categories"),
          apiClient.get("/colors"),
          apiClient.get("/sizes"),
          apiClient.get("/products/brands"),
        ]);

        setCategories(Array.isArray(catRes.data) ? catRes.data : []);
        setColors(Array.isArray(colorRes.data) ? colorRes.data : []);
        setSizes(Array.isArray(sizeRes.data) ? sizeRes.data : []);
        setBrands(Array.isArray(brandRes.data) ? brandRes.data : []);
      } catch {
        setCategories([]);
        setColors([]);
        setSizes([]);
        setBrands([]);
      } finally {
        setLoading(false);
      }
    };

    loadFilterData();
  }, []);

  const activePriceRange = PRICE_RANGES.find((range) => {
    const minMatches = String(range.minPrice) === activeMinPrice;
    const maxMatches =
      range.maxPrice === null
        ? activeMaxPrice === null
        : String(range.maxPrice) === activeMaxPrice;
    return minMatches && maxMatches;
  });

  const isPriceRangeActive = (range) => activePriceRange?.label === range.label;

  const handlePriceSelect = (range) => {
    if (isPriceRangeActive(range)) {
      onFilterChange("minPrice", null);
      onFilterChange("maxPrice", null);
      return;
    }

    onFilterChange("minPrice", String(range.minPrice));
    onFilterChange(
      "maxPrice",
      range.maxPrice === null ? null : String(range.maxPrice),
    );
  };

  const skeleton = (
    <div className={styles.filterOptions}>
      <div className={styles.skeletonLine} />
      <div className={styles.skeletonLine} />
      <div className={styles.skeletonLine} />
      <div className={styles.skeletonLine} />
    </div>
  );

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <h2 className={styles.sidebarTitle}>Filters</h2>
        <button className={styles.resetButton} onClick={onReset}>
          Reset
        </button>
      </div>

      <div className={styles.filterSection}>
        <button
          className={styles.filterHeader}
          onClick={() => toggleSection("category")}
        >
          <span>Category</span>
          <ChevronDown
            size={20}
            className={expandedSections.category ? styles.chevronOpen : ""}
          />
        </button>
        {expandedSections.category &&
          (loading ? (
            skeleton
          ) : (
            <div className={styles.filterOptions}>
              {categories.map((category) => (
                <label key={category.id} className={styles.filterLabel}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={activeCategories.includes(category.id)}
                    onChange={() =>
                      toggleId("categoryIds", activeCategories, category.id)
                    }
                  />
                  <span>{category.name}</span>
                </label>
              ))}
            </div>
          ))}
      </div>

      <div className={styles.filterSection}>
        <button
          className={styles.filterHeader}
          onClick={() => toggleSection("price")}
        >
          <span>Price</span>
          <ChevronDown
            size={20}
            className={expandedSections.price ? styles.chevronOpen : ""}
          />
        </button>
        {expandedSections.price && (
          <div className={styles.filterOptions}>
            {PRICE_RANGES.map((range) => (
              <button
                key={range.label}
                className={`${styles.priceOption} ${
                  isPriceRangeActive(range) ? styles.priceOptionActive : ""
                }`}
                onClick={() => handlePriceSelect(range)}
                aria-pressed={isPriceRangeActive(range)}
              >
                {range.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className={styles.filterSection}>
        <button
          className={styles.filterHeader}
          onClick={() => toggleSection("size")}
        >
          <span>Size</span>
          <ChevronDown
            size={20}
            className={expandedSections.size ? styles.chevronOpen : ""}
          />
        </button>
        {expandedSections.size &&
          (loading ? (
            skeleton
          ) : (
            <div className={styles.filterOptions}>
              {sizes.map((size) => (
                <label key={size.id} className={styles.filterLabel}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={activeSizes.includes(size.id)}
                    onChange={() => toggleId("sizeIds", activeSizes, size.id)}
                  />
                  <span>{size.label}</span>
                </label>
              ))}
            </div>
          ))}
      </div>

      <div className={styles.filterSection}>
        <button
          className={styles.filterHeader}
          onClick={() => toggleSection("color")}
        >
          <span>Color</span>
          <ChevronDown
            size={20}
            className={expandedSections.color ? styles.chevronOpen : ""}
          />
        </button>
        {expandedSections.color &&
          (loading ? (
            skeleton
          ) : (
            <div className={styles.swatchGrid}>
              {colors.map((color) => {
                const isActive = activeColors.includes(color.id);
                return (
                  <button
                    key={color.id}
                    className={`${styles.colorSwatch} ${isActive ? styles.colorSwatchActive : ""}`}
                    style={{ background: color.hexCode }}
                    onClick={() => toggleId("colorIds", activeColors, color.id)}
                    aria-label={color.name}
                    title={color.name}
                  >
                    {isActive && <span className={styles.swatchCheck}>✓</span>}
                  </button>
                );
              })}
            </div>
          ))}
      </div>

      <div className={styles.filterSection}>
        <button
          className={styles.filterHeader}
          onClick={() => toggleSection("brand")}
        >
          <span>Brand</span>
          <ChevronDown
            size={20}
            className={expandedSections.brand ? styles.chevronOpen : ""}
          />
        </button>
        {expandedSections.brand &&
          (loading ? (
            skeleton
          ) : (
            <div className={styles.filterOptions}>
              {brands.map((brand) => (
                <label key={brand.id} className={styles.filterLabel}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={activeBrands.includes(brand.id)}
                    onChange={() =>
                      toggleId("brandIds", activeBrands, brand.id)
                    }
                  />
                  <span>{brand.name}</span>
                </label>
              ))}
            </div>
          ))}
      </div>

      <div className={styles.filterSection}>
        <button
          className={styles.filterHeader}
          onClick={() => toggleSection("gender")}
        >
          <span>Gender</span>
          <ChevronDown
            size={20}
            className={expandedSections.gender ? styles.chevronOpen : ""}
          />
        </button>
        {expandedSections.gender && (
          <div className={styles.genderButtons}>
            {GENDER_OPTIONS.map((option) => (
              <button
                key={option.value || "all"}
                className={`${styles.genderButton} ${
                  activeGender === option.value ? styles.genderButtonActive : ""
                }`}
                onClick={() => onFilterChange("gender", option.value || null)}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className={styles.filterSection}>
        <button
          className={styles.filterHeader}
          onClick={() => toggleSection("stock")}
        >
          <span>Availability</span>
          <ChevronDown
            size={20}
            className={expandedSections.stock ? styles.chevronOpen : ""}
          />
        </button>
        {expandedSections.stock && (
          <label className={styles.filterLabel}>
            <input
              type="checkbox"
              className={styles.checkbox}
              checked={inStockOnly}
              onChange={(e) =>
                onFilterChange("inStock", e.target.checked ? "true" : null)
              }
            />
            <span>In Stock Only</span>
          </label>
        )}
      </div>
    </aside>
  );
}
