import axiosClient from './axiosClient';

export const getBookings = (params) => axiosClient.get('/booking', { params });
export const getBookingByTourId = (tourId) => axiosClient.get(`/booking/${tourId}`);