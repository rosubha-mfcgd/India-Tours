import axiosClient from './axiosClient';

export const getCountries = () => axiosClient.get('/countries');

export const getCountry = (id) => axiosClient.get(`/countries/${id}`);