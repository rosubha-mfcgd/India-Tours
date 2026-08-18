import React, { createContext, useState, useEffect } from "react";
import axiosClient from "../apiconfig/axiosClient";
import { loginUser, logout } from "../apiconfig/authApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // loading while fetching user
 
  // ---------------- Fetch current logged-in user from backend
  const fetchUser = async () => {
    try {
      const res = await axiosClient.get("/auth/getUser", 
        {withCredentials: true });
      setUser(res.data);
    } catch (err) {
      setUser(null); // not logged in or session expired
    } finally {
      setLoading(false);
    }
  };

  // ---------------- Login
  const login = async (credentials) => {
    try {
      await loginUser(credentials); // backend sets HTTP-only cookie
      await fetchUser(); // fetch user after login
    } catch (err) {
      throw err;
    }
  };

  // ---------------- Logout
  const logoutUser = async () => {
    try {
      await logout(); // backend clears cookie
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      setUser(null);
    }
  };

  // ---------------- Fetch user on mount
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout: logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
