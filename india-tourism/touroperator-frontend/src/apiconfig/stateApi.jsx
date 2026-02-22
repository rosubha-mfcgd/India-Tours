import axiosClient from './axiosClient';

/**
 * Get all states
 */
export const getStates = () => axiosClient.get('/states');

/**
 * Get all states by country id
 */

export const getStatesByCountry = (id) => axiosClient.get(`/states/country/${id}`);

/**
 * Get state by ID
 * @param {string} id - State ID
 */
export const getState = (id) => axiosClient.get(`/states/${id}`);

/**
 * Create a new state
 * @param {object} data - { name }
 */
export const createState = (data) => axiosClient.post('/states', data);

/**
 * Update a state
 * @param {string} id - State ID
 * @param {object} data - { name }
 */
export const updateState = (id, data) => axiosClient.put(`/states/${id}`, data);

/**
 * Delete a state
 * @param {string} id - State ID
 */
export const deleteState = (id) => axiosClient.delete(`/states/${id}`);
