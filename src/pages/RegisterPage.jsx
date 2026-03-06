/* ─────────────────────────────────────────────
   AINAI – RegisterPage
   Section 3: State – forms, complex state
   Section 4: Side effects – controlled components
───────────────────────────────────────────── */

import { useNavigate } from "react-router-dom";
import RegistrationForm from "../components/auth/RegistrationForm";
import { useAuth } from "../context/useAuth";

const v = (name) => `var(${name})`;

export default function RegisterPage() {
  const { register, isLoading, error } = useAuth();
  const navigate = useNavigate();

  async function handleRegister(name, email, password) {
    const success = await register(name, email, password);
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
        <RegistrationForm onSubmit={handleRegister} isLoading={isLoading} error={error} />
      </div>
    </div>
  );
}
