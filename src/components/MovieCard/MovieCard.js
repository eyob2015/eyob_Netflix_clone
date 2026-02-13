import React from "react";
import { useNavigate } from "react-router-dom";
import "./MovieCard.css";

/**
 * MovieCard Component
 * Reusable card for displaying individual movie/show posters
 * with optimized image loading and navigation to detail page
 */
const MovieCard = React.memo(
  ({ movie, isLargeRow, imageUrl, mediaType = "movie", isLandscape = false }) => {
    const navigate = useNavigate();
    const [imageLoaded, setImageLoaded] = React.useState(false);
    const [imageError, setImageError] = React.useState(false);
    const imgRef = React.useRef(null);
    const [shouldLoad, setShouldLoad] = React.useState(false);

    const handleCardClick = (e) => {
      e.preventDefault();
      navigate(`/movie/${movie.id}/${mediaType}`);
    };

    // Fallback image if no URL provided
    const showFallback = !imageUrl || imageError;

    // IntersectionObserver: only load image when card is visible
    React.useEffect(() => {
      if (!imgRef.current) return;
      if (shouldLoad) return;
      let observer;
      try {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setShouldLoad(true);
                observer.disconnect();
              }
            });
          },
          { rootMargin: "200px" }
        );
        observer.observe(imgRef.current);
      } catch (e) {
        // Fallback: load immediately if IntersectionObserver not supported
        setShouldLoad(true);
      }

      return () => {
        if (observer && observer.disconnect) observer.disconnect();
      };
    }, [imgRef, shouldLoad]);

    return (
      <div className="movie-card" onClick={handleCardClick}>
        <div
          className={`movie-card__poster ${isLargeRow ? "movie-card__poster--large" : ""} ${isLandscape ? 'movie-card__poster--landscape' : ''}`}
        >
          {!imageLoaded && !showFallback && <div className="movie-card__skeleton" />}
          {showFallback ? (
            <div className="movie-card__fallback">
              <div className="movie-card__fallback-content">
                <p className="movie-card__fallback-title">
                  {movie?.title || movie?.name || ""}
                </p>
                <p className="movie-card__fallback-rating">
                  ⭐ {movie?.vote_average?.toFixed(1) || "N/A"}
                </p>
              </div>
            </div>
          ) : (
            <img
              ref={imgRef}
              className={`movie-card__image ${imageLoaded ? "movie-card__image--loaded" : ""}`}
              src={shouldLoad ? imageUrl : undefined}
              alt={movie?.name || movie?.title || "Movie"}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              loading="lazy"
              decoding="async"
            />
          )}
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
