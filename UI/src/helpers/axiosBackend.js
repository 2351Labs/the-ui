import axios from "axios";
// require("dotenv").config();
// Set the base URL based on the environment
const apiUrl = "http://localhost:3000";
const axiosBackend = axios.create({
  baseURL: apiUrl,
});

export default axiosBackend;
