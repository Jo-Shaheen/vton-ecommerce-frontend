import {
  Clock,
  Package,
  CreditCard,
  Eye,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import VendorSidebar from "../components/vendor/VendorSidebar";
import VendorHeader from "../components/vendor/VendorHeader";
import VendorStatsCards from "../components/vendor/VendorStatsCards";
import styles from "../styles/VendorDashboardPage.module.css";

/* ── Static demo data (visual only) ── */
const recentOrders = [
  { id: "#ORD-2841", customer: "Sara Al-Rashid", product: "Silk Evening Gown", amount: "$389.00", status: "Processing", time: "12 min ago" },
  { id: "#ORD-2840", customer: "Layla Hassan", product: "Cashmere Wrap Dress", amount: "$275.00", status: "Shipped", time: "1 hr ago" },
  { id: "#ORD-2839", customer: "Nour Khalil", product: "Embroidered Kaftan", amount: "$450.00", status: "Delivered", time: "3 hrs ago" },
  { id: "#ORD-2838", customer: "Amira Fayed", product: "Linen Palazzo Set", amount: "$195.00", status: "Pending", time: "5 hrs ago" },
  { id: "#ORD-2837", customer: "Dina Mansour", product: "Beaded Clutch Bag", amount: "$120.00", status: "Delivered", time: "8 hrs ago" },
];

const recentActivity = [
  { icon: Package,    text: "New product \"Velvet Abaya\" was added", time: "30 min ago" },
  { icon: CreditCard, text: "Payment of $389.00 received from Sara", time: "1 hr ago" },
  { icon: Eye,        text: "12 new virtual try-ons on Silk Evening Gown", time: "2 hrs ago" },
  { icon: Package,    text: "Stock updated for Cashmere Wrap Dress", time: "4 hrs ago" },
];

const statusClass = {
  Pending:    "pending",
  Processing: "processing",
  Shipped:    "shipped",
  Delivered:  "delivered",
};

export default function VendorDashboardPage() {
  return (
    <div className={styles.layout}>
      <VendorSidebar activeRoute="/vendor" />

      <div className={styles.main}>
        <VendorHeader />

        <div className={styles.content}>
          {/* Page heading */}
          <div className={styles.pageHead}>
            <div>
              <h1 className={styles.pageTitle}>Dashboard</h1>
              <p className={styles.pageSubtitle}>Welcome back! Here's your store overview.</p>
            </div>
            <Link to="/vendor/products" className={styles.primaryBtn}>
              <Package size={16} />
              Add Product
            </Link>
          </div>

          {/* Stat cards */}
          <VendorStatsCards />

          {/* Two-column area */}
          <div className={styles.twoCol}>
            {/* Recent orders table */}
            <section className={styles.panel}>
              <div className={styles.panelHead}>
                <h2 className={styles.panelTitle}>Recent Orders</h2>
                <Link to="/vendor/orders" className={styles.viewAll}>
                  View All <ArrowRight size={14} />
                </Link>
              </div>

              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Order</th>
                      <th>Customer</th>
                      <th>Product</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((o) => (
                      <tr key={o.id}>
                        <td className={styles.orderId}>{o.id}</td>
                        <td>{o.customer}</td>
                        <td>{o.product}</td>
                        <td className={styles.amount}>{o.amount}</td>
                        <td>
                          <span className={`${styles.statusBadge} ${styles[statusClass[o.status]]}`}>
                            {o.status}
                          </span>
                        </td>
                        <td className={styles.time}>{o.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Activity feed */}
            <section className={styles.panel}>
              <div className={styles.panelHead}>
                <h2 className={styles.panelTitle}>Recent Activity</h2>
              </div>

              <ul className={styles.activityList}>
                {recentActivity.map((a, i) => {
                  const Icon = a.icon;
                  return (
                    <li key={i} className={styles.activityItem}>
                      <div className={styles.activityIcon}>
                        <Icon size={16} />
                      </div>
                      <div className={styles.activityContent}>
                        <p className={styles.activityText}>{a.text}</p>
                        <span className={styles.activityTime}>
                          <Clock size={12} /> {a.time}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
