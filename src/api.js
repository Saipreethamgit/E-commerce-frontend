const API_BASE = "https://e-commerce-backend-6jy0.onrender.com"; 

export function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// LOGIN API
export async function loginAPI(email, password) {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
}


// CART API
export async function fetchCart() {
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

export async function removeCartItem(productId) {
  const res = await fetch(`${API_BASE}/api/cart/${productId}`, {
    method: "DELETE",
    headers: { ...getAuthHeaders() }
  });
  if (!res.ok) throw new Error("Failed to remove cart item");
  return res.json();
}

// WISHLIST API
export async function fetchWishlist() {
  const res = await fetch(`${API_BASE}/api/wishlist`, {
    headers: { ...getAuthHeaders() }
  });
  if (!res.ok) throw new Error("Failed to fetch wishlist");
  return res.json();
}

export async function addWishlistItem({ productId }) {
  const res = await fetch(`${API_BASE}/api/wishlist`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    body: JSON.stringify({ productId }),
  });
  if (!res.ok) throw new Error("Failed to add wishlist item");
  return res.json();
}

export async function removeWishlistItem(productId) {
  const res = await fetch(`${API_BASE}/api/wishlist/${productId}`, {
    method: "DELETE",
    headers: { ...getAuthHeaders() }
  });
  if (!res.ok) throw new Error("Failed to remove wishlist item");
  return res.json();
}
