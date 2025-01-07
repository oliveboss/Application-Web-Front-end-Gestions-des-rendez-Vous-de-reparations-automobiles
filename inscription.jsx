import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/userSlice';
import '../styles/inscription.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    userType: '',
    password: '',
    confirmPassword: '',
  });
  const loading = useSelector((state) => state.auth.loading);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const actionResult = await dispatch(registerUser(formData)).unwrap();
      const user = {
        username: actionResult.email,
        password: formData.password,
        userType: formData.userType,
        firstName: formData.firstName,
    lastName: formData.lastName,
    email: actionResult.email,
    dob: formData.dob,
      };
      localStorage.setItem('user', JSON.stringify(user));
      
      alert("Inscription réussie ! Vous pouvez maintenant vous connecter.");
      navigate('/login');
    } catch (err) {
      alert("Erreur lors de l'inscription. Veuillez réessayer.");
      console.error(err);
    }
  };

  return (
    <div className="wrapper">
      <div className="main">   
        <form onSubmit={handleSubmit}>
          <div>
            <h2>Inscription</h2>
            <label htmlFor="firstName">
              <i className="fas fa-user"></i> Nom
            </label>
            <input type="text" id="firstName" value={formData.firstName} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="lastName">
              <i className="fas fa-user"></i> Prénom
            </label>
            <input type="text" id="lastName" value={formData.lastName} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="email">
              <i className="fas fa-envelope"></i> Adresse e-mail
            </label>
            <input type="email" id="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="dob">
              <i className="fas fa-calendar-alt"></i> Date de naissance
            </label>
            <input type="date" id="dob" value={formData.dob} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="userType">
              <i className="fas fa-user-cog"></i> Type d'utilisateur
            </label>
            <select id="userType" value={formData.userType} onChange={handleChange} required>
              <option value="">Sélectionner un type</option>
              <option value="client">Client</option>
              <option value="mecanicien">Mécanicien</option>
            </select>
          </div>
          <div>
            <label htmlFor="password">
              <i className="fas fa-key"></i> Mot de passe
            </label>
            <input type="password" id="password" value={formData.password} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="confirmPassword">
              <i className="fas fa-key"></i> Confirmer le mot de passe
            </label>
            <input type="password" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
          </div>
          <button type="submit">S'inscrire</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
