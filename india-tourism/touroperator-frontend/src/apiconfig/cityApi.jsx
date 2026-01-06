import axiosClient from './axiosClient';

/**
 * Get all cities
 */
export const getCities = () => axiosClient.get('/cities');

/*
* Get cities by state ID
/**
 * Get city by ID
 * @param {string} id - City ID
 */
export const getCitiesByState = (stateId) => axiosClient.get(`/cities/${stateId}`);

/**
 * Create a new city
 * @param {object} data - { name, stateId }
 */
export const createCity = (data) => axiosClient.post('/cities', data);

/**
 * Update a city
 * @param {string} id - City ID
 * @param {object} data - { name, stateId }
 */
export const updateCity = (id, data) => axiosClient.put(`/cities/${id}`, data);

/**
 * Delete a city
 * @param {string} id - City ID
 */
export const deleteCity = (id) => axiosClient.delete(`/cities/${id}`);
