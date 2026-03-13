import http from "../../../api/http";

// login user
export async function loginUser(credentials) {
  const { data } = await http.post("/auth/login", credentials);
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

// 2 Step Varification Registration Routes..

export async function initiateRegister(data) {
  const response =  await http.post("/auth/register/initiate", data);
  return response.data;
}

export async  function verifyRegisterOtp(data) {
  const response =  await http.post("/auth/register/verify", data);
  return response.data;
}

export async function resendOtp(email) {
  const response = await http.post("/auth/register/resend-otp", { email });
  return response.data;
}