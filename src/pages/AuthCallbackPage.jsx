import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useAuth } from "../context/AuthContext";

const decodeJwtPayload = (token) => {
  const payloadPart = token?.split(".")[1];
  if (!payloadPart) {
    return null;
  }

  try {
    const base64 = payloadPart.replace(/-/g, "+").replace(/_/g, "/");
    const normalized = base64.padEnd(
      base64.length + ((4 - (base64.length % 4)) % 4),
      "=",
    );
    const decoded = atob(normalized);
    return JSON.parse(decoded);
  } catch {
    return null;
  }
};

export default function AuthCallbackPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");

    if (!accessToken || !refreshToken) {
      navigate("/auth", {
        replace: true,
        state: { error: "Google authentication failed. Please try again." },
      });
      return;
    }

    const payload = decodeJwtPayload(accessToken);
    const user = {
      id: payload?.sub || payload?.id || null,
      email: payload?.email || null,
      role: payload?.role || null,
    };

    if (!user.id || !user.email || !user.role) {
      navigate("/auth", {
        replace: true,
        state: {
          error: "Unable to read your account details. Please login again.",
        },
      });
      return;
    }

    login(user, accessToken, refreshToken);

    if (user.role === "vendor") {
      navigate("/vendor", { replace: true });
      return;
    }

    if (user.role === "admin") {
      navigate("/admin", { replace: true });
      return;
    }

    navigate("/", { replace: true });
  }, [login, navigate]);

  return <LoadingSpinner message="Signing you in with Google..." />;
}
