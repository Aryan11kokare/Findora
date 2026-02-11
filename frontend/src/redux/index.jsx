import axios from "axios";

export const BASE_URL = "https://findora-8g2z.onrender.com";
export const clientServer = axios.create({
  baseURL: BASE_URL,
});
