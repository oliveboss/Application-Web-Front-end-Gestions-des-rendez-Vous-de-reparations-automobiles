import React from 'react';
import { Link } from 'react-router-dom';

const MechanicDashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1><em>Bienvenue sur votre Tableau de Bord Mécanicien</em></h1>
        
        <div className="dashboard-cards">
          <div className="card">
            <h2><i className="fas fa-calendar-alt"></i> Mes Rendez-vous</h2>
            <p>Consultez vos prochains rendez-vous avec les clients et visualisez vos bénéfices et factures des clients.</p>
            <Link to="/mecano_rendez" className="card-button">
              <i className="fas fa-cogs"></i> Gérer mes rendez-vous
            </Link>
          </div>

          <div className="card">
            <h2><i className="fas fa-user"></i> Mon Profil</h2>
            <p>Modifiez vos informations personnelles. Vous pouvez les enregistrer et y accéder quand vous voulez.</p>
            <Link to="/profile" className="card-button">
              <i className="fas fa-user-edit"></i> Mon Profil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MechanicDashboard;
