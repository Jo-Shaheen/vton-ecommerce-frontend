import {
  Search,
  Filter,
  ArrowUpDown,
  Eye,
  ChevronRight,
  Package,
  MapPin,
  Calendar,
} from "lucide-react";
import VendorSidebar from "../components/vendor/VendorSidebar";
import VendorHeader from "../components/vendor/VendorHeader";
import styles from "../styles/VendorOrdersPage.module.css";

/* ── Static demo data ── */
const orders = [
  {
    id: "#ORD-2841",
    customer: "Sara Al-Rashid",
    items: 2,
    total: "$578.00",
    date: "Feb 28, 2026",
    status: "Processing",
    address: "Riyadh, SA",
  },
  {
    id: "#ORD-2840",
    customer: "Layla Hassan",
    items: 1,
    total: "$275.00",
    date: "Feb 28, 2026",
    status: "Shipped",
    address: "Dubai, AE",
  },
  {
    id: "#ORD-2839",
    customer: "Nour Khalil",
    items: 3,
    total: "$890.00",
    date: "Feb 27, 2026",
    status: "Delivered",
    address: "Amman, JO",
  },
  {
    id: "#ORD-2838",
    customer: "Amira Fayed",
    items: 1,
    total: "$195.00",
    date: "Feb 27, 2026",
    status: "Pending",
    address: "Cairo, EG",
  },
  {
    id: "#ORD-2837",
    customer: "Dina Mansour",
    items: 2,
    total: "$240.00",
    date: "Feb 26, 2026",
    status: "Delivered",
    address: "Jeddah, SA",
  },
  {
    id: "#ORD-2836",
    customer: "Yasmin Bakr",
    items: 1,
    total: "$520.00",
    date: "Feb 26, 2026",
    status: "Cancelled",
    address: "Doha, QA",
  },
  {
    id: "#ORD-2835",
    customer: "Hana Saeed",
    items: 4,
    total: "$1,120.00",
    date: "Feb 25, 2026",
    status: "Delivered",
    address: "Manama, BH",
  },
  {
    id: "#ORD-2834",
    customer: "Reem Al-Otaibi",
    items: 1,
    total: "$310.00",
    date: "Feb 25, 2026",
    status: "Processing",
    address: "Riyadh, SA",
  },
];

const statusTabs = [
  "All",
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

const statusClass = {
  Pending: "pending",
  Processing: "processing",
  Shipped: "shipped",
  Delivered: "delivered",
  Cancelled: "cancelled",
};

export default function VendorOrdersPage() {
  return (
    <div className={styles.layout}>
      <VendorSidebar activeRoute="/vendor/orders" />

      <div className={styles.main}>
        <VendorHeader />

        <div className={styles.content}>
          {/* Head */}
          <div className={styles.pageHead}>
            <div>
              <h1 className={styles.pageTitle}>Orders</h1>
              <p className={styles.pageSubtitle}>
                {orders.length} orders this month
              </p>
            </div>
          </div>

          {/* Tabs + toolbar */}
          <div className={styles.toolbar}>
            <div className={styles.tabs}>
              {statusTabs.map((tab) => (
                <button
                  key={tab}
                  className={`${styles.tab} ${tab === "All" ? styles.tabActive : ""}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className={styles.toolbarRight}>
              <div className={styles.searchBox}>
                <Search size={14} className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search orders..."
                  className={styles.searchInput}
                />
              </div>
              <button className={styles.filterBtn}>
                <Filter size={14} /> Filter
              </button>
            </div>
          </div>

          {/* Order list (card-based) */}
          <div className={styles.orderList}>
            {orders.map((o) => (
              <article key={o.id} className={styles.orderCard}>
                <div className={styles.orderTop}>
                  <div className={styles.orderMeta}>
                    <span className={styles.orderId}>{o.id}</span>
                    <span
                      className={`${styles.statusBadge} ${styles[statusClass[o.status]]}`}
                    >
                      {o.status}
                    </span>
                  </div>
                  <button className={styles.viewBtn}>
                    View <ChevronRight size={14} />
                  </button>
                </div>

                <div className={styles.orderBody}>
                  <div className={styles.orderDetail}>
                    <span className={styles.detailLabel}>Customer</span>
                    <span className={styles.detailValue}>{o.customer}</span>
                  </div>
                  <div className={styles.orderDetail}>
                    <span className={styles.detailLabel}>
                      <Package size={13} /> Items
                    </span>
                    <span className={styles.detailValue}>{o.items}</span>
                  </div>
                  <div className={styles.orderDetail}>
                    <span className={styles.detailLabel}>
                      <MapPin size={13} /> Address
                    </span>
                    <span className={styles.detailValue}>{o.address}</span>
                  </div>
                  <div className={styles.orderDetail}>
                    <span className={styles.detailLabel}>
                      <Calendar size={13} /> Date
                    </span>
                    <span className={styles.detailValue}>{o.date}</span>
                  </div>
                </div>

                <div className={styles.orderFooter}>
                  <span className={styles.orderTotal}>{o.total}</span>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          <div className={styles.pagination}>
            <span className={styles.pageInfo}>
              Showing 1-8 of {orders.length} orders
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
  );
}
