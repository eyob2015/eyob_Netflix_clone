import React, { useEffect, useState, useCallback } from "react";
import "./MovieDetail.css";
import { useParams, useNavigate } from "react-router-dom";
import movieTrailer from "movie-trailer";
import { IMAGE_BASE_URL } from "../constants/apiConstants";
import movieDetailsService from "../services/movieDetailsService";
import Row from "../components/Row/Row";
import TrailerModal from "../components/TrailerModal/TrailerModal";

/**
 * MovieDetail Page Component
 * Displays comprehensive movie information with trailer, cast, and recommendations
 */
function MovieDetail() {
  const { id, mediaType = "movie" } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState({ cast: [] });
  const [similarMovies, setSimilarMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [showTrailerModal, setShowTrailerModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchMovieData = useCallback(async () => {
    setLoading(true);
    try {
      const [movieData, videosData, creditsData, similarData] =
        await Promise.all([
          movieDetailsService.fetchMovieDetails(id, mediaType),
          movieDetailsService.fetchMovieVideos(id, mediaType),
          movieDetailsService.fetchMovieCredits(id, mediaType),
          movieDetailsService.fetchSimilarMovies(id, mediaType),
        ]);

      setMovie(movieData);
      setCredits(creditsData);
      setSimilarMovies(similarData || []);

      // Automatically find and set trailer
      const trailerVideo = videosData?.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );
      if (trailerVideo) {
        setTrailerUrl(trailerVideo.key);
      }
    } catch (error) {
      console.error("Error fetching movie data:", error);
    } finally {
      setLoading(false);
    }
  }, [id, mediaType]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchMovieData();
  }, [fetchMovieData]);

  const handlePlayTrailer = useCallback(
    async (e) => {
      e.preventDefault();
      
      // If we already have a trailer URL, just open the modal
      if (trailerUrl) {
        setShowTrailerModal(true);
        return;
      }

      // Otherwise, fetch the trailer first
      try {
        const movieTitle = movie?.title || movie?.name || "";
        const url = await movieTrailer(movieTitle);
        const urlParams = new URLSearchParams(new URL(url).search);
        const videoId = urlParams.get("v");
        if (videoId) {
          setTrailerUrl(videoId);
          setShowTrailerModal(true);
        }
      } catch (error) {
        console.error("Error fetching trailer:", error);
      }
    },
    [trailerUrl, movie]
  );

  const handleCloseTrailerModal = useCallback(() => {
    setShowTrailerModal(false);
  }, []);

  const getTitleOrName = () => {
    return movie?.title || movie?.name || movie?.original_name || "";
  };

  const getYear = () => {
    const date = movie?.release_date || movie?.first_air_date || "";
    return date ? new Date(date).getFullYear() : "";
  };

  if (loading) {
    return (
      <div className="movie-detail-loading">
        <div className="movie-detail-skeleton-header" />
        <div className="movie-detail-skeleton-content" />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="movie-detail-error">
        <h2>Movie not found</h2>
        <button onClick={() => navigate("/")} className="movie-detail-back-btn">
          ← Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="movie-detail">
      {/* Header with Background */}
      <div
        className="movie-detail__header"
        style={{
          backgroundImage: `url("${IMAGE_BASE_URL}${movie?.backdrop_path}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="movie-detail__header-overlay" />
        <button
          className="movie-detail__back-btn"
          onClick={() => navigate("/")}
          aria-label="Go back"
        >
          ← Back
        </button>
      </div>

      {/* Main Content */}
      <div className="movie-detail__container">
        {/* Poster + Info Section */}
        <div className="movie-detail__main">
          <div className="movie-detail__poster-section">
            <img
              className="movie-detail__poster"
              src={`${IMAGE_BASE_URL}${movie?.poster_path}`}
              alt={getTitleOrName()}
            />
          </div>

          <div className="movie-detail__info">
            <h1 className="movie-detail__title">{getTitleOrName()}</h1>

            <div className="movie-detail__meta">
              <span className="movie-detail__year">{getYear()}</span>
              <span className="movie-detail__rating">
                ⭐ {movie?.vote_average?.toFixed(1) || "N/A"}/10
              </span>
              <span className="movie-detail__popularity">
                {movie?.popularity ? Math.round(movie.popularity) : "N/A"} Views
              </span>
            </div>

            {movie?.genres && (
              <div className="movie-detail__genres">
                {movie.genres.slice(0, 5).map((genre) => (
                  <span key={genre.id} className="movie-detail__genre">
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            <p className="movie-detail__overview">{movie?.overview}</p>

            <div className="movie-detail__actions">
              <button
                className="movie-detail__play-btn"
                onClick={handlePlayTrailer}
              >
                ▶ Play Trailer
              </button>
              <button className="movie-detail__list-btn">
                ♥ Add to Favorites
              </button>
            </div>

            {/* Cast Section */}
            {credits.cast && credits.cast.length > 0 && (
              <div className="movie-detail__cast-section">
                <h3 className="movie-detail__cast-title">Cast</h3>
                <div className="movie-detail__cast-list">
                  {credits.cast.slice(0, 6).map((actor) => (
                    <div key={actor.id} className="movie-detail__cast-item">
                      {actor.profile_path ? (
                        <img
                          src={`${IMAGE_BASE_URL}${actor.profile_path}`}
                          alt={actor.name}
                          className="movie-detail__cast-image"
                        />
                      ) : (
                        <div className="movie-detail__cast-placeholder">
                          No Image
                        </div>
                      )}
                      <p className="movie-detail__cast-name">{actor.name}</p>
                      <p className="movie-detail__cast-character">
                        as {actor.character}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Info */}
            <div className="movie-detail__details">
              {movie?.budget > 0 && (
                <div className="movie-detail__detail-item">
                  <span className="movie-detail__detail-label">Budget:</span>
                  <span>${(movie.budget / 1000000).toFixed(1)}M</span>
                </div>
              )}
              {movie?.revenue > 0 && (
                <div className="movie-detail__detail-item">
                  <span className="movie-detail__detail-label">Revenue:</span>
                  <span>${(movie.revenue / 1000000).toFixed(1)}M</span>
                </div>
              )}
              {movie?.runtime > 0 && (
                <div className="movie-detail__detail-item">
                  <span className="movie-detail__detail-label">Runtime:</span>
                  <span>{movie.runtime} minutes</span>
                </div>
              )}
              {movie?.status && (
                <div className="movie-detail__detail-item">
                  <span className="movie-detail__detail-label">Status:</span>
                  <span>{movie.status}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* You May Also Like Section */}
      {similarMovies.length > 0 && (
        <div className="movie-detail__recommendations">
          <h2 className="movie-detail__recommendations-title">
            You May Also Like
          </h2>
          <Row
            title=""
            fetchUrl={`/discover/${mediaType}?api_key=${process.env.REACT_APP_API_KEY}&sort_by=popularity.desc`}
            isLargeRow={false}
            movies={similarMovies}
            hideTitle
          />
        </div>
      )}

      {/* Trailer Modal */}
      {showTrailerModal && trailerUrl && (
        <TrailerModal
          videoId={trailerUrl}
          onClose={handleCloseTrailerModal}
          movieTitle={getTitleOrName()}
        />
      )}
    </div>
  );
}

export default MovieDetail;
