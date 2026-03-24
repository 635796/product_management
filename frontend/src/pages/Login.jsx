import React from "react";
import cognitoConfig from "../auth/cognitoConfig.jsx";

function Login() {
  const loginUrl =
  `${cognitoConfig.domain}/login?client_id=${cognitoConfig.clientId}` +
  `&response_type=code&scope=openid&redirect_uri=${encodeURIComponent(cognitoConfig.redirectUri)}`;

  return (
    <div style={{ textAlign: "center", marginTop: "120px" }}>
      <h1>Products Management App</h1>
      <button
        onClick={() => (window.location.href = loginUrl)}
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