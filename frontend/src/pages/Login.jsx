import React from "react";
import { useAuth } from "react-oidc-context";

function Login() {
  const auth = useAuth();

  if (auth.isLoading) {
    return <div style={{ marginTop: "120px", textAlign: "center" }}>
      Loading...
    </div>;
  }

  if (auth.error) {
    return (
      <div style={{ marginTop: "120px", textAlign: "center", color: "red" }}>
        Error: {auth.error.message}
      </div>
    );
  }

  // If user is authenticated, show welcome message + logout
  if (auth.isAuthenticated) {
    return (
      <div style={{ marginTop: "120px", textAlign: "center" }}>
        <h2>Welcome {auth.user?.profile?.email}</h2>

        <button
          onClick={() => auth.removeUser()}
          style={{
            padding: "10px 20px",
            marginTop: "20px",
            fontSize: "16px",
            backgroundColor: "red",
            border: "none",
            color: "white",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    );
  }

  // Default login screen
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
