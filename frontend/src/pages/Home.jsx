import React, { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ProductForm from "../components/ProductForm.jsx";
import ProductTable from "../components/ProductTable.jsx";

import {
  fetchProductsRequest,
  addProductRequest,
  updateProductRequest,
  deleteProductRequest,
} from "../redux/actions/productActions";

function Home() {
  const auth = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* ✅ Redux state */
  const products = useSelector((state) => state.products.list);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);

  /* ✅ Read roles from Cognito token */
  const groups = auth.user?.profile?.["cognito:groups"] || [];
  const isAdmin = groups.includes("ADMIN");

  /* ✅ Fetch products via Redux Saga */
  useEffect(() => {
    if (auth.isAuthenticated) {
      dispatch(fetchProductsRequest());
    }
  }, [auth.isAuthenticated, dispatch]);

  /* ✅ Redux intent handlers */
  function handleAdd(product) {
    dispatch(addProductRequest(product));
  }

  function handleDelete(id) {
    dispatch(deleteProductRequest(id));
  }

  function handleUpdate(id, product) {
    dispatch(updateProductRequest({ id, product }));
  }

  /* ✅ Logout handler (unchanged) */
  function handleLogout() {
    auth.removeUser();

    const logoutRedirectUrl = window.location.origin + "/";

    const cognitoLogoutUrl =
      "https://us-east-1i5qc8tt6g.auth.us-east-1.amazoncognito.com/logout" +
      "?client_id=6nujo7uno7174icnbh5mf7i1dr" +
      "&logout_uri=" + encodeURIComponent(logoutRedirectUrl);

    window.location.href = cognitoLogoutUrl;
  }

  if (!auth.isAuthenticated) {
    return (
      <h2 style={{ marginTop: "100px", textAlign: "center" }}>
        Please login first
      </h2>
    );
  }

  return (
    <div
      className="container"
      style={{
        padding: "20px",
        background: "#ffffff",
        minHeight: "100vh",
        borderRadius: "10px",
        position: "relative",
      }}
    >
      {/* ✅ Logout button */}
      <button
        onClick={handleLogout}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          padding: "8px 16px",
          background: "red",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>

      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        Products Management App
      </h1>

      {/* ✅ ADMIN only */}
      {isAdmin && <ProductForm onProductAdded={handleAdd} />}

      <button
        style={{
          padding: "10px 18px",
          marginTop: "20px",
          marginBottom: "20px",
          background: "#1a73e8",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
        onClick={() => dispatch(fetchProductsRequest())}
      >
        Refresh
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* ✅ ProductTable now reads from Redux directly */}
      <ProductTable
        onDelete={handleDelete}
        onUpdate={handleUpdate}
        isAdmin={isAdmin}
      />
    </div>
  );
}

export default Home;