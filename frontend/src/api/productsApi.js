// 🚀 API Gateway base URL
const API_BASE =
  "https://v23i1wux59.execute-api.us-east-1.amazonaws.com/dev/products";

/**
 * GET all products
 */
export async function getProducts(idToken) {
  const response = await fetch(API_BASE, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });

  return response.json();
}

/**
 * POST → add new product
 */
export async function addProduct(idToken, product) {
  const response = await fetch(API_BASE, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${idToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  return response.json();
}

/**
 * PUT → update product by ID
 */
export async function updateProduct(idToken, id, product) {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${idToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  return response.json();
}

/**
 * DELETE → delete product by ID
 */
export async function deleteProduct(idToken, id) {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });

  return response;
}
