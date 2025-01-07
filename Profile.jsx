import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../redux/userSlice';
import '../styles/userProfile.css';

const UserProfile = () => {
  const userInfo = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [updatedInfo, setUpdatedInfo] = useState({ ...userInfo });
  const [isEditing, setIsEditing] = useState(false);

  if (!userInfo) {
    return <div>Aucune information utilisateur trouvée.</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(updatedInfo)); // Met à jour les informations de l'utilisateur
    setIsEditing(false);
  };

  return (
    <div className="container">
      <h1>Mon Profil</h1>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="form-group">
          {/* Champ Prénom */}
          <div>
            <label htmlFor="firstName">
              <i className="fas fa-user"></i> Prénom
            </label>
            <input
              type="text"
              name="firstName"
              value={updatedInfo.firstName}
              onChange={handleChange}
              placeholder="Prénom"
              required
            />
          </div>
          {/* Champ Nom */}
          <div>
            <label htmlFor="lastName">
              <i className="fas fa-user"></i> Nom
            </label>
            <input
              type="text"
              name="lastName"
              value={updatedInfo.lastName}
              onChange={handleChange}
              placeholder="Nom"
              required
            />
          </div>
          {/* Champ Email */}
          <div>
            <label htmlFor="email">
              <i className="fas fa-envelope"></i> Email
            </label>
            <input
              type="email"
              name="email"
              value={updatedInfo.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>
          {/* Champ Date de naissance */}
          <div>
            <label htmlFor="dob">
              <i className="fas fa-calendar-alt"></i> Date de naissance
            </label>
            <input
              type="date"
              name="dob"
              value={updatedInfo.dob || ''} // Ajout d'un fallback
              onChange={handleChange}
              required
            />
          </div>
          {/* Champ Type d'utilisateur */}
          <div>
            <label htmlFor="userType">
              <i className="fas fa-user-cog"></i> Type d'utilisateur
            </label>
            <select
              name="userType"
              value={updatedInfo.userType || 'client'} // Ajout d'un fallback
              onChange={handleChange}
              required
            >
              <option value="client">Client</option>
              <option value="mecanicien">Mécanicien</option>
            </select>
          </div>
          {/* Champ Mot de passe */}
          <div>
            <label htmlFor="password">
              <i className="fas fa-lock"></i> Mot de passe
            </label>
            <input
              type="password"
              name="password"
              value={updatedInfo.password}
              onChange={handleChange}
              placeholder="Mot de passe"
              required
            />
          </div>
          <button type="submit" className="update-button">
            <i className="fas fa-save"></i> Mettre à Jour
          </button>
          <button type="button" onClick={() => setIsEditing(false)} className="cancel-button">
            <i className="fas fa-times"></i> Annuler
          </button>
        </form>
      ) : (
        <div>
          <h2>Informations de l'utilisateur</h2>
          <p><strong><i className="fas fa-user"></i> Nom :</strong> {userInfo.firstName}</p>
          <p><strong><i className="fas fa-user"></i> Prénom :</strong> {userInfo.lastName}</p>
          <p><strong><i className="fas fa-envelope"></i> Email :</strong> {userInfo.email}</p>
          <p><strong><i className="fas fa-calendar-alt"></i> Date de naissance :</strong> {userInfo.dob || 'Non renseignée'}</p>
          <p><strong><i className="fas fa-user-cog"></i> Type d'utilisateur :</strong> {userInfo.userType || 'Non renseigné'}</p>
          <p><strong><i className="fas fa-lock"></i> Mot de passe :</strong> {userInfo.password || 'Non renseigné'}</p>
          <button onClick={() => setIsEditing(true)}>
            <i className="fas fa-edit"></i> Modifier
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
