import React, { useState, useEffect } from "react";
import "./Nav.css";
import Netflixlogo from "./Netflix-logo-red-black-png.png";
function Nav() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`nav ${show ? "nav__black" : ""}`}>
      <img className="nav__logo" src={Netflixlogo} alt="Netflix Logo" />
      <img
        className="nav__avatar"
        src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png"
        alt="Avatar logo"
      />
    </div>
  );
}

export default Nav;
