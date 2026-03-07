import axios from "axios";

const API_BASE =
  import.meta.env.DEV ? "/api" : import.meta.env.VITE_API_BASE_URL;

const http = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

http.interceptors.response.use(
  (response) => response,

  (error) => {
    const status = error.response?.status;

    const backendMessage = error.response?.data?.message;

    const networkMessage =
      error.request && !error.response
        ? "Server not responding. Please try again."
        : null;

    /* Handle expired session */
    if (status === 401) {
      window.location.href = "/login";
    }

    return Promise.reject(
      backendMessage ||
        networkMessage ||
        "Something went wrong. Please try again."
    );
  }
);

export default http;
