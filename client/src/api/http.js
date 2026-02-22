import axios from "axios";


// below code for laptop and mobile testing temporarily.

// This dynamically grabs whatever IP/hostname the browser is currently looking at
const currentHost = window.location.hostname;

// Now, use that host to build the API URL, but keep your Express port (3000)
const apiUrl = `http://${currentHost}:3000/api`;

const http = axios.create({
  // baseURL: import.meta.env.VITE_API_BASE_URL,
  // for phone and laptop testing temp below setting
  baseURL:apiUrl,
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
