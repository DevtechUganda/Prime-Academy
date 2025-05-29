import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AnalyticsPanel() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios.get("/api/admin/analytics").then(res => setStats(res.data));
  }, []);

  if (!stats) return <div>Loading analytics...</div>;
  return (
    <div>
      <h2>Platform Analytics</h2>
      <ul>
        <li>Active Users: {stats.activeUsers}</li>
        <li>Resources Created: {stats.resourcesCreated}</li>
        <li>Jobs/Internships Matched: {stats.jobsMatched}</li>
        <li>Top Module: {stats.topModule}</li>
        <li>Flagged Content: {stats.flaggedContentCount}</li>
      </ul>
    </div>
  );
}