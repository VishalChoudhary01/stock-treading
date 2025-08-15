import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});


apiClient.interceptors.response.use(
  response => response.data,
  error => {
    console.error("API Request Error:", error);
    return Promise.reject(error);
  }
);

export default apiClient;