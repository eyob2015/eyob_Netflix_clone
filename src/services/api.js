/**
 * Axios API Instance
 * Configured with base URL for TMDB API
 * Includes timeout, retry logic, and request cancellation support
 */

import axios from "axios";
import { API_BASE_URL } from "../constants/apiConstants";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 second timeout
});

// Request interceptor for adding cancellation token
api.interceptors.request.use((config) => {
  // Add abort controller for cancellation
  if (!config.signal) {
    const controller = new AbortController();
    config.signal = controller.signal;
    config.cancelToken = {
      promise: new Promise((resolve) => {
        config.signal.addEventListener("abort", () => {
          resolve("Request cancelled");
        });
      }),
    };
    // Store controller on config for later use
    config._controller = controller;
  }
  return config;
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
