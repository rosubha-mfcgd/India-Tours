import axiosClient from './axiosClient';

/**
 * Get all categories
 */
export const getCategories = () => axiosClient.get('/category');


/**
 * Get category by ID
 * @param {string} id - Category ID
 */
export const getCategoryById = (id) => axiosClient.get(`/category/${id}`);

/**
 * Create a new category    
 * @param {object} data - { name, stateId }
 */
export const createCategory = (data) => axiosClient.post('/category', data);

/**
 * Update a city
 * @param {string} id - City ID
 * @param {object} data - { name, stateId }
 */
export const updateCategory = (id, data) => axiosClient.put(`/category/${id}`, data);

/**
 * Delete a city
 * @param {string} id - City ID
 */
export const deleteCategory = (id) => axiosClient.delete(`/category/${id}`);
