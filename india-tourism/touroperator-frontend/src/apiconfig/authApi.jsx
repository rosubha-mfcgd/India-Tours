import axiosClient from './axiosClient';
export const loginUser = (data) => axiosClient.post('/auth/login', data);
export const registerUser = (data) => axiosClient.post('/auth/register', data);
export const forgotUsername = (data) => axiosClient.post('/auth/forgot-username', data);
export const forgotPassword = (data) => axiosClient.post('/auth/forgot-password', data);
