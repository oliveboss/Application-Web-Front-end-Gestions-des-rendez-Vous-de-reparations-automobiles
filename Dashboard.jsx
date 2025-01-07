import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styles/Dashboard.css';
import mecano from '../images/mecano.jpg'; 
import client from '../images/client.jpg'; 


const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="dashboard">
      <h1>Bienvenue</h1>
      <p>Choisissez une option pour continuer :</p>
      <div className="options-container">
        
          <div className="option">
          <p><img src={client} alt="Client" className="option-image" /></p>

            <Link to="/client-dashboard" className="button">
              <span role="img" aria-label="client">🏠</span>
             Accéder au tableau de bord client
            </Link>
           
            <p>
              Gérez vos informations personnelles, vos véhicules et planifiez vos rendez-vous.
              Profitez d'une expérience personnalisée adaptée à vos besoins !
            </p>
          </div>
         
          <div className="option">
          <p> <img src={mecano} alt="Mécanicien" className="option-image" /></p>
            <Link to="/mechanic-dashboard" className="button">
              <span role="img" aria-label="mécanicien">🛠️</span>
              Accéder au tableau de bord mécanicien
            </Link>
         

            <p>
              Consultez vos prochains rendez-vous et les informations des clients.
              Optimisez votre emploi du temps et améliorez votre efficacité au travail !
            </p>
          </div>
        
      </div>
      <footer>
        <p>Merci de faire partie de notre communauté !</p>
      </footer>
    </div>
  );
};

export default Dashboard;
