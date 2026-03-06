import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import SearchBar from '../components/browse/SearchBar';
import FilterSidebar from '../components/browse/FilterSidebar';
import ProductGrid from '../components/browse/ProductGrid';
import styles from '../styles/BrowsePage.module.css';

// Mock products
const mockProducts = [
  { id: 1, name: 'Classic Abaya', price: 299.99, image: 'https://via.placeholder.com/300x400' },
  { id: 2, name: 'Embroidered Kaftan', price: 399.99, image: 'https://via.placeholder.com/300x400' },
  { id: 3, name: 'Silk Jalabiya', price: 449.99, image: 'https://via.placeholder.com/300x400' },
  { id: 4, name: 'Beaded Dress', price: 549.99, image: 'https://via.placeholder.com/300x400' },
  { id: 5, name: 'Luxury Abaya', price: 649.99, image: 'https://via.placeholder.com/300x400' },
  { id: 6, name: 'Designer Kaftan', price: 749.99, image: 'https://via.placeholder.com/300x400' },
];

export default function BrowsePage() {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      <SearchBar />

      <div className={styles.browseContainer}>
        <FilterSidebar />
        <ProductGrid products={mockProducts} />
      </div>

      <Footer />
    </div>
  );
}
