const USER_KEY = "userInfo";
const TOKEN_KEY = "Authorization";
const REFRESH_TOKEN_KEY = "refresh_token";
const MENU_KEY = "user-menu";

/**
 * Safely set an item in sessionStorage.
 * @param {string} key - The storage key.
 * @param {any} data - The data to store.
 */
function safeSetItem(key, data) {
  if (!key || typeof key !== "string") {
    console.warn("Storage key must be a non-empty string.");
    return;
  }

  try {
    const serializedData = data == null || typeof data === "string" ? data : JSON.stringify(data);
    sessionStorage.setItem(key, serializedData);
  } catch (error) {
    console.error(`Failed to set item for key "${key}":`, error);
  }
}

/**
 * Safely get an item from sessionStorage.
 * @param {string} key - The storage key.
 * @returns {any|null} - The retrieved value or null if not found.
 */
function safeGetItem(key) {
  if (!key || typeof key !== "string") {
    console.warn("Storage key must be a non-empty string.");
    return null;
  }

  try {
    const rawData = sessionStorage.getItem(key);
    return rawData ? JSON.parse(rawData) : rawData;
  } catch (error) {
    console.error(`Failed to get item for key "${key}":`, error);
    return null;
  }
}

export class User {
  setUserInfo(data) {
    safeSetItem(USER_KEY, data);
  }

  getUserInfo() {
    return safeGetItem(USER_KEY);
  }

  setToken(data) {
    if (typeof data === "string") {
      safeSetItem(TOKEN_KEY, data);
    } else {
      console.warn("Token must be a string.");
    }
  }

  getToken() {
    return sessionStorage.getItem(TOKEN_KEY) || "";
  }

  getRefreshToken() {
    return sessionStorage.getItem(REFRESH_TOKEN_KEY) || "";
  }

  setRefreshToken(token) {
    sessionStorage.setItem(REFRESH_TOKEN_KEY, token);
  }

  clearToken() {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
  }

  setMenu(data) {
    safeSetItem(MENU_KEY, data);
  }

  getMenu() {
    return safeGetItem(MENU_KEY);
  }

  clear() {
    sessionStorage.removeItem(USER_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
  }

  clearAll() {
    sessionStorage.clear();
    localStorage.clear();
  }

  logout() {
    // this.clear();
    this.clearAll();
    // location.reload();
  }
}

// Singleton instance
const user = new User();
window.user = user; // Expose for global usage if necessary
export default user;
