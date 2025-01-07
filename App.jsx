import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './composants/header'; // Vérifie que le nom du fichier est correct (majuscule)
import Home from './pages/home'; // Assure-toi que ce fichier existe
import Footer from './composants/footer'; // Ajuste le chemin si nécessaire
import Register from './pages/inscription'; // Vérifie que le chemin est correct
import Login from './pages/connexion'
import './styles/styles.css';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import ClientDashboard from './pages/ClientDashboard';
import MechanicDashboard from './pages/MechanicDashboard';
import AppointmentManagement from './pages/AppointmentManagement';
import VehicleManagement from './pages/vehicleManagement';
import AppointmentManagement1 from './pages/mecano_rendez'; // Assurez-vous que ce chemin est correct


const App = () => {
  return (
    <Router>
      <Header />
      <div className="wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mecano_rendez" element={<AppointmentManagement1/>} />

          <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/client-dashboard" element={<ClientDashboard />} />
        <Route path="/mechanic-dashboard" element={<MechanicDashboard />} />
        <Route path="/appointment-management" element={<AppointmentManagement />} />
        <Route path="/vehicle-management" element={<VehicleManagement />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};


export default App;
