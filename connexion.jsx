import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../pages/AuthContext'; // Importez le contexte

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Obtenez la fonction login
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials({ ...credentials, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && 
        storedUser.username === credentials.username && 
        storedUser.password === credentials.password) {
      alert("Connexion réussie !");
      login(); // Mettez à jour l'état d'authentification
      navigate('/dashboard'); 
    } else {
      alert("Erreur de connexion : Vérifiez vos identifiants.");
    }
  };

  return (
    <div className="wrapper">
      <div className="main">
        <form onSubmit={handleSubmit}>
          <h2>Connexion</h2>
          <div>
            <label htmlFor="username">
              <i className="fas fa-user"></i> Nom d'utilisateur
            </label>
            <input type="text" id="username" value={credentials.username} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="password">
              <i className="fas fa-lock"></i> Mot de passe
            </label>
            <input type="password" id="password" value={credentials.password} onChange={handleChange} required />
          </div>
          <button type="submit">
            <i className="fas fa-sign-in-alt"></i> Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
