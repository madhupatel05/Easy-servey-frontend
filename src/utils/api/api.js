import axios from "axios";
import ENV from "../../config/env";

const api = axios.create({
  baseURL: ENV.BASE_URL,
  responseType: "json",
});

api.interceptors.request.use(
  async config => {

    const token = localStorage.getItem('token');

    config.headers = {
      'Authorization': `${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/Json',
    }
    return config;
  },
  error => {
    Promise.reject(error)
  });


api.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    console.error(error);
    return Promise.reject(error);
  }
);

export default api;
