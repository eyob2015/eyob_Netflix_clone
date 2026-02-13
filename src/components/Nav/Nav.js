import React, { useState, useEffect } from "react";
import "./Nav.css";
import NetflixLogo from "../../assets/images/Netflix-logo-red-black-png.png";

/**
 * Navigation Component
 * Fixed navigation bar with Netflix logo and user avatar
 * Features dynamic background on scroll
 */
function Nav() {
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackground(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`nav ${showBackground ? "nav--scrolled" : ""}`}>
      <div className="nav__container">
        <img className="nav__logo" src={NetflixLogo} alt="Netflix Logo" />
        <div className="nav__items">
          <a href="#home" className="nav__link">
            Home
          </a>
          <a href="#trending" className="nav__link">
            Trending
          </a>
          <a href="#popular" className="nav__link">
            Popular
          </a>
        </div>
        <img
          className="nav__avatar"
          src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png"
          alt="User Avatar"
        />
      </div>
    </nav>
  );
}

export default Nav;
