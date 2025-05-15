import axios, {
  InternalAxiosRequestConfig,
  AxiosError,
  AxiosResponse,
} from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // Sesuaikan dengan port backend NestJS Anda
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor untuk menambahkan token ke header
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Interceptor untuk menangani error
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default api;
