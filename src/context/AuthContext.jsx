import { createContext, useState, useContext, useEffect } from "react";
import {
  clearAll,
  getAccessToken,
  getUserData,
  setTokens,
  setUserData,
} from "../utils/localStorage";
import { logoutUser } from "../utils/authFunctions";

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const storedUser = getUserData();
  const storedAccessToken = getAccessToken();
  const hasSession = Boolean(storedUser && storedAccessToken);

  const [user, setUser] = useState(hasSession ? storedUser : null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(hasSession);

  useEffect(() => {
    queueMicrotask(() => {
      setIsLoading(false);
    });
  }, []);

  const login = (userData, accessToken, refreshToken) => {
    setUser(userData);
    setTokens(accessToken, refreshToken);
    setUserData(userData);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await logoutUser();
    clearAll();
    setUser(null);
    setIsAuthenticated(false);
    window.location.href = "/auth";
  };

  const userRole = user?.role ?? null;

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isLoading, userRole, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
