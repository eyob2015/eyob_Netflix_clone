/**
 * Movie Service
 * Handles all movie-related API calls
 */

import api from "./api";
import { API_ENDPOINTS } from "../constants/apiConstants";

export const movieService = {
  /**
   * Fetch Netflix Originals
   */
  fetchNetflixOriginals: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.NETFLIX_ORIGINALS);
      return response.data.results;
    } catch (error) {
      console.error("Error fetching Netflix Originals:", error);
      throw error;
    }
  },

  /**
   * Fetch Trending movies/shows
   */
  fetchTrending: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.TRENDING);
      return response.data.results;
    } catch (error) {
      console.error("Error fetching Trending:", error);
      throw error;
    }
  },

  /**
   * Fetch Top Rated movies
   */
  fetchTopRated: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.TOP_RATED);
      return response.data.results;
    } catch (error) {
      console.error("Error fetching Top Rated:", error);
      throw error;
    }
  },

  /**
   * Fetch Action movies
   */
  fetchActionMovies: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.ACTION_MOVIES);
      return response.data.results;
    } catch (error) {
      console.error("Error fetching Action Movies:", error);
      throw error;
    }
  },

  /**
   * Fetch Comedy movies
   */
  fetchComedyMovies: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.COMEDY_MOVIES);
      return response.data.results;
    } catch (error) {
      console.error("Error fetching Comedy Movies:", error);
      throw error;
    }
  },

  /**
   * Fetch Horror movies
   */
  fetchHorrorMovies: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.HORROR_MOVIES);
      return response.data.results;
    } catch (error) {
      console.error("Error fetching Horror Movies:", error);
      throw error;
    }
  },

  /**
   * Fetch Romance movies
   */
  fetchRomanceMovies: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.ROMANCE_MOVIES);
      return response.data.results;
    } catch (error) {
      console.error("Error fetching Romance Movies:", error);
      throw error;
    }
  },

  /**
   * Fetch Documentaries
   */
  fetchDocumentaries: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.DOCUMENTARIES);
      return response.data.results;
    } catch (error) {
      console.error("Error fetching Documentaries:", error);
      throw error;
    }
  },

  /**
   * Fetch movies with custom URL (for category pages, pagination, etc.)
   * @param {string} url - Custom API endpoint URL
   * @returns {Promise} Response with results and pagination info
   */
  fetchMovies: async (url) => {
    try {
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching movies:", error);
      throw error;
    }
  },
};

export default movieService;
