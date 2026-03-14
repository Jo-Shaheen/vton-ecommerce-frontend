import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/auth");
    }
  }, [token, navigate]);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>Welcome {user.name || "User"}!</h1>
      {/* Placeholder: Pass prop to CustomModal if needed */}
      {/* <CustomModal userName={user.name} onUpdateName={(newName) => setUser({ ...user, name: newName })} /> */}
    </div>
  );
}
