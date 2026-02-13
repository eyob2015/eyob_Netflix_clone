import React, { useEffect, useState } from "react";
import "./Banner.css";
import api from "../../services/api";
import { API_ENDPOINTS, IMAGE_BASE_URL } from "../../constants/apiConstants";
import { truncateString } from "../../utils/stringUtils";

/**
 * Banner Component
 * Displays a featured movie/show with backdrop image and premium styling
 */
function Banner() {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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

  if (isLoading) {
    return <div className="banner banner--loading" />;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("${IMAGE_BASE_URL}${movie?.backdrop_path}")`,
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
            <button className="banner__button banner__button--primary">
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
  );
}

export default Banner;
