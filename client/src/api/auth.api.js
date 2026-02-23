import http from "./http";

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