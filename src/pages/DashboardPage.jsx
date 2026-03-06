/* ─────────────────────────────────────────────
   AINAI – DashboardPage
   User dashboard with KPI cards and quick actions
   Section 3: State – props vs. state, conditional rendering
   Section 4: Side effects – fetching data
───────────────────────────────────────────── */

import { Eye, ShoppingBag, Clock, TrendingUp } from "lucide-react";
import { useAuth } from "../context/useAuth";
import { getTryOnHistory, getCart } from "../utils/localStorage";
import { Link } from "react-router-dom";

const v = (name) => `var(${name})`;

function KpiCard({ icon, value, label, borderColor = "var(--burgundy)" }) {
  const Icon = icon;
  return (
    <div className="kpi-card" style={{ borderLeftColor: borderColor }}>
      <div style={{ display: "flex", alignItems: "center", gap: v("--space-3"), marginBottom: v("--space-3") }}>
        <Icon size={20} color={borderColor} />
      </div>
      <div className="kpi-value">{value}</div>
      <div className="kpi-label">{label}</div>
    </div>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const tryOnHistory = getTryOnHistory();
  const cartItems = getCart();

  return (
    <div style={{ maxWidth: v("--container-max"), margin: "0 auto", padding: v("--space-8") }}>
      {/* Welcome */}
      <div style={{ marginBottom: v("--space-8") }}>
        <h1 style={{ fontFamily: v("--font-serif"), fontSize: v("--text-3xl"), marginBottom: v("--space-2") }}>
          Welcome{user ? `, ${user.name}` : ""}
        </h1>
        <p style={{ color: v("--charcoal-muted") }}>Here&apos;s your AINAI overview</p>
      </div>

      {/* KPI Grid */}
      <div className="kpi-grid" style={{ marginBottom: v("--space-10") }}>
        <KpiCard icon={Eye} value={tryOnHistory.length} label="Try-Ons" borderColor="var(--gold)" />
        <KpiCard icon={ShoppingBag} value={cartItems.length} label="Cart Items" borderColor="var(--burgundy)" />
        <KpiCard icon={Clock} value="7 days" label="Photo Retention" borderColor="var(--sage)" />
        <KpiCard icon={TrendingUp} value="8" label="Products Available" borderColor="var(--charcoal)" />
      </div>

      {/* Quick Actions */}
      <div>
        <h3 style={{ fontFamily: v("--font-serif"), fontSize: v("--text-xl"), marginBottom: v("--space-6") }}>
          Quick Actions
        </h3>
        <div style={{ display: "flex", gap: v("--space-4"), flexWrap: "wrap" }}>
          <Link to="/browse" className="btn btn-primary">
            Browse Products
          </Link>
          <Link to="/tryon-history" className="btn btn-gold">
            View Try-On History
          </Link>
        </div>
      </div>
    </div>
  );
}
