import React from "react";
import "./Footer.css";

/**
 * Footer Component
 * Displays footer with links and branding
 */
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__top">
          <div className="footer__column">
            <h4 className="footer__column-title">Company</h4>
            <ul className="footer__links">
              <li>
                <a href="#about">About Us</a>
              </li>
              <li>
                <a href="#jobs">Careers</a>
              </li>
              <li>
                <a href="#investor">Investor Relations</a>
              </li>
              <li>
                <a href="#press">Press Release</a>
              </li>
            </ul>
          </div>

          <div className="footer__column">
            <h4 className="footer__column-title">Help & Support</h4>
            <ul className="footer__links">
              <li>
                <a href="#help">Help Center</a>
              </li>
              <li>
                <a href="#contact">Contact Us</a>
              </li>
              <li>
                <a href="#account">Account Settings</a>
              </li>
              <li>
                <a href="#redeem">Redeem Gift Card</a>
              </li>
            </ul>
          </div>

          <div className="footer__column">
            <h4 className="footer__column-title">Legal</h4>
            <ul className="footer__links">
              <li>
                <a href="#terms">Terms of Use</a>
              </li>
              <li>
                <a href="#privacy">Privacy Policy</a>
              </li>
              <li>
                <a href="#cookie">Cookie Preferences</a>
              </li>
              <li>
                <a href="#corporate">Corporate Information</a>
              </li>
            </ul>
          </div>

          <div className="footer__column">
            <h4 className="footer__column-title">Netflix</h4>
            <ul className="footer__links">
              <li>
                <a href="#browse">Browse</a>
              </li>
              <li>
                <a href="#new">New & Popular</a>
              </li>
              <li>
                <a href="#my-list">My List</a>
              </li>
              <li>
                <a href="#top">Top 10 Today</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__divider" />

        <div className="footer__bottom">
          <p className="footer__text">
            © {currentYear} Netflix Clone. This is a demonstration project.
          </p>
          <p className="footer__text">
            Built with React | Powered by TMDB API
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
