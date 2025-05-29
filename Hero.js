import React from "react";
import "./Hero.css";

function Hero({ logo }) {
  return (
    <section className="hero">
      <img src={logo} alt="Prime Academy" className="hero-logo" />
      <h1 className="hero-title">PRIME ACADEMY</h1>
      <p className="hero-tagline">Where Learning Meets Innovation</p>
      <a href="#programs" className="cta-btn">
        Explore Programs
      </a>
    </section>
  );
}

export default Hero;