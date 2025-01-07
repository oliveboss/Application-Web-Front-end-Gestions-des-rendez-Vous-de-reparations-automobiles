import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ClientDashboard.css'; // Ajoutez vos styles personnalisés

const ClientDashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1>Bienvenue sur votre Tableau de Bord Client </h1>
        
        <div className="dashboard-cards">
          <div className="card">
            <h2><i className="fas fa-car"></i> Mes Véhicules</h2>
            <p>Gérez vos informations sur les véhicules.</p>
            <Link to="/vehicle-management" className="card-button">
              <i className="fas fa-tools"></i> Gérer mes véhicules
            </Link>
          </div>
          
          <div className="card">
            <h2><i className="fas fa-calendar-alt"></i> Mes Rendez-vous</h2>
            <p>Planifiez et consultez vos rendez-vous.</p>
            <Link to="/appointment-management" className="card-button">
              <i className="fas fa-calendar-check"></i> Gérer mes rendez-vous
            </Link>
          </div>
          
          <div className="card">
            <h2><i className="fas fa-user"></i> Mon Profil</h2>
            <p>Modifiez vos informations personnelles.</p>
            <Link to="/profile" className="card-button">
              <i className="fas fa-edit"></i> Mon Profil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
