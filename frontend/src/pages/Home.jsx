import React, { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";

import ProductForm from "../components/ProductForm.jsx";
import ProductTable from "../components/ProductTable.jsx";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../api/productsApi.js";

function Home() {
  const auth = useAuth();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ✅ STEP 1: Read roles from Cognito token */
  const groups = auth.user?.profile?.["cognito:groups"] || [];
  const isAdmin = groups.includes("ADMIN");

  useEffect(() => {
    if (auth.isAuthenticated) {
      refreshProducts();
    }
  }, [auth.isAuthenticated]);

  async function refreshProducts() {
    try {
      setLoading(true);
      const idToken = auth.user?.id_token;
      if (!idToken) return;

      const data = await getProducts(idToken);
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Product fetch failed:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleAdd(product) {
    const idToken = auth.user?.id_token;
    await addProduct(idToken, product);
    refreshProducts();
  }

  async function handleDelete(id) {
    const idToken = auth.user?.id_token;
    await deleteProduct(idToken, id);
    refreshProducts();
  }

  async function handleUpdate(id, product) {
    const idToken = auth.user?.id_token;
    await updateProduct(idToken, id, product);
    refreshProducts();
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
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        Products Management App
      </h1>

      {/* ✅ STEP 2: Allow add only for ADMIN */}
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
        onClick={refreshProducts}
      >
        Refresh
      </button>

      {loading && <p>Loading...</p>}

      {/* ✅ STEP 3: Pass isAdmin to control UI inside table */}
      <ProductTable
        products={products}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
        isAdmin={isAdmin}
      />
    </div>
  );
}

export default Home;