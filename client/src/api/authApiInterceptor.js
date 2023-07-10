import axios from "axios";
import { watchEffect } from "vue";
import { useAuthStore } from "../store/users";

export const axiosPrivate = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false
});

export const setupInterceptors = () => {
  let requestInterceptor;
  let responseInterceptor;

  const authStore = useAuthStore()

  watchEffect(() => {
    // Request interceptor
    requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${authStore.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 || error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refreshToken();
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    // Return cleanup function
    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    };
  })
};
