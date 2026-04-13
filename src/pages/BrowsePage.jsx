import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import SearchBar from "../components/browse/SearchBar";
import FilterSidebar from "../components/browse/FilterSidebar";
import ProductGrid from "../components/browse/ProductGrid";
import ProductCard from "../components/common/ProductCard";
import apiClient from "../utils/apiClient";
import styles from "../styles/BrowsePage.module.css";

const SORT_OPTIONS = [
  { value: "POPULAR", label: "Most Popular" },
  { value: "NEWEST", label: "Newest First" },
  { value: "OLDEST", label: "Oldest First" },
  { value: "PRICE_ASC", label: "Price: Low to High" },
  { value: "PRICE_DESC", label: "Price: High to Low" },
  { value: "NAME_ASC", label: "Name: A to Z" },
  { value: "NAME_DESC", label: "Name: Z to A" },
];

function buildPageNumbers(currentPage, totalPages) {
  if (totalPages <= 1) return [1];

  const maxButtons = 5;
  let start = Math.max(1, currentPage - Math.floor(maxButtons / 2));
  let end = Math.min(totalPages, start + maxButtons - 1);

  if (end - start + 1 < maxButtons) {
    start = Math.max(1, end - maxButtons + 1);
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export default function BrowsePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recentProducts, setRecentProducts] = useState([]);

  const currentPage = Number(searchParams.get("page") ?? "1");
  const currentLimit = Number(searchParams.get("limit") ?? "20");
  const currentQ = searchParams.get("q") ?? "";
  const currentSort = searchParams.get("sort") ?? "POPULAR";
  const searchParamsString = searchParams.toString();

  const totalPages = Math.max(1, Math.ceil(total / currentLimit));
  const pageNumbers = useMemo(
    () => buildPageNumbers(currentPage, totalPages),
    [currentPage, totalPages],
  );

  const showingFrom = total === 0 ? 0 : (currentPage - 1) * currentLimit + 1;
  const showingTo = Math.min(currentPage * currentLimit, total);

  const updateFilter = useCallback(
    (keyOrUpdates, value) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev.toString());

        // Helper function to apply a single filter logic
        const applyUpdate = (k, v) => {
          if (
            v === null ||
            v === "" ||
            v === undefined ||
            (Array.isArray(v) && v.length === 0)
          ) {
            next.delete(k);
          } else {
            next.set(k, Array.isArray(v) ? v.join(",") : String(v));
          }
        };

        // Check if we passed an object of multiple updates (e.g., { minPrice, maxPrice })
        if (
          typeof keyOrUpdates === "object" &&
          keyOrUpdates !== null &&
          !Array.isArray(keyOrUpdates)
        ) {
          Object.entries(keyOrUpdates).forEach(([k, v]) => applyUpdate(k, v));
        } else {
          // Standard single update (e.g., "q", "shirts")
          applyUpdate(keyOrUpdates, value);
        }

        next.set("page", "1");
        return next;
      });
    },
    [setSearchParams],
  );

  const goToPage = useCallback(
    (pageNumber) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev.toString());
        next.set("page", String(pageNumber));
        return next;
      });
    },
    [setSearchParams],
  );

  const resetFilters = useCallback(() => {
    setSearchParams({});
  }, [setSearchParams]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const query = searchParams.toString();
        const url = query ? `/products?${query}` : "/products";
        const response = await apiClient.get(url);

        setProducts(response.data?.data ?? []);
        setTotal(response.data?.total ?? 0);
      } catch {
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchParamsString]);

  useEffect(() => {
    const fetchRecentProducts = async () => {
      try {
        const response = await apiClient.get("/products/recent");
        setRecentProducts(Array.isArray(response.data) ? response.data : []);
      } catch {
        setRecentProducts([]);
      }
    };

    fetchRecentProducts();
  }, []);

  return (
    <div className={styles.pageWrapper}>
      <Header />
      <SearchBar
        value={currentQ}
        onChange={(value) => updateFilter("q", value)}
      />

      <div className={styles.browseContainer}>
        <FilterSidebar
          searchParams={searchParams}
          onFilterChange={updateFilter}
          onReset={resetFilters}
        />

        <div className={styles.resultsArea}>
          <div className={styles.resultsToolbar}>
            {total > 0 && (
              <p className={styles.resultsCount}>
                Showing {showingFrom}-{showingTo} of {total} products
              </p>
            )}

            <select
              className={styles.sortSelect}
              value={currentSort}
              onChange={(e) => updateFilter("sort", e.target.value)}
              aria-label="Sort products"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <ProductGrid products={products} loading={loading} error={error} />

          {!loading && totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                className={styles.pageButton}
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage <= 1}
              >
                Previous
              </button>

              {pageNumbers.map((pageNumber) => (
                <button
                  key={pageNumber}
                  className={`${styles.pageButton} ${
                    pageNumber === currentPage ? styles.pageButtonActive : ""
                  }`}
                  onClick={() => goToPage(pageNumber)}
                >
                  {pageNumber}
                </button>
              ))}

              <button
                className={styles.pageButton}
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage >= totalPages}
              >
                Next
              </button>
            </div>
          )}

          {recentProducts.length > 0 && (
            <section className={styles.recentSection}>
              <h2 className={styles.recentTitle}>Recently Viewed</h2>
              <div className={styles.recentRow}>
                {recentProducts.map((product) => (
                  <div key={product.id} className={styles.recentCard}>
                    <ProductCard
                      product={product}
                      onTryOn={() => console.log("VTON Phase 7:", product.id)}
                      onAddToCart={() =>
                        console.log("Cart Phase 4:", product.id)
                      }
                    />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
