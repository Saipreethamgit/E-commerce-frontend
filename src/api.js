const API_BASE = "http://localhost:8080/api"; // adjust if your backend URL is different

// CART API
export async function fetchCart(userId) {
  const res = await fetch(`${API_BASE}/cart/${userId}`);
  if (!res.ok) throw new Error("Failed to fetch cart");
  return await res.json();
}

export async function addOrUpdateCartItem({ userId, productId, quantity }) {
  const res = await fetch(`${API_BASE}/cart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, productId, quantity }),
  });
  if (!res.ok) throw new Error("Failed to add/update cart item");
  return await res.json();
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
    body: JSON.stringify({ userId, productId }),
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
