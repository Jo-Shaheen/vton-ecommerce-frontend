import { Navigate, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BrowsePage from "./pages/BrowsePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import AuthPage from "./pages/AuthPage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import TryOnHistoryPage from "./pages/TryOnHistoryPage";
import DashboardPage from "./pages/DashboardPage";
import VendorDashboardPage from "./pages/VendorDashboardPage";
import VendorProductsPage from "./pages/VendorProductsPage";
import VendorOrdersPage from "./pages/VendorOrdersPage";
import VendorAnalyticsPage from "./pages/VendorAnalyticsPage";
import VendorTicketsPage from "./pages/VendorTicketsPage";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/browse" element={<BrowsePage />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route
        path="/auth"
        element={isAuthenticated ? <Navigate to="/" replace /> : <AuthPage />}
      />
      <Route path="/auth/callback" element={<AuthCallbackPage />} />
      <Route
        path="/try-on-history"
        element={
          <ProtectedRoute requiredRole="customer">
            <TryOnHistoryPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute requiredRole="customer">
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/vendor"
        element={
          <ProtectedRoute requiredRole="vendor">
            <VendorDashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/vendor/products"
        element={
          <ProtectedRoute requiredRole="vendor">
            <VendorProductsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/vendor/orders"
        element={
          <ProtectedRoute requiredRole="vendor">
            <VendorOrdersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/vendor/analytics"
        element={
          <ProtectedRoute requiredRole="vendor">
            <VendorAnalyticsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/vendor/tickets"
        element={
          <ProtectedRoute requiredRole="vendor">
            <VendorTicketsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute requiredRole="customer">
            <Profile />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
