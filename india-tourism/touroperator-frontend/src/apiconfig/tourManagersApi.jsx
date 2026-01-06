import axiosClient from './axiosClient';

export const getTourOperators = () => axiosClient.get('/admin/tour-operators');
export const getTourOperator = (id) => axiosClient.get(`/admin/tour-operators/${id}`);
export const createTourOperator = (data) => axiosClient.post('/admin/tour-operators', data);
export const updateTourOperator = (id, data) => axiosClient.put(`/admin/tour-operators/${id}`, data);
export const deleteTourOperator = (id) => axiosClient.delete(`/admin/tour-operators/${id}`);
