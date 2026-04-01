import React, { Component } from "react";
import { connect } from "react-redux";

class ProductTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editingId: null,
      editName: "",
      editCategory: "",
    };
  }

  componentDidMount() {
    console.log("ProductTable mounted");
  }

  componentWillUnmount() {
    console.log("ProductTable unmounted");
  }

  startEdit = (product) => {
    if (!this.props.isAdmin) return;

    this.setState({
      editingId: product.id,
      editName: product.name,
      editCategory: product.category,
    });
  };

  cancelEdit = () => {
    this.setState({
      editingId: null,
      editName: "",
      editCategory: "",
    });
  };

  saveEdit = (id) => {
    const { editName, editCategory } = this.state;
    if (!this.props.isAdmin) return;

    this.props.onUpdate(id, {
      name: editName,
      category: editCategory,
    });

    this.cancelEdit();
  };

  render() {
    const { products, onDelete, isAdmin } = this.props;
    const { editingId, editName, editCategory } = this.state;

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

                {isAdmin && editingId === p.id ? (
                  <>
                    <td>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) =>
                          this.setState({ editName: e.target.value })
                        }
                        style={{ padding: "6px", width: "90%" }}
                      />
                    </td>

                    <td>
                      <input
                        type="text"
                        value={editCategory}
                        onChange={(e) =>
                          this.setState({ editCategory: e.target.value })
                        }
                        style={{ padding: "6px", width: "90%" }}
                      />
                    </td>

                    <td>
                      <button
                        onClick={() => this.saveEdit(p.id)}
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
                        onClick={this.cancelEdit}
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
                    <td>{p.name}</td>
                    <td>{p.category}</td>

                    <td>
                      {isAdmin && (
                        <>
                          <button
                            onClick={() => this.startEdit(p)}
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
}

/* ✅ Redux connection (replaces useSelector) */
const mapStateToProps = (state) => ({
  products: state.products.list || [],
});

export default connect(mapStateToProps)(ProductTable);