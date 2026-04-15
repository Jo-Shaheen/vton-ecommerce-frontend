const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const CART_ID_KEY = "cartId";
const USER_KEY = "user";

export const getAccessToken = () =>
  localStorage.getItem(ACCESS_TOKEN_KEY) || null;

export const getRefreshToken = () =>
  localStorage.getItem(REFRESH_TOKEN_KEY) || null;

export const getCartId = () => localStorage.getItem(CART_ID_KEY) || null;

export const getUserData = () => {
  const rawUser = localStorage.getItem(USER_KEY);
  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser);
  } catch {
    return null;
  }
};

export const setTokens = (access, refresh) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, access);
  localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
};

export const setCartId = (id) => {
  localStorage.setItem(CART_ID_KEY, id);
};

export const setUserData = (user) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const clearAll = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(CART_ID_KEY);
  localStorage.removeItem(USER_KEY);
};
