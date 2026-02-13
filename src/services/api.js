/**
 * Axios API Instance
 * Configured with base URL for TMDB API
 * Includes timeout and error handling
 */

import axios from "axios";
import { API_BASE_URL } from "../constants/apiConstants";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 second timeout
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      console.error("Request timeout - server took too long to respond");
    }
    return Promise.reject(error);
  }
);

export default api;
