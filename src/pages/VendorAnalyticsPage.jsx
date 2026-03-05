import {
  TrendingUp,
  TrendingDown,
  Eye,
  ShoppingCart,
  DollarSign,
  Users,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import VendorSidebar from "../components/vendor/VendorSidebar";
import VendorHeader from "../components/vendor/VendorHeader";
import styles from "../styles/VendorAnalyticsPage.module.css";

/* ── Static metrics ── */
const keyMetrics = [
  {
    label: "Conversion Rate",
    value: "4.2%",
    change: "+0.8%",
    trend: "up",
    icon: TrendingUp,
  },
  {
    label: "Avg Order Value",
    value: "$312",
    change: "+5.1%",
    trend: "up",
    icon: DollarSign,
  },
  {
    label: "VTON Conversion",
    value: "18.7%",
    change: "+3.2%",
    trend: "up",
    icon: Eye,
  },
  {
    label: "Return Rate",
    value: "2.1%",
    change: "-1.4%",
    trend: "down",
    icon: ShoppingCart,
  },
];

const topProducts = [
  { name: "Silk Evening Gown", views: 1240, tryOns: 312, sales: 89 },
  { name: "Cashmere Wrap Dress", views: 980, tryOns: 245, sales: 67 },
  { name: "Embroidered Kaftan", views: 870, tryOns: 198, sales: 54 },
  { name: "Velvet Abaya", views: 760, tryOns: 176, sales: 42 },
  { name: "Linen Palazzo Set", views: 620, tryOns: 134, sales: 38 },
];

/* Chart bar data (visual-only percentage heights) */
const monthlyData = [
  { month: "Sep", revenue: 35, orders: 45 },
  { month: "Oct", revenue: 52, orders: 58 },
  { month: "Nov", revenue: 68, orders: 62 },
  { month: "Dec", revenue: 90, orders: 85 },
  { month: "Jan", revenue: 75, orders: 70 },
  { month: "Feb", revenue: 82, orders: 78 },
];

export default function VendorAnalyticsPage() {
  return (
    <div className={styles.layout}>
      <VendorSidebar activeRoute="/vendor/analytics" />

      <div className={styles.main}>
        <VendorHeader />

        <div className={styles.content}>
          {/* Head */}
          <div className={styles.pageHead}>
            <div>
              <h1 className={styles.pageTitle}>Analytics</h1>
              <p className={styles.pageSubtitle}>
                Performance overview for last 30 days
              </p>
            </div>
            <div className={styles.dateRange}>
              <Calendar size={14} />
              <span>Feb 1 – Feb 28, 2026</span>
            </div>
          </div>

          {/* Key metrics row */}
          <div className={styles.metricsRow}>
            {keyMetrics.map((m) => {
              const Icon = m.icon;
              return (
                <div key={m.label} className={styles.metricCard}>
                  <div className={styles.metricIcon}>
                    <Icon size={18} />
                  </div>
                  <div className={styles.metricContent}>
                    <span className={styles.metricLabel}>{m.label}</span>
                    <div className={styles.metricBottom}>
                      <span className={styles.metricValue}>{m.value}</span>
                      <span
                        className={`${styles.metricBadge} ${m.trend === "up" ? styles.up : styles.down}`}
                      >
                        {m.trend === "up" ? (
                          <ArrowUpRight size={12} />
                        ) : (
                          <ArrowDownRight size={12} />
                        )}
                        {m.change}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Charts area */}
          <div className={styles.chartsGrid}>
            {/* Revenue & Orders chart */}
            <section className={styles.chartPanel}>
              <div className={styles.chartHead}>
                <h2 className={styles.chartTitle}>Revenue & Orders</h2>
                <div className={styles.legend}>
                  <span className={styles.legendItem}>
                    <span
                      className={`${styles.legendDot} ${styles.dotRevenue}`}
                    />
                    Revenue
                  </span>
                  <span className={styles.legendItem}>
                    <span
                      className={`${styles.legendDot} ${styles.dotOrders}`}
                    />
                    Orders
                  </span>
                </div>
              </div>

              {/* Visual bar chart */}
              <div className={styles.chartArea}>
                <div className={styles.yAxis}>
                  <span>100%</span>
                  <span>75%</span>
                  <span>50%</span>
                  <span>25%</span>
                  <span>0%</span>
                </div>
                <div className={styles.barsContainer}>
                  {monthlyData.map((d) => (
                    <div key={d.month} className={styles.barGroup}>
                      <div className={styles.bars}>
                        <div
                          className={`${styles.bar} ${styles.barRevenue}`}
                          style={{ height: `${d.revenue}%` }}
                        />
                        <div
                          className={`${styles.bar} ${styles.barOrders}`}
                          style={{ height: `${d.orders}%` }}
                        />
                      </div>
                      <span className={styles.barLabel}>{d.month}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Top products */}
            <section className={styles.chartPanel}>
              <div className={styles.chartHead}>
                <h2 className={styles.chartTitle}>Top Products</h2>
              </div>

              <div className={styles.topList}>
                {topProducts.map((p, i) => (
                  <div key={p.name} className={styles.topItem}>
                    <span className={styles.topRank}>{i + 1}</span>
                    <div className={styles.topInfo}>
                      <span className={styles.topName}>{p.name}</span>
                      <div className={styles.topStats}>
                        <span>
                          <Eye size={12} /> {p.views}
                        </span>
                        <span>
                          <Users size={12} /> {p.tryOns}
                        </span>
                        <span>
                          <ShoppingCart size={12} /> {p.sales}
                        </span>
                      </div>
                    </div>
                    {/* Visual bar */}
                    <div className={styles.topBar}>
                      <div
                        className={styles.topBarFill}
                        style={{
                          width: `${(p.sales / topProducts[0].sales) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* VTON insights panel */}
          <section className={styles.insightsPanel}>
            <div className={styles.chartHead}>
              <h2 className={styles.chartTitle}>Virtual Try-On Insights</h2>
            </div>
            <div className={styles.insightsGrid}>
              <div className={styles.insightCard}>
                <div className={`${styles.insightIcon} ${styles.iconBurgundy}`}>
                  <Eye size={20} />
                </div>
                <span className={styles.insightValue}>1,205</span>
                <span className={styles.insightLabel}>Total Try-Ons</span>
              </div>
              <div className={styles.insightCard}>
                <div className={`${styles.insightIcon} ${styles.iconGold}`}>
                  <ShoppingCart size={20} />
                </div>
                <span className={styles.insightValue}>226</span>
                <span className={styles.insightLabel}>Led to Purchase</span>
              </div>
              <div className={styles.insightCard}>
                <div className={`${styles.insightIcon} ${styles.iconSage}`}>
                  <TrendingUp size={20} />
                </div>
                <span className={styles.insightValue}>18.7%</span>
                <span className={styles.insightLabel}>VTON Conversion</span>
              </div>
              <div className={styles.insightCard}>
                <div className={`${styles.insightIcon} ${styles.iconPurple}`}>
                  <Users size={20} />
                </div>
                <span className={styles.insightValue}>892</span>
                <span className={styles.insightLabel}>Unique Users</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
