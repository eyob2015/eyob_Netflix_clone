import React, { useEffect, useState } from "react";
import "./Banner.css";
import api from "../../services/api";
import { API_ENDPOINTS, IMAGE_BASE_URL } from "../../constants/apiConstants";
import { truncateString } from "../../utils/stringUtils";
import TrailerModal from "../TrailerModal/TrailerModal";
import movieDetailsService from "../../services/movieDetailsService";

/**
 * Banner Component
 * Displays a featured movie/show with backdrop image and premium styling
 */
function Banner() {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [bgLoaded, setBgLoaded] = useState(false);

  useEffect(() => {
    fetchBannerMovie();
  }, []);

  const fetchBannerMovie = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(API_ENDPOINTS.NETFLIX_ORIGINALS);
      if (response.data.results.length > 0) {
        const randomIndex = Math.floor(
          Math.random() * response.data.results.length
        );
        setMovie(response.data.results[randomIndex]);
      }
    } catch (error) {
      console.error("Error fetching banner movie:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getMovieTitle = () => {
    return movie?.title || movie?.name || movie?.original_name || "";
  };

  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerVideoId, setTrailerVideoId] = useState(null);
  const [trailerLoading, setTrailerLoading] = useState(false);

  const openTrailer = async () => {
    if (!movie?.id) return;
    setTrailerLoading(true);
    try {
      const videos = await movieDetailsService.fetchMovieVideos(movie.id, movie.media_type || "movie");
      // Prefer official trailers from YouTube
      let vid = videos.find((v) => v.site === "YouTube" && v.type === "Trailer");
      if (!vid) vid = videos.find((v) => v.site === "YouTube" && v.type === "Teaser");
      if (!vid) vid = videos.find((v) => v.site === "YouTube");
      if (vid) {
        setTrailerVideoId(vid.key);
        setShowTrailer(true);
      } else {
        console.warn("No YouTube trailer found for banner movie");
      }
    } catch (e) {
      console.error("Error fetching trailer for banner:", e);
    } finally {
      setTrailerLoading(false);
    }
  };

  const handleCloseTrailer = () => {
    setShowTrailer(false);
    setTrailerVideoId(null);
  };
  // Progressive background loading: first show a smaller image, then swap to original
  const smallBackdrop = movie?.backdrop_path
    ? IMAGE_BASE_URL.replace("/original", "/w780") + movie.backdrop_path
    : null;

  const fullBackdrop = movie?.backdrop_path ? IMAGE_BASE_URL + movie.backdrop_path : null;

  // start loading full image in background (hook must be called unconditionally)
  useEffect(() => {
    let img;
    if (fullBackdrop) {
      img = new Image();
      img.src = fullBackdrop;
      img.onload = () => setBgLoaded(true);
    }
    return () => {
      if (img) {
        img.onload = null;
      }
    };
  }, [fullBackdrop]);

  if (isLoading) {
    return <div className="banner banner--loading" />;
  }

  return (
    <>
      <header
        className="banner"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url("${bgLoaded && fullBackdrop ? fullBackdrop : smallBackdrop}")`,
          backgroundPosition: "center center",
        }}
      >
      <div className="banner__overlay" />
      <div className="banner__contents">
        <div className="banner__content-wrapper">
          <h1 className="banner__title">{getMovieTitle()}</h1>
          <p className="banner__rating">
            ⭐ {movie?.vote_average?.toFixed(1) || "N/A"}/10
          </p>
          <p className="banner__description">
            {truncateString(movie?.overview, 200)}
          </p>
          <div className="banner__buttons">
            <button
              className="banner__button banner__button--primary"
              onClick={openTrailer}
              aria-busy={trailerLoading}
            >
              <span className="banner__button-text">▶ PLAY</span>
            </button>
            <button className="banner__button banner__button--secondary">
              <span className="banner__button-text">+ MY LIST</span>
            </button>
          </div>
        </div>
      </div>
      <div className="banner__fadeBottom" />
    </header>

      {showTrailer && trailerVideoId && (
        <TrailerModal
          videoId={trailerVideoId}
          onClose={handleCloseTrailer}
          movieTitle={getMovieTitle()}
        />
      )}
    </>
  );
}

export default Banner;

// Render TrailerModal at end of file scope if needed via portal from parent
