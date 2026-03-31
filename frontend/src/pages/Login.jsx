import React, { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";

function Login() {
  const auth = useAuth();
  const navigate = useNavigate();

  // ✅ Redirect authenticated users to Home
  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/home");
    }
  }, [auth.isAuthenticated, navigate]);

  if (auth.isLoading) {
    return (
      <div style={{ marginTop: "120px", textAlign: "center" }}>
        Loading...
      </div>
    );
  }

  if (auth.error) {
    return (
      <div style={{ marginTop: "120px", textAlign: "center", color: "red" }}>
        Error: {auth.error.message}
      </div>
    );
  }

  // ✅ Default login screen (only for unauthenticated users)
  return (
    <div style={{ marginTop: "120px", textAlign: "center" }}>
      <h1>Products WebApp</h1>

      <button
        onClick={() => auth.signinRedirect()}
        style={{
          padding: "12px 28px",
          fontSize: "18px",
          backgroundColor: "#1a73e8",
          border: "none",
          color: "#fff",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Login with Cognito
      </button>
    </div>
  );
}

export default Login;