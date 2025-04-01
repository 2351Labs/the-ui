import axios from "axios";
// require("dotenv").config();
// Set the base URL based on the environment
// const apiUrl = "http://localhost:3000";

// const apiUrl = "https://the-api-yuq4.onrender.com";
// const apiUrl = import.meta.env.VITE_API_URL;
const apiUrl = window.env.VITE_API_URL;

const axiosBackend = axios.create({
  baseURL: apiUrl,
});
axiosBackend.defaults.headers.common["Authorization"] = `${localStorage.getItem(
  "token"
)}`;

console.log("API URL", apiUrl);
export default axiosBackend;
