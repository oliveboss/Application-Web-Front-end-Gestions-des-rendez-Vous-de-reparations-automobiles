import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../pages/AuthContext';
import '../styles/header.css';

const Header = () => {
  const { isAuthenticated, logout } = useAuth(); // Ajoutez logout ici

  return (
    <header>
      <nav>
        <Link to="/">
          <i className="fas fa-home"></i> Accueil
        </Link>
        {isAuthenticated && (
          <>
            <Link to="/profile">
              <i className="fas fa-user"></i> Profil
            </Link>
            <Link to="/dashboard">
              <i className="fas fa-tachometer-alt"></i> Tableau de bord
            </Link>
          </>
        )}
        <div className="auth-links">
          {!isAuthenticated ? (
            <>
              <Link to="/register" className="auth-button">
                <i className="fas fa-user-plus"></i> S'inscrire
              </Link>
              <Link to="/login" className="auth-button">
                <i className="fas fa-sign-in-alt"></i> Se connecter
              </Link>
            </>
          ) : (
            <button className="auth-button" onClick={logout}>
              <i className="fas fa-sign-out-alt"></i> Se déconnecter
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
