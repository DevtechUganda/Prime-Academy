import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ContentModeration() {
  const [flagged, setFlagged] = useState([]);
  useEffect(() => {
    axios.get("/api/admin/flagged-content").then(res => setFlagged(res.data));
  }, []);
  return (
    <div>
      <h2>Flagged Content</h2>
      <ul>
        {flagged.map(item => (
          <li key={item.id}>
            <b>{item.type}</b>: {item.summary} ({item.status})
          </li>
        ))}
      </ul>
    </div>
  );
}