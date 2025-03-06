import axios from "axios";
// require("dotenv").config();
// Set the base URL based on the environment
const apiUrl = "http://localhost:3000";
console.log("BACKEND AXIOS!");

const axiosBackend = axios.create({
  baseURL: apiUrl,
});
axiosBackend.defaults.headers.common["Authorization"] = `${localStorage.getItem(
  "token"
)}`;

export default axiosBackend;
