import axiosClient from "./axiosClient";

/**
 * ADMIN ONLY – Tour Operator APIs
 */

// Get all tour operators
export const getProducts = () =>
  axiosClient.get("/api/products");

// Get single tour operator by ID
export const getProductById = (id) =>
  axiosClient.get(`/api/products/${id}`);

// Create tour operator (roleID = 2)
export const createProduct = (data) =>
  axiosClient.post("/api/admin/products", data);

// Update tour operator (email / password)
export const updateProduct = (id, data) =>
  axiosClient.put(`/api/admin/products/${id}`, data);

// Delete tour operator
export const deleteProduct = (id) =>
  axiosClient.delete(`/api/admin/products/${id}`);
