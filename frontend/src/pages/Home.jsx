import React, { useEffect, useState } from "react";
import ProductForm from "../components/ProductForm.jsx";
import ProductTable from "../components/ProductTable.jsx";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      localStorage.setItem("jwt", code);
      console.log("Stored JWT/Code:", code);
    }
  }, []);
  return (
    <div className="container">
      <h1 className="title">Products WebApp</h1>

      <ProductForm setProducts={setProducts} />

      <h2 className="subtitle">All Products</h2>
      <button className="refresh-btn">Refresh</button>

      <ProductTable products={products} setProducts={setProducts} />
    </div>
  );
}

export default Home;