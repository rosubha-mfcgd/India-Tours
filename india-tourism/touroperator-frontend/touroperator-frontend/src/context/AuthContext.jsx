import React, { createContext, useState, useEffect } from "react";
import axiosClient from "../apiconfig/axiosClient"; // axiosClient with baseURL

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Initialize user from token on app load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUser(token);
    }
  }, []);

  // Login: store token + fetch user details
  const login = async (token) => {
    localStorage.setItem("token", token);
    await fetchUser(token);
  };

  // Fetch user details using token
  const fetchUser = async (token) => {
    try {
      const res = await axiosClient.get("/auth/getUser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(res.data);
    } catch (err) {
      console.error("Failed to fetch user:", err);
      logout(); // if token invalid or expired
    }
  };

  // Logout: remove token + clear user
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
