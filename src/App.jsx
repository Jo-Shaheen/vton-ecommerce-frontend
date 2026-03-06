/* ─────────────────────────────────────────────
   AINAI – App Root
   Section 5-6: Capstone – routing, state lifting, full integration
   Demonstrates: React Router, lifted state, component composition
───────────────────────────────────────────── */

import { useState, useCallback, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import CartDrawer from "./components/cart/CartDrawer";

import HomePage from "./pages/HomePage";
import BrowsePage from "./pages/BrowsePage";
import DashboardPage from "./pages/DashboardPage";
import TryOnHistoryPage from "./pages/TryOnHistoryPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import { useAuth } from "./context/useAuth";
import { getCart, saveCart } from "./utils/localStorage";

export default function App() {
  // ── Cart state (lifted to App so Header badge & Drawer share it) ──
  const [cartItems, setCartItems] = useState(() => getCart());
  const [cartOpen, setCartOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    saveCart(cartItems);
  }, [cartItems]);

  const addToCart = useCallback((product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)}
        isAuthenticated={isAuthenticated}
      />

      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/browse" element={<BrowsePage onAddToCart={addToCart} />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/tryon-history" element={<TryOnHistoryPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </main>

      <Footer />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onClearCart={clearCart}
      />
    </div>
  );
}
