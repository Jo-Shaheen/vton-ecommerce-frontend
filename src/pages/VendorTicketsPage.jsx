import {
  Plus,
  Search,
  MessageSquare,
  Clock,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import VendorSidebar from "../components/vendor/VendorSidebar";
import VendorHeader from "../components/vendor/VendorHeader";
import styles from "../styles/VendorTicketsPage.module.css";

/* ── Static demo data ── */
const tickets = [
  {
    id: "TKT-1024",
    subject: "VTON model not loading for Silk Evening Gown",
    category: "Technical",
    priority: "High",
    status: "Open",
    created: "Feb 28, 2026",
    lastReply: "2 hrs ago",
    replies: 3,
  },
  {
    id: "TKT-1023",
    subject: "Request to update store banner image",
    category: "Account",
    priority: "Low",
    status: "In Progress",
    created: "Feb 27, 2026",
    lastReply: "5 hrs ago",
    replies: 1,
  },
  {
    id: "TKT-1022",
    subject: "Payment not received for order #ORD-2835",
    category: "Billing",
    priority: "High",
    status: "Open",
    created: "Feb 26, 2026",
    lastReply: "1 day ago",
    replies: 4,
  },
  {
    id: "TKT-1021",
    subject: "How to enable VTON for new product category?",
    category: "General",
    priority: "Medium",
    status: "Closed",
    created: "Feb 24, 2026",
    lastReply: "3 days ago",
    replies: 6,
  },
  {
    id: "TKT-1020",
    subject: "Shipping integration error for international orders",
    category: "Technical",
    priority: "Medium",
    status: "In Progress",
    created: "Feb 22, 2026",
    lastReply: "4 days ago",
    replies: 2,
  },
  {
    id: "TKT-1019",
    subject: "Bulk product upload format clarification",
    category: "General",
    priority: "Low",
    status: "Closed",
    created: "Feb 20, 2026",
    lastReply: "1 week ago",
    replies: 3,
  },
];

const statusIcon = {
  Open: AlertCircle,
  "In Progress": Loader2,
  Closed: CheckCircle2,
};

const statusClass = {
  Open: "open",
  "In Progress": "inProgress",
  Closed: "closed",
};

const priorityClass = {
  High: "high",
  Medium: "medium",
  Low: "low",
};

export default function VendorTicketsPage() {
  return (
    <div className={styles.layout}>
      <VendorSidebar activeRoute="/vendor/tickets" />

      <div className={styles.main}>
        <VendorHeader />

        <div className={styles.content}>
          {/* Head */}
          <div className={styles.pageHead}>
            <div>
              <h1 className={styles.pageTitle}>Support Tickets</h1>
              <p className={styles.pageSubtitle}>Manage your support requests</p>
            </div>
            <button className={styles.issueBtn}>
              <Plus size={16} />
              Issue New Ticket
            </button>
          </div>

          {/* Summary cards */}
          <div className={styles.summaryRow}>
            <div className={`${styles.summaryCard} ${styles.summaryOpen}`}>
              <AlertCircle size={18} />
              <div>
                <span className={styles.summaryValue}>2</span>
                <span className={styles.summaryLabel}>Open</span>
              </div>
            </div>
            <div className={`${styles.summaryCard} ${styles.summaryProgress}`}>
              <Loader2 size={18} />
              <div>
                <span className={styles.summaryValue}>2</span>
                <span className={styles.summaryLabel}>In Progress</span>
              </div>
            </div>
            <div className={`${styles.summaryCard} ${styles.summaryClosed}`}>
              <CheckCircle2 size={18} />
              <div>
                <span className={styles.summaryValue}>2</span>
                <span className={styles.summaryLabel}>Closed</span>
              </div>
            </div>
          </div>

          {/* Search bar */}
          <div className={styles.searchBox}>
            <Search size={16} className={styles.searchIcon} />
            <input type="text" placeholder="Search tickets..." className={styles.searchInput} />
          </div>

          {/* Ticket list */}
          <div className={styles.ticketList}>
            {tickets.map((t) => {
              const StatusIcon = statusIcon[t.status];
              return (
                <article key={t.id} className={styles.ticketCard}>
                  <div className={styles.ticketLeft}>
                    <div className={`${styles.statusDot} ${styles[statusClass[t.status]]}`}>
                      <StatusIcon size={16} />
                    </div>
                    <div className={styles.ticketInfo}>
                      <div className={styles.ticketTop}>
                        <span className={styles.ticketId}>{t.id}</span>
                        <span className={`${styles.priorityBadge} ${styles[priorityClass[t.priority]]}`}>
                          {t.priority}
                        </span>
                        <span className={styles.categoryTag}>{t.category}</span>
                      </div>
                      <h3 className={styles.ticketSubject}>{t.subject}</h3>
                      <div className={styles.ticketMeta}>
                        <span><Clock size={12} /> Created {t.created}</span>
                        <span><MessageSquare size={12} /> {t.replies} replies</span>
                        <span>Last reply {t.lastReply}</span>
                      </div>
                    </div>
                  </div>
                  <button className={styles.viewBtn}>
                    View <ChevronRight size={14} />
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
