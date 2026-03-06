/* ─────────────────────────────────────────────
   AINAI – localStorage Utilities
   Persist cart, auth, and try-on history locally
───────────────────────────────────────────── */

const KEYS = {
  CART: "ainai_cart",
  AUTH: "ainai_auth",
  TRYON_HISTORY: "ainai_tryon_history",
};

function safeGet(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function safeSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage full or unavailable – silently ignore */
  }
}

function safeRemove(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    /* silently ignore */
  }
}

// ── Cart ──
export function getCart() {
  return safeGet(KEYS.CART) || [];
}

export function saveCart(cart) {
  safeSet(KEYS.CART, cart);
}

export function clearCart() {
  safeRemove(KEYS.CART);
}

// ── Auth ──
export function getAuth() {
  return safeGet(KEYS.AUTH);
}

export function saveAuth(user) {
  safeSet(KEYS.AUTH, user);
}

export function clearAuth() {
  safeRemove(KEYS.AUTH);
}

// ── Try-On History ──
export function getTryOnHistory() {
  return safeGet(KEYS.TRYON_HISTORY) || [];
}

export function saveTryOnHistory(history) {
  safeSet(KEYS.TRYON_HISTORY, history);
}

export function addTryOnEntry(entry) {
  const history = getTryOnHistory();
  history.unshift({ ...entry, id: Date.now(), createdAt: new Date().toISOString() });
  safeSet(KEYS.TRYON_HISTORY, history);
}

export function clearTryOnHistory() {
  safeRemove(KEYS.TRYON_HISTORY);
}
