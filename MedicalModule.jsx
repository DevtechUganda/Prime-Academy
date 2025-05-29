import React from "react";
import ResourceGenerator from "../common/ResourceGenerator";
import OpportunityMap from "../common/OpportunityMap";
import Leaderboard from "../common/Leaderboard";
import NotificationBell from "../common/NotificationBell";

export default function MedicalModule() {
  return (
    <div className="module-container">
      <h1>MedLearn: Next-Gen Medical Platform</h1>
      <NotificationBell />
      <ResourceGenerator domain="medical" />
      <OpportunityMap domain="medical" />
      <Leaderboard domain="medical" />
      {/* Add: Challenges, Knowledge Graph, AI Mentor, CME Credits, Institutional Integration, etc */}
    </div>
  );
}