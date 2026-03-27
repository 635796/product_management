import React, { useState } from "react";

function ProductTable({ products, onDelete, onUpdate, isAdmin }) {
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editCategory, setEditCategory] = useState("");

  function startEdit(product) {
    if (!isAdmin) return; // extra safety
    setEditingId(product.id);
    setEditName(product.name);
    setEditCategory(product.category);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditName("");
    setEditCategory("");
  }

  function saveEdit(id) {
    if (!isAdmin) return;
    onUpdate(id, { name: editName, category: editCategory });
    cancelEdit();
  }

  return (
    <table
      border="1"
      cellPadding="10"
      style={{
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "20px",
      }}
    >
      <thead>
        <tr style={{ background: "#f0f0f0" }}>
          <th>ID</th>
          <th>Name</th>
          <th>Category</th>
          <th style={{ width: "200px" }}>Actions</th>
        </tr>
      </thead>

      <tbody>
        {products.length === 0 ? (
          <tr>
            <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
              No products found.
            </td>
          </tr>
        ) : (
          products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>

              {/* ✅ Editing row (ADMIN only) */}
              {isAdmin && editingId === p.id ? (
                <>
                  <td>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      style={{ padding: "6px", width: "90%" }}
                    />
                  </td>

                  <td>
                    <input
                      type="text"
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value)}
                      style={{ padding: "6px", width: "90%" }}
                    />
                  </td>

                  <td>
                    <button
                      onClick={() => saveEdit(p.id)}
                      style={{
                        background: "green",
                        color: "white",
                        padding: "5px 10px",
                        marginRight: "10px",
                        cursor: "pointer",
                      }}
                    >
                      Save
                    </button>

                    <button
                      onClick={cancelEdit}
                      style={{
                        background: "#777",
                        color: "white",
                        padding: "5px 10px",
                        cursor: "pointer",
                      }}
                    >
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  {/* ✅ Normal read-only row */}
                  <td>{p.name}</td>
                  <td>{p.category}</td>

                  <td>
                    {/* ✅ Actions visible only to ADMIN */}
                    {isAdmin && (
                      <>
                        <button
                          onClick={() => startEdit(p)}
                          style={{
                            background: "orange",
                            color: "white",
                            padding: "5px 10px",
                            marginRight: "10px",
                            cursor: "pointer",
                          }}
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => onDelete(p.id)}
                          style={{
                            background: "red",
                            color: "white",
                            padding: "5px 10px",
                            cursor: "pointer",
                          }}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </>
              )}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default ProductTable;