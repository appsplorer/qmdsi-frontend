import axios from "axios";

const api = axios.create({
  baseURL: "https://aurum.financial:3000/",
});

export default api;
