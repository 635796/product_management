// 🚀 API Gateway base URL
const API_BASE =
  "https://v23i1wux59.execute-api.us-east-1.amazonaws.com/dev/products";

/**
 * GET all products
 */
export async function fetchProductsApi(idToken) {
  const response = await fetch(API_BASE, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

/**
 * POST → add new product
 */
export async function addProductApi(product, idToken) {
  const response = await fetch(API_BASE, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${idToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error("Failed to add product");
  }

  return response.json();
}

/**
 * PUT → update product by ID
 */
export async function updateProductApi(id, product, idToken) {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${idToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error("Failed to update product");
  }

  return response.json();
}

/**
 * DELETE → delete product by ID
 */
export async function deleteProductApi(id, idToken) {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete product");
  }

  return id; // return deleted ID for reducer
}