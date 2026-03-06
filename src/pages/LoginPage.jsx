/* ─────────────────────────────────────────────
   AINAI – LoginPage
   Section 3: State – forms
   Section 4: Side effects – controlled components
───────────────────────────────────────────── */

import { useNavigate } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import { useAuth } from "../context/useAuth";

const v = (name) => `var(${name})`;

export default function LoginPage() {
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();

  async function handleLogin(email, password) {
    const success = await login(email, password);
    if (success) navigate("/dashboard");
  }

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: v("--space-6"),
      }}
    >
      <div
        className="card"
        style={{ width: "100%", maxWidth: "420px", padding: v("--space-8") }}
      >
        <LoginForm onSubmit={handleLogin} isLoading={isLoading} error={error} />
      </div>
    </div>
  );
}
