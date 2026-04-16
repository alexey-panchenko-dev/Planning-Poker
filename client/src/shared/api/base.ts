import axios from "axios";

export const apiInstance = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  headers: { "Content-Type": "application/json" },
});

apiInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token && config.headers) {
    config.headers.Autorization = token;
  }

  return config;
});

apiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status == "401") {
      localStorage.removeItem("accessToken");
    }

    return Promise.reject(error);
  },
);
