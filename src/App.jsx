import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BrowsePage from "./pages/BrowsePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import AuthPage from "./pages/AuthPage";
import Landingpage from "./pages/Landingpage";
import TryOnHistoryPage from "./pages/TryOnHistoryPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/browse" element={<BrowsePage />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/landing" element={<Landingpage />} />
      <Route path="/try-on-history" element={<TryOnHistoryPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  );
}

export default App;
