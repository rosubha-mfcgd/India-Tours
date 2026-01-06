import axiosClient from './axiosClient';

export const getTours = (params) => axiosClient.get('/tourdetails', { params });
export const getTour = (id) => axiosClient.get(`/tourdetails/${id}`);
export const createTour = (data) => axiosClient.post('/tourdetails', data);
export const updateTour = (id, data) => axiosClient.put(`/tourdetails/${id}`, data);
export const deleteTour = (id) => axiosClient.delete(`/tourdetails/${id}`);
export const bookTour = (id, data) => axiosClient.post(`/tourdetails/book/${id}`, data);    
