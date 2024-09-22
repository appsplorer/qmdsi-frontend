import axios from "axios";

const api = axios.create({
  baseURL: "https://aurum.financial:3000/",
  // baseURL: "http://127.0.0.1:8000",
});

export default api;
