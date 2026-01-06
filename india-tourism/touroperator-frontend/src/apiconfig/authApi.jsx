import axiosClient from "./axiosClient";

// ---------------- Login with credentials stored in HTTP-only cookie
export const loginUser = (data) =>
  axiosClient.post("/auth/login", data, { withCredentials: true });

// ---------------- Register new user (cookies may be set on registration)
export const registerUser = (data) =>
  axiosClient.post("/auth/register", data, { withCredentials: true });

// ---------------- Forgot username / password (does not need cookies)
export const forgotUsername = (data) =>
  axiosClient.post("/auth/forgot-username", data);

export const forgotPassword = (data) =>
  axiosClient.post("/auth/forgot-password", data);

// ---------------- Logout (call backend to clear cookie)
export const logout = () =>
  axiosClient.post("/auth/logout", {}, { withCredentials: true });
