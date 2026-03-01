import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import TryOnHistory from '../components/vton/TryOnHistory';
import styles from '../styles/TryOnHistoryPage.module.css';

// Mock try-on history
const mockHistory = [
  {
    id: 1,
    productName: 'Embroidered Kaftan',
    productPrice: 399.99,
    image: 'https://via.placeholder.com/300x400',
    dateCreated: '2025-02-28'
  },
  {
    id: 2,
    productName: 'Classic Abaya',
    productPrice: 299.99,
    image: 'https://via.placeholder.com/300x400',
    dateCreated: '2025-02-27'
  },
  {
    id: 3,
    productName: 'Silk Jalabiya',
    productPrice: 449.99,
    image: 'https://via.placeholder.com/300x400',
    dateCreated: '2025-02-25'
  },
  {
    id: 4,
    productName: 'Beaded Dress',
    productPrice: 549.99,
    image: 'https://via.placeholder.com/300x400',
    dateCreated: '2025-02-24'
  },
];

export default function TryOnHistoryPage() {
  return (
    <div className={styles.pageWrapper}>
      <Header />

      <main className={styles.mainContent}>
        <TryOnHistory items={mockHistory} />
      </main>

      <Footer />
    </div>
  );
}
