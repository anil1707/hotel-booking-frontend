import axios from "axios";
import { toast } from "../services/toast.service";

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    const message =
      error.response?.data?.message ||
      "Something went wrong";

    toast.error(message);

    return Promise.reject(error);
  }
);

export default api;