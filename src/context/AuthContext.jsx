/* ─────────────────────────────────────────────
   AINAI – Auth Context
   Provides authentication state & actions app-wide
   Section 4: Side effects – context, state from children
───────────────────────────────────────────── */

import { createContext, useState, useEffect, useCallback } from "react";
import { getAuth, saveAuth, clearAuth } from "../utils/localStorage";

const AuthContext = createContext(null);

// Fake user database for demo (no real backend)
const DEMO_USERS = [
  { email: "demo@ainai.com", password: "demo123", name: "Fatima Al-Salem" },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getAuth());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Sync to localStorage when user changes
  useEffect(() => {
    if (user) {
      saveAuth(user);
    } else {
      clearAuth();
    }
  }, [user]);

  const login = useCallback(async (email, password) => {
    setIsLoading(true);
    setError(null);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const found = DEMO_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (found) {
      const userData = { email: found.email, name: found.name };
      setUser(userData);
      setIsLoading(false);
      return true;
    }

    setError("Invalid email or password");
    setIsLoading(false);
    return false;
  }, []);

  const register = useCallback(async (name, email, password) => {
    setIsLoading(true);
    setError(null);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const exists = DEMO_USERS.some((u) => u.email === email);
    if (exists) {
      setError("An account with this email already exists");
      setIsLoading(false);
      return false;
    }

    // In a real app this would POST to a server
    DEMO_USERS.push({ email, password, name });
    const userData = { email, name };
    setUser(userData);
    setIsLoading(false);
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setError(null);
  }, []);

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError: () => setError(null),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
