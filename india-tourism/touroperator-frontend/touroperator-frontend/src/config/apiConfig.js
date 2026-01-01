// Change the domain easily here, e.g., for production
const API_DOMAIN = "http://localhost:5000/api";

const API = {
  auth: {
    login: `${API_DOMAIN}/auth/login`,
    register: `${API_DOMAIN}/auth/register`,
    getUser: `${API_DOMAIN}/auth/getUser`,
    forgotUsername: `${API_DOMAIN}/auth/forgot-username`,
    forgotPassword: `${API_DOMAIN}/auth/forgot-password`,
    resetPassword: `${API_DOMAIN}/auth/reset-password`
  },
  products: {
    add: `${API_DOMAIN}/products/add`,
    delete: `${API_DOMAIN}/products/delete`,
    list: `${API_DOMAIN}/products/list`
  }
  // Add more endpoints as needed
};

export default API;
