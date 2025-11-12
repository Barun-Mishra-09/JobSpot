import axios from "axios";

const api = axios.create({
  baseURL: "https://jobspot-ppa1.onrender.com/api/v1/user",
  withCredentials: true,
});

export const googleAuth = (code) => api.get(`/google?code=${code}`);
