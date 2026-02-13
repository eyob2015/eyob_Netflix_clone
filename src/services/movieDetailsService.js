/**
 * Movie Details Service
 * Handles all movie details and related API calls
 */

import api from "./api";

export const movieDetailsService = {
  /**
   * Fetch detailed information about a specific movie
   */
  fetchMovieDetails: async (movieId, mediaType = "movie") => {
    try {
      const response = await api.get(
        `/${mediaType}/${movieId}?api_key=${process.env.REACT_APP_API_KEY}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${mediaType} details for ID ${movieId}:`, error);
      throw error;
    }
  },

  /**
   * Fetch videos (trailers) for a movie or show
   */
  fetchMovieVideos: async (movieId, mediaType = "movie") => {
    try {
      const response = await api.get(
        `/${mediaType}/${movieId}/videos?api_key=${process.env.REACT_APP_API_KEY}`
      );
      return response.data.results;
    } catch (error) {
      console.error(`Error fetching videos for ${mediaType} ${movieId}:`, error);
      return [];
    }
  },

  /**
   * Fetch cast and crew information
   */
  fetchMovieCredits: async (movieId, mediaType = "movie") => {
    try {
      const response = await api.get(
        `/${mediaType}/${movieId}/credits?api_key=${process.env.REACT_APP_API_KEY}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching credits for ${mediaType} ${movieId}:`, error);
      return { cast: [], crew: [] };
    }
  },

  /**
   * Fetch similar movies
   */
  fetchSimilarMovies: async (movieId, mediaType = "movie") => {
    try {
      const response = await api.get(
        `/${mediaType}/${movieId}/similar?api_key=${process.env.REACT_APP_API_KEY}`
      );
      return response.data.results;
    } catch (error) {
      console.error(`Error fetching similar ${mediaType}s for ID ${movieId}:`, error);
      return [];
    }
  },

  /**
   * Fetch recommendations
   */
  fetchRecommendations: async (movieId, mediaType = "movie") => {
    try {
      const response = await api.get(
        `/${mediaType}/${movieId}/recommendations?api_key=${process.env.REACT_APP_API_KEY}`
      );
      return response.data.results;
    } catch (error) {
      console.error(`Error fetching recommendations for ${mediaType} ${movieId}:`, error);
      return [];
    }
  },
};

export default movieDetailsService;
