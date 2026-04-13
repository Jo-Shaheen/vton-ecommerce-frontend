import axios from "axios";
import {
  clearAll,
  getAccessToken,
  getRefreshToken,
  setTokens,
} from "./localStorage";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error?.response?.status !== 401 || originalRequest?._retry) {
      return Promise.reject(error);
    }

    if (originalRequest?.url?.includes("/auth/refresh-tokens")) {
      clearAll();
      window.location.href = "/auth";
      return Promise.reject(error);
    }

    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      clearAll();
      window.location.href = "/auth";
      return Promise.reject(error);
    }

    try {
      originalRequest._retry = true;

      const refreshResponse = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/refresh-tokens`,
        { refreshToken },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const { accessToken, refreshToken: newRefreshToken } =
        refreshResponse.data;
      setTokens(accessToken, newRefreshToken);

      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return apiClient(originalRequest);
    } catch (refreshError) {
      clearAll();
      window.location.href = "/auth";
      return Promise.reject(refreshError);
    }
  },
);

export default apiClient;
