import axiosClient from './axiosClient';

// Mock payment endpoint on backend can be implemented separately. For now simulate.
export const createPayment = (data) => {
  // simulate server processing
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: { status: 'success', id: 'MOCKPAY123', data } }), 1000);
  });
};
