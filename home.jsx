import React from 'react';
import garageImage1 from '../images/garage1.jpg'; 
import garageImage2 from '../images/garage2.jpg'; 
import garageImage3 from '../images/garage3.jpg'; 
import { Link } from 'react-router-dom';
import '../styles/home.css'; 
import video from '../images/demo.mp4'; 


const Home = () => {
  return (  
    <div className="home-container">
      <h1 className="welcome-title">
        <em>Bienvenue dans votre nouvelle aventure, où chaque rendez-vous compte</em>
      </h1>
      
      <section className="intro-section">
        <div className="image-container">
          <div className="image-card">
            <img src={garageImage1} alt="Garage 1" className="intro-image" />
            <p><i className="fas fa-oil-can"></i> Service de changement d'huile</p>
          </div>
          <div className="image-card">
            <img src={garageImage2} alt="Garage 2" className="intro-image" />
            <p><i className="fas fa-car-side"></i> Service de remplacement de pneus</p>
            </div>
          <div className="image-card">
            <img src={garageImage3} alt="Garage 3" className="intro-image" />
            <p><i className="fas fa-wrench"></i> Service de réparations diverses</p>
          </div>
        </div>
        
        <p>
          Cette application vous permet de gérer vos rendez-vous de réparation automobile facilement et rapidement.
          Que ce soit pour un changement d'huile, un contrôle technique ou tout autre service, nous sommes là pour vous aider.
        </p>
      </section>

      <section className="features-section">
        <h2><i className="fas fa-star"></i> Fonctionnalités</h2>
        <ul>
          <li><i className="fas fa-user-circle"></i> Créer et gérer votre compte utilisateur</li>
          <li><i className="fas fa-car"></i> Ajouter et gérer vos véhicules</li>
          <li><i className="fas fa-calendar-alt"></i> Prendre des rendez-vous avec des mécaniciens</li>
          <li><i className="fas fa-file-invoice"></i> Consulter vos factures et paiements</li>
        </ul>
      </section>

      <section className="video-section">
        <h2><i className="fas fa-video"></i> Découvrez notre service</h2>
        <video width="100%" height="315" controls>
          <source src={video} type="video/mp4" />
          Votre navigateur ne prend pas en charge la vidéo HTML5.
        </video>
        <p>Pour prendre un rendez-vous, sélectionnez votre mécanicien, choisissez un créneau horaire, et remplissez les informations nécessaires sur votre véhicule. Vous pouvez également consulter l'historique de vos rendez-vous à tout moment.</p>
      </section>

      <section className="call-to-action">
        <h2><i className="fas fa-paper-plane"></i> Prêt à commencer ?</h2>
        <p>
          Inscrivez-vous dès maintenant et prenez votre premier rendez-vous !
        </p>
        <Link to="/register">
          <button className="cta-button"><i className="fas fa-user-plus"></i> S'inscrire</button>
        </Link>
      </section>
    </div>
  );
};

export default Home;
