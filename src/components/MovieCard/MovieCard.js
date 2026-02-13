import React from "react";
import { useNavigate } from "react-router-dom";
import "./MovieCard.css";

/**
 * MovieCard Component
 * Reusable card for displaying individual movie/show posters
 * with optimized image loading and navigation to detail page
 */
const MovieCard = React.memo(
  ({ movie, isLargeRow, imageUrl, mediaType = "movie" }) => {
    const navigate = useNavigate();
    const [imageLoaded, setImageLoaded] = React.useState(false);

    const handleCardClick = (e) => {
      e.preventDefault();
      navigate(`/movie/${movie.id}/${mediaType}`);
    };

    return (
      <div className="movie-card" onClick={handleCardClick}>
        <div
          className={`movie-card__poster ${
            isLargeRow ? "movie-card__poster--large" : ""
          }`}
        >
          {!imageLoaded && <div className="movie-card__skeleton" />}
          <img
            className={`movie-card__image ${
              imageLoaded ? "movie-card__image--loaded" : ""
            }`}
            src={imageUrl}
            alt={movie?.name || movie?.title || "Movie"}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
          <div className="movie-card__overlay">
            <div className="movie-card__content">
              <h3 className="movie-card__title">
                {movie?.title || movie?.name || ""}
              </h3>
              <p className="movie-card__rating">
                ⭐ {movie?.vote_average?.toFixed(1) || "N/A"}
              </p>
              <button className="movie-card__play-btn">
                <span>👁️ VIEW DETAILS</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

MovieCard.displayName = "MovieCard";

export default MovieCard;
