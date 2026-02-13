import React, { useState, useEffect, useRef } from "react";
import "./Nav.css";
import { ReactComponent as NetflixLogo } from "../../assets/images/Netflix-logo.svg";
import { useNavigate } from "react-router-dom";

/**
 * Navigation Component
 * Fixed navigation bar with Netflix logo and user avatar
 * Features dynamic background on scroll
 */
function Nav() {
  const [showBackground, setShowBackground] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setShowBackground(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Prevent background scroll when mobile menu is open
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    window.addEventListener("click", handleOutside);
    return () => window.removeEventListener("click", handleOutside);
  }, []);

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/category/search?query=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
    } else {
      setSearchOpen((s) => !s);
    }
  };

  return (
    <nav className={`nav ${showBackground ? "nav--scrolled" : ""}`}>
      <div className="nav__container">
        <div className="nav__logo" onClick={() => navigate("/")} role="button" tabIndex={0}>
          <NetflixLogo />
        </div>

        <div className="nav__items">
          <button className="nav__link" onClick={() => {navigate('/'); setMenuOpen(false);}}>Home</button>
          <button className="nav__link" onClick={() => {navigate('/category/trending'); setMenuOpen(false);}}>Trending</button>
          <button className="nav__link" onClick={() => {navigate('/category/popular'); setMenuOpen(false);}}>Popular</button>
        </div>

        <div className="nav__actions">
          <div className={`nav__search ${searchOpen ? 'open' : ''}`}>
            <input
              aria-label="Search movies"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
            />
            <button className="nav__icon-btn" onClick={handleSearch} aria-label="Search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </button>
          </div>

          <button className="nav__icon-btn" aria-label="Notifications" onClick={() => setNotifOpen(s => !s)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
            <span className="nav__badge">3</span>
          </button>
          {notifOpen && (
            <div className="nav__notif-menu" role="menu">
              <div className="nav__notif-item">New trailer: <strong>Example Movie</strong></div>
              <div className="nav__notif-item">Recommendation: <strong>Another Movie</strong></div>
              <div className="nav__notif-item">No more notifications</div>
            </div>
          )}

          <div className="nav__profile" ref={profileRef}>
            <button className="nav__avatar-btn" onClick={() => setProfileOpen(s => !s)} aria-haspopup="true" aria-expanded={profileOpen}>
              <img src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png" alt="User" loading="lazy" />
            </button>
            {profileOpen && (
              <div className="nav__profile-menu" role="menu">
                <button className="nav__profile-item" onClick={() => {navigate('/profile'); setProfileOpen(false);}}>Profile</button>
                <button className="nav__profile-item" onClick={() => {navigate('/settings'); setProfileOpen(false);}}>Settings</button>
                <button className="nav__profile-item" onClick={() => { setProfileOpen(false); }}>Sign out</button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`nav__hamburger ${menuOpen ? "is-open" : ""}`}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((s) => !s)}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`nav__mobile-menu ${menuOpen ? "open" : ""}`}>
          <button className="nav__mobile-link" onClick={() => {navigate('/'); setMenuOpen(false);}}>Home</button>
          <button className="nav__mobile-link" onClick={() => {navigate('/category/trending'); setMenuOpen(false);}}>Trending</button>
          <button className="nav__mobile-link" onClick={() => {navigate('/category/popular'); setMenuOpen(false);}}>Popular</button>
          <div className="nav__mobile-divider" />
          <div className="nav__mobile-actions">
            <button className="nav__mobile-action" onClick={() => setSearchOpen(s => !s)}>Search</button>
            <button className="nav__mobile-action" onClick={() => setNotifOpen(s => !s)}>Notifications</button>
            <button className="nav__mobile-action" onClick={() => {navigate('/profile'); setMenuOpen(false);}}>Profile</button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
