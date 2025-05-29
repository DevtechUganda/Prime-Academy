import React from "react";
import "./Testimonials.css";

const testimonials = [
  {
    name: "Sarah K.",
    text: "Prime Academy gave me the skills and confidence to excel in my medical career. The faculty is supportive and the labs are amazing!",
    program: "Medical",
  },
  {
    name: "James M.",
    text: "The engineering program is truly innovative, with great exposure to real-world projects and industry mentors.",
    program: "Engineering",
  },
  {
    name: "Grace T.",
    text: "The business faculty helped me turn my startup idea into reality. The mentorship and resources are top-notch.",
    program: "Business",
  },
  {
    name: "Samuel O.",
    text: "Modern agriculture at its best! The field work and technology integration set Prime Academy apart.",
    program: "Agriculture",
  },
];

function Testimonials() {
  return (
    <section className="section testimonials-section" id="testimonials">
      <h2>What Our Students Say</h2>
      <div className="testimonials-list">
        {testimonials.map((t, i) => (
          <div className="testimonial-card" key={i}>
            <p className="testimonial-text">“{t.text}”</p>
            <div className="testimonial-footer">
              <span className="testimonial-name">{t.name}</span>
              <