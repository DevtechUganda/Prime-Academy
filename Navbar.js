import React from "react";
import "./Navbar.css";

const sections = [
  { key: "home", label: "Home" },
  { key: "programs", label: "Programs" },
  { key: "about", label: "About" },
  { key: "testimonials", label: "Testimonials" },
  { key: "contact", label: "Contact" },
];

function Navbar({ onNavigate, currentSection, logo }) {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Prime Academy Logo" />
        <span>Prime Academy</span>
      </div>
      <ul className="navbar-links">
        {sections.map((sec) => (
          <li
            key={sec.key}
            className={currentSection === sec.key ? "active" : ""}
            onClick={() => onNavigate(sec.key)}
          >
            {sec.label}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;