import axios from 'axios';
const axiosClient = axios.create({
  //baseURL: "http://localhost:5000/api",
  baseURL: "http://touroperator-api.mitramtourism.com/api",
  timeout: 10000,
  withCredentials: true, // include cookies automatically
});
export default axiosClient;
