import React, { useEffect, useState, useRef } from "react";
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
  const [player, setPlayer] = useState(null);
  const [ended, setEnded] = useState(false);
  const wrapperRef = useRef(null);
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
      modestbranding: 1,
      rel: 0,
      playsinline: 1,
      enablejsapi: 1,
    },
  };

  const onPlayerReady = (event) => {
    setPlayer(event.target);
    setEnded(false);
  };

  const onPlayerEnd = (event) => {
    // stop the player to avoid showing youtube suggested video UI
    try {
      event.target.pauseVideo();
      event.target.seekTo(0);
    } catch (e) {}
    setEnded(true);
  };

  const onPlayerStateChange = (event) => {
    // If user plays again, hide ended overlay
    if (event.data === 1) {
      setEnded(false);
    }
  };

  const handleReplay = () => {
    if (player) {
      setEnded(false);
      player.seekTo(0);
      player.playVideo();
    }
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
        <div className="trailer-modal__video-wrapper" ref={wrapperRef}>
          <YouTube
            videoId={videoId}
            opts={youtubeOptions}
            onReady={onPlayerReady}
            onEnd={onPlayerEnd}
            onStateChange={onPlayerStateChange}
          />

          {/* Ended overlay with replay/close controls */}
          {ended && (
            <div className="trailer-modal__ended-overlay">
              <button
                className="trailer-modal__replay"
                onClick={handleReplay}
                aria-label="Replay trailer"
              >
                ⟲ Replay
              </button>
              <button
                className="trailer-modal__close--large"
                onClick={onClose}
                aria-label="Close trailer"
              >
                ✕ Close
              </button>
            </div>
          )}
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
