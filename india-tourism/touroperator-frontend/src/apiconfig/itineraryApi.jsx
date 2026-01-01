import axiosClient from "./axiosClient";

export const getItineraries = () => axiosClient.get('/touritineraries');
export const createItinerary = (data) => axiosClient.post('/touritineraries', data);
export const updateItinerary = (id, data) => axiosClient.put(`/touritineraries/${id}`, data);
export const deleteItinerary = (id) => axiosClient.delete(`/touritineraries/${id}`);
