import React, { useState } from "react";
import ProgramSection from "./ProgramSection";
import "./ProgramList.css";

const programs = [
  {
    name: "Medical",
    description:
      "Comprehensive medical programs designed to train future healthcare professionals with hands-on experience and a modern curriculum.",
    icon: "🩺",
    highlights: [
      "Modern Labs",
      "Clinical Practice",
      "Expert Faculty",
      "Research Opportunities",
    ],
  },
  {
    name: "Engineering",
    description:
      "Cutting-edge engineering courses focused on innovation, technology, and practical problem-solving skills.",
    icon: "🛠️",
    highlights: [
      "Robotics & AI",
      "Industry Partnerships",
      "Workshops",
      "Internships",
    ],
  },
  {
    name: "Business",
    description:
      "Business programs that foster entrepreneurial spirit, leadership, and real-world business acumen.",
    icon: "💼",
    highlights: [
      "Entrepreneurship",
      "Finance Labs",
      "Mentorship",
      "Incubation Center",
    ],
  },
  {
    name: "Agriculture",
    description:
      "Agriculture courses promoting sustainable practices, agribusiness, and advanced agricultural sciences.",
    icon: "🌱",
    highlights: [
      "Field Studies",
      "Agri-Tech",
      "Sustainability",
      "Farm Management",
    ],
  },
];

function ProgramList() {
  const [selected, setSelected] = useState(0);

  return (
    <section className="section" id="programs">
      <h2 className="programs-title">Our Programs</h2>
      <div className="program-tabs">
        {programs.map((prog, idx) => (
          <button
            key={prog.name}
            className={`program-tab${selected === idx ? " active" : ""}`}
            onClick={() => setSelected(idx)}
          >
            {prog.icon} {prog.name}
          </button>
        ))}
      </div>
      <ProgramSection {...programs[selected]} />
    </section>
  );
}

export default ProgramList;