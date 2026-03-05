import {
  Plus,
  Search,
  Edit3,
  Trash2,
  Eye,
  MoreVertical,
  Filter,
  ArrowUpDown,
  ImageIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import VendorSidebar from "../components/vendor/VendorSidebar";
import VendorHeader from "../components/vendor/VendorHeader";
import styles from "../styles/VendorProductsPage.module.css";

/* ── Static demo data ── */
const products = [
  {
    id: 1,
    name: "Silk Evening Gown",
    category: "Dresses",
    price: "$389.00",
    stock: 24,
    status: "Active",
    vtonEnabled: true,
    image: "",
  },
  {
    id: 2,
    name: "Cashmere Wrap Dress",
    category: "Dresses",
    price: "$275.00",
    stock: 18,
    status: "Active",
    vtonEnabled: true,
    image: "",
  },
  {
    id: 3,
    name: "Embroidered Kaftan",
    category: "Traditional",
    price: "$450.00",
    stock: 7,
    status: "Active",
    vtonEnabled: false,
    image: "",
  },
  {
    id: 4,
    name: "Linen Palazzo Set",
    category: "Casual",
    price: "$195.00",
    stock: 0,
    status: "Out of Stock",
    vtonEnabled: true,
    image: "",
  },
  {
    id: 5,
    name: "Beaded Clutch Bag",
    category: "Accessories",
    price: "$120.00",
    stock: 42,
    status: "Active",
    vtonEnabled: false,
    image: "",
  },
  {
    id: 6,
    name: "Velvet Abaya",
    category: "Traditional",
    price: "$520.00",
    stock: 12,
    status: "Draft",
    vtonEnabled: true,
    image: "",
  },
  {
    id: 7,
    name: "Satin Blazer",
    category: "Outerwear",
    price: "$310.00",
    stock: 15,
    status: "Active",
    vtonEnabled: true,
    image: "",
  },
  {
    id: 8,
    name: "Pearl Drop Earrings",
    category: "Accessories",
    price: "$85.00",
    stock: 60,
    status: "Active",
    vtonEnabled: false,
    image: "",
  },
];

const statusMap = {
  Active: "active",
  Draft: "draft",
  "Out of Stock": "outOfStock",
};

export default function VendorProductsPage() {
  return (
    <div className={styles.layout}>
      <VendorSidebar activeRoute="/vendor/products" />

      <div className={styles.main}>
        <VendorHeader />

        <div className={styles.content}>
          {/* Page heading */}
          <div className={styles.pageHead}>
            <div>
              <h1 className={styles.pageTitle}>My Products</h1>
              <p className={styles.pageSubtitle}>
                {products.length} products in your store
              </p>
            </div>
            <button className={styles.addBtn}>
              <Plus size={16} />
              Add New Product
            </button>
          </div>

          {/* Toolbar */}
          <div className={styles.toolbar}>
            <div className={styles.searchBox}>
              <Search size={16} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search products..."
                className={styles.searchInput}
              />
            </div>

            <div className={styles.toolbarRight}>
              <button className={styles.filterBtn}>
                <Filter size={14} />
                Filter
              </button>
              <button className={styles.filterBtn}>
                <ArrowUpDown size={14} />
                Sort
              </button>
            </div>
          </div>

          {/* Products table */}
          <div className={styles.tableCard}>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.checkCol}>
                      <input type="checkbox" className={styles.checkbox} />
                    </th>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Status</th>
                    <th>VTON</th>
                    <th className={styles.actionsCol}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id}>
                      <td className={styles.checkCol}>
                        <input type="checkbox" className={styles.checkbox} />
                      </td>
                      <td>
                        <div className={styles.productCell}>
                          <div className={styles.productThumb}>
                            <ImageIcon size={18} />
                          </div>
                          <span className={styles.productName}>{p.name}</span>
                        </div>
                      </td>
                      <td>
                        <span className={styles.categoryTag}>{p.category}</span>
                      </td>
                      <td className={styles.price}>{p.price}</td>
                      <td>
                        <span className={p.stock === 0 ? styles.stockZero : ""}>
                          {p.stock}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`${styles.statusBadge} ${styles[statusMap[p.status]]}`}
                        >
                          {p.status}
                        </span>
                      </td>
                      <td>
                        {p.vtonEnabled ? (
                          <span className={styles.vtonOn}>
                            <Eye size={14} /> On
                          </span>
                        ) : (
                          <span className={styles.vtonOff}>Off</span>
                        )}
                      </td>
                      <td className={styles.actionsCol}>
                        <div className={styles.actions}>
                          <button className={styles.actionBtn} title="Edit">
                            <Edit3 size={15} />
                          </button>
                          <button
                            className={`${styles.actionBtn} ${styles.deleteBtn}`}
                            title="Delete"
                          >
                            <Trash2 size={15} />
                          </button>
                          <button className={styles.actionBtn} title="More">
                            <MoreVertical size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination placeholder */}
            <div className={styles.pagination}>
              <span className={styles.pageInfo}>
                Showing 1-8 of {products.length} products
              </span>
              <div className={styles.pageButtons}>
                <button className={styles.pageBtn} disabled>
                  Previous
                </button>
                <button className={`${styles.pageBtn} ${styles.pageBtnActive}`}>
                  1
                </button>
                <button className={styles.pageBtn}>2</button>
                <button className={styles.pageBtn}>Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
