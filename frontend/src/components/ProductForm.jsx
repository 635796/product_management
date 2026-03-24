import React, { useState } from "react";

function ProductForm({ setProducts }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

  const handleSave = () => {
    if (!name || !category) return;

    setProducts((prev) => [
      ...prev,
      {
        id: prev.length + 1, // TEMPORARY for UI only, backend will override later
        name,
        category,
      },
    ]);

    setName("");
    setCategory("");
  };

  return (
    <div className="form-section">
      <input
        className="input-box"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="input-box"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <button className="save-btn" onClick={handleSave}>
        Save
      </button>
    </div>
  );
}

export default ProductForm;