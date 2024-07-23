import axios from 'axios';

const apiBaseUrl = "https://ardhendu-blogger-backend.onrender.com";

const api = axios.create({
  baseURL: "https://ardhendu-blogger-backend.onrender.com",
  withCredentials: true, // Important to include cookies
});

export default apiBaseUrl;