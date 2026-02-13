import React, { useEffect } from "react";
import "./TrailerModal.css";
import YouTube from "react-youtube";

/**
 * TrailerModal Component
 * Displays movie trailer in a full-screen modal overlay
 * @param {string} videoId - YouTube video ID
 * @param {function} onClose - Callback when modal is closed
 * @param {string} movieTitle - Movie title for accessibility
 */
function TrailerModal({ videoId, onClose, movieTitle = "Trailer" }) {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  const youtubeOptions = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
      controls: 1,
      modestbranding: 0,
      rel: 0,
    },
  };

  return (
    <div className="trailer-modal__overlay" onClick={onClose}>
      <div
        className="trailer-modal__container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="trailer-modal__close"
          onClick={onClose}
          aria-label="Close trailer"
        >
          ✕
        </button>

        {/* Trailer Title */}
        <div className="trailer-modal__header">
          <h3 className="trailer-modal__title">{movieTitle}</h3>
          <p className="trailer-modal__subtitle">Official Trailer</p>
        </div>

        {/* Video Container */}
        <div className="trailer-modal__video-wrapper">
          <YouTube videoId={videoId} opts={youtubeOptions} />
        </div>

        {/* Footer info */}
        <div className="trailer-modal__footer">
          <p className="trailer-modal__info">
            Press <kbd>ESC</kbd> to close
          </p>
        </div>
      </div>
    </div>
  );
}

export default TrailerModal;
