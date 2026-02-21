import http from "./http.js";

// login user
export async function loginUser(credentials) {
  const { data } = await http.post("/auth/login", credentials);
  return data;
}

// register user
export async function registerUser(payload) {
  const { data } = await http.post("/auth/register", payload);
  return data;
}

// varifying the current user logged in or not if yes who ?
export async function getCurrentUser() {
  const { data } = await http.get("/auth/me");
  return data;
}

// loggin out current user
export async function logoutUser() {
  const { data } = await http.post("/auth/logout");
  return data;
}
