import axios from "axios";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // for cookies
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    const backendMessage = error.response?.data?.message;
    const netWorkMessage =
      error.request && !error.response
        ? "Sever Not Responding .Please try again ."
        : null;

    return Promise.reject(
      backendMessage ||
        netWorkMessage ||
        "Something Went Wrong .Plase try again .",
    );
  },
);
export default http;
