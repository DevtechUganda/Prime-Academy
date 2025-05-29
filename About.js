import React from "react";
import "./About.css";

function About() {
  return (
    <section className="section about-section" id="about">
      <h2>About Prime Academy</h2>
      <p>
        Prime Academy is a center of excellence dedicated to fostering innovation and leadership across Medical, Engineering, Business, and Agriculture fields. 
        Our diverse programs are designed to equip students with hands-on experience, critical thinking, and the skills required in today’s world. 
      </p>
      <ul className="about-values">
        <li>🌟 Commitment to Quality Education</li>
        <li>🤝 Inclusive and Supportive Community</li>
        <li>💡 Focus on Innovation and Real-World Skills</li>
        <li>🌍 Sustainability and Social Responsibility</li>
      </ul>
    </section>
  );
}

export default About;