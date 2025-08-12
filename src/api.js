const API_BASE = "https://e-commerce-backend-6jy0.onrender.com/api"; 

export function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// Example: login
export async function loginAPI(username, password) {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
}

// CART API using auth header
export async function fetchCart(userId) {
  const res = await fetch(`${API_BASE}/api/cart`, {
    headers: { ...getAuthHeaders() }
  });
  if (!res.ok) throw new Error("Failed to fetch cart");
  return res.json();
}

export async function addOrUpdateCartItem({ productId, quantity }) {
  const res = await fetch(`${API_BASE}/api/cart`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    body: JSON.stringify({ productId, quantity }),
  });
  if (!res.ok) throw new Error("Failed to add/update cart item");
  return res.json();
}

export async function removeCartItem(userId, productId) {
  const res = await fetch(`${API_BASE}/cart/${userId}/${productId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to remove cart item");
  return await res.json();
}

// WISHLIST API
export async function fetchWishlist(userId) {
  const res = await fetch(`${API_BASE}/wishlist/${userId}`);
  if (!res.ok) throw new Error("Failed to fetch wishlist");
  return await res.json();
}

export async function addWishlistItem({ userId, productId }) {
  const res = await fetch(`${API_BASE}/wishlist`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: String(userId),
      productId: String(productId)
    }),
  });
  if (!res.ok) throw new Error("Failed to add wishlist item");
  return await res.json();
}

export async function removeWishlistItem(userId, productId) {
  const res = await fetch(`${API_BASE}/wishlist/${userId}/${productId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to remove wishlist item");
  return await res.json();
}
