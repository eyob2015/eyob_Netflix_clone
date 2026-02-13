/**
 * API Configuration Constants
 */

export const API_BASE_URL = "https://api.themoviedb.org/3/";
export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

export const API_ENDPOINTS = {
  TRENDING: `/trending/all/week?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`,
  NETFLIX_ORIGINALS: `/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&with_networks=213`,
  TOP_RATED: `/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`,
  ACTION_MOVIES: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=28`,
  COMEDY_MOVIES: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=35`,
  HORROR_MOVIES: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=27`,
  ROMANCE_MOVIES: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=10749`,
  DOCUMENTARIES: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=99`,
};
