import React, { useState } from "react";
import axios from "axios";

export default function ResourceGenerator({ domain }) {
  const [topic, setTopic] = useState("");
  const [resource, setResource] = useState(null);

  async function generateResource(e) {
    e.preventDefault();
    // Call backend AI generator
    const { data } = await axios.post(`/api/ai/resource-generator`, { topic, domain });
    setResource(data);
  }

  return (
    <div className="resource-generator">
      <form onSubmit={generateResource}>
        <input
          type="text"
          placeholder={`Enter ${domain} topic (e.g., Cardiac Arrhythmia)`}
          value={topic}
          onChange={e => setTopic(e.target.value)}
        />
        <button type="submit">Generate Tutorial</button>
      </form>
      {resource && (
        <div className="resource-content">
          <h2>{resource.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: resource.html }} />
          {/* resource.html from AI generator: includes code, diagrams, quizzes */}
        </div>
      )}
    </div>
  );
}