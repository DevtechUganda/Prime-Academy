import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import MedicalModule from './components/modules/MedicalModule';
import EngineeringModule from './components/modules/EngineeringModule';
import DataScienceModule from './components/modules/DataScienceModule';
import BusinessModule from './components/modules/BusinessModule';
import AdminDashboard from './components/admin/AdminDashboard';
import Leaderboard from './components/common/Leaderboard';
import OpportunityMap from './components/common/OpportunityMap';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<MedicalModule />} />
        <Route path="/engineering" element={<EngineeringModule />} />
        <Route path="/datascience" element={<DataScienceModule />} />
        <Route path="/business" element={<BusinessModule />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/opportunities" element={<OpportunityMap />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      <Footer />
    </Router>
  );
}