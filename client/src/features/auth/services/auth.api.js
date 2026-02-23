import http from "../../../api/http";

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

// forgot password api call
export async function forgotPassword(email) {
  const { data } = await http.post("/auth/forgot-password",email);
  return data;
}

// reset password request
export async function resetPassword(token, data) {
  const response = await http.post(`/auth/reset-password/${token}`,data);
  return response.data;
}
