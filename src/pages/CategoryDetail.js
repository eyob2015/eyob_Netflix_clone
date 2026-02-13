import React, { useEffect, useState, useCallback, useRef } from "react";
import "./CategoryDetail.css";
import { useParams, useNavigate } from "react-router-dom";
import movieService from "../services/movieService";
import { IMAGE_BASE_URL } from "../constants/apiConstants";
import Nav from "../components/Nav/Nav";
import MovieCard from "../components/MovieCard/MovieCard";

/**
 * Category Detail Page Component
 * Displays all movies in a category with infinite scrolling
 */
function CategoryDetail() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef(null);
  const abortControllerRef = useRef(new AbortController());

  // Category title mapping
  const categoryTitles = {
    trending: "Trending Now",
    netflix_originals: "Netflix Originals",
    popular: "Popular",
    top_rated: "Top Rated",
    action: "Action Movies",
    comedy: "Comedy Movies",
    horror: "Horror Movies",
    romance: "Romance Movies",
    documentaries: "Documentaries",
  };

  // Get API URL for category
  const getAPIUrl = useCallback(
    (pageNum) => {
      const baseUrls = {
        trending: `/trending/all/week?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${pageNum}`,
        netflix_originals: `/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&with_networks=213&page=${pageNum}`,
        popular: `/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${pageNum}`,
        top_rated: `/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${pageNum}`,
        action: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=28&page=${pageNum}`,
        comedy: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=35&page=${pageNum}`,
        horror: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=27&page=${pageNum}`,
        romance: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=10749&page=${pageNum}`,
        documentaries: `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=99&page=${pageNum}`,
      };
      return baseUrls[category] || null;
    },
    [category]
  );

  // Determine media type based on category
  const getMediaType = () => {
    return category === "netflix_originals" ? "tv" : "movie";
  };

  // Fetch movies for current page
  const loadMovies = useCallback(
    async (pageNum) => {
      if (!category) {
        return;
      }

      const apiUrl = getAPIUrl(pageNum);
      if (!apiUrl) {
        return;
      }

      setLoading(true);
      try {
        const response = await movieService.fetchMovies(apiUrl);

        if (response?.results && response.results.length > 0) {
          setMovies((prev) =>
            pageNum === 1 ? response.results : [...prev, ...response.results]
          );

          // Check if there are more pages
          if (response.page >= response.total_pages) {
            setHasMore(false);
          } else {
            setHasMore(true);
          }
        } else {
          setHasMore(false);
        }
      } catch (error) {
        // Only log if not a cancelled request
        if (error.name !== "CanceledError") {
          console.error("Error fetching movies:", error);
        }
      } finally {
        setLoading(false);
      }
    },
    [category, getAPIUrl]
  );

  // Reset and fetch first page when category changes
  useEffect(() => {
    window.scrollTo(0, 0);
    setMovies([]);
    setPage(1);
    setHasMore(true);
    
    // Cancel any pending requests
    abortControllerRef.current.abort();
    abortControllerRef.current = new AbortController();
  }, [category]);

  // Fetch movies when page changes
  useEffect(() => {
    loadMovies(page);
  }, [page, loadMovies]);

  // Infinite scroll observer
  useEffect(() => {
    if (!observerTarget.current || !hasMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(observerTarget.current);
    return () => observer.disconnect();
  }, [hasMore, loading]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      abortControllerRef.current.abort();
    };
  }, []);

  const mediaType = getMediaType();
  const categoryTitle = categoryTitles[category] || "Movies";
  const validCategory = category && categoryTitles[category];

  if (!validCategory) {
    return (
      <div className="category-detail-error">
        <Nav />
        <div className="category-detail-error-content">
          <h2>Category not found</h2>
          <button
            onClick={() => navigate("/")}
            className="category-detail-back-btn"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="category-detail">
      <Nav />

      {/* Header */}
      <div className="category-detail__header">
        <button
          className="category-detail__back-btn"
          onClick={() => navigate("/")}
          aria-label="Go back"
        >
          ← Back
        </button>
        <h1 className="category-detail__title">{categoryTitle}</h1>
        <p className="category-detail__subtitle">
          {movies.length || 0} movies found
        </p>
      </div>

      {/* Movies Grid */}
      <div className="category-detail__container">
        <div className="category-detail__grid">
          {movies.map((movie) => {
            const isBackdrop = !movie.poster_path && movie.backdrop_path;
            const wrapperClass = isBackdrop
              ? 'category-detail__card-wrapper category-detail__card-wrapper--landscape'
              : 'category-detail__card-wrapper category-detail__card-wrapper--portrait';

            return (
              <div
                key={`${movie.id}-${movie.media_type || mediaType}`}
                className={wrapperClass}
              >
                <MovieCard
                  movie={movie}
                  mediaType={movie.media_type || mediaType}
                  imageUrl={`${IMAGE_BASE_URL}${movie.poster_path || movie.backdrop_path}`}
                  isLandscape={isBackdrop}
                />
              </div>
            );
          })}
        </div>

        {/* Loading indicator */}
        {loading && (
          <div className="category-detail__loading">
            <div className="category-detail__spinner" />
            <p>Loading more movies...</p>
          </div>
        )}

        {/* Observer target for infinite scroll */}
        <div ref={observerTarget} className="category-detail__observer" />

        {/* End message */}
        {!hasMore && movies.length > 0 && (
          <div className="category-detail__end">
            <p>You've reached the end!</p>
          </div>
        )}

        {/* Empty state */}
        {movies.length === 0 && !loading && (
          <div className="category-detail__empty">
            <p>No movies found. Try again later.</p>
            <button
              onClick={() => navigate("/")}
              className="category-detail-back-btn"
            >
              ← Back to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryDetail;
