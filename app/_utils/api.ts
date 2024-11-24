import axios from "axios";

// Create an axios instance
export const api = axios.create({
  baseURL: "http://localhost:3333/",
  headers: {
    "Content-Type": "application/json",
  },
});
