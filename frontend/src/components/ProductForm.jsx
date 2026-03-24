import React, { useState } from "react";

function ProductForm({ onProductAdded }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name || !category) {
      alert("Both fields are required");
      return;
    }

    // send product back to Home.jsx
    await onProductAdded({ name, category });

    // reset fields
    setName("");
    setCategory("");
  }

  return (
    <div style={{ marginBottom: "20px" }}>
      <h3>Add New Product</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            padding: "8px",
            marginRight: "10px",
            width: "200px",
          }}
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            padding: "8px",
            marginRight: "10px",
            width: "200px",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "8px 16px",
            background: "#1a73e8",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default ProductForm;