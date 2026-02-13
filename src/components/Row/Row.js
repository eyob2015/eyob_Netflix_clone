import React, { useEffect, useState, useCallback } from "react";
import "./Row.css";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { IMAGE_BASE_URL } from "../../constants/apiConstants";
import MovieCard from "../MovieCard/MovieCard";

/**
 * Row Component
 * Displays a horizontal scrollable row of movie/show posters
 * @param {string} title - Title of the row
 * @param {string} fetchUrl - API endpoint to fetch movies
 * @param {boolean} isLargeRow - Whether to display large posters
 * @param {array} movies - Pre-loaded movies (optional)
 * @param {boolean} hideTitle - Hide the row title (optional)
 * @param {string} categoryRoute - Route to category detail page (optional)
 */
const Row = React.memo(
  ({ title, fetchUrl, isLargeRow, movies: initialMovies, hideTitle = false, categoryRoute }) => {
    const navigate = useNavigate();
    const [movies, setMovies] = useState(initialMovies || []);
    const [loading, setLoading] = useState(!initialMovies);

    const fetchMovies = useCallback(async () => {
      setLoading(true);
      try {
        const response = await api.get(fetchUrl);
        setMovies(response.data.results || []);
      } catch (error) {
        console.error(`Error fetching ${title}:`, error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    }, [fetchUrl, title]);

    useEffect(() => {
      if (!initialMovies) {
        fetchMovies();
      }
    }, [fetchMovies, initialMovies]);

    const handleTitleClick = () => {
      if (categoryRoute) {
        navigate(categoryRoute);
      }
    };

    const handleViewAllClick = () => {
      if (categoryRoute) {
        navigate(categoryRoute);
      }
    };

    return (
      <div className="row">
        {!hideTitle && (
          <div className="row__header">
            <div className="row__header-content">
              <h2
                className={`row__title ${categoryRoute ? "row__title--clickable" : ""}`}
                onClick={handleTitleClick}
              >
                {title}
              </h2>
              <div className="row__title-line" />
            </div>
            {categoryRoute && (
              <button
                className="row__view-all-btn"
                onClick={handleViewAllClick}
                aria-label={`View all ${title}`}
              >
                <span className="row__view-all-text">View All</span>
                <span className="row__view-all-arrow">→</span>
              </button>
            )}
          </div>
        )}

        {loading ? (
          <div className="row__loading">
            <div className="row__skeleton-container">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="row__skeleton" />
              ))}
            </div>
          </div>
        ) : (
          <div className="row__posters">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                isLargeRow={isLargeRow}
                imageUrl={`${IMAGE_BASE_URL}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                mediaType={movie.media_type || "movie"}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);

Row.displayName = "Row";

export default Row;
