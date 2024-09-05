import axios from "axios";

const api = axios.create({
  baseURL: "http://3.24.123.219:3005",
});

export default api;
