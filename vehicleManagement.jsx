import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/vehicleManagement.css';

const VehicleManagement = () => {
  const [vehicles, setVehicles] = useState([]);
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [vin, setVin] = useState('');
  const [searchedVehicle, setSearchedVehicle] = useState(null);

  const fetchVehicles = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json');
      if (response.data && response.data.Results) {
        const allMakes = response.data.Results;
        const vehiclesWithModels = [];

        for (const make of allMakes) {
          const encodedMakeName = encodeURIComponent(make.Make_Name);
          let firstModel = 'Aucun modèle disponible';

          try {
            const modelResponse = await axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${encodedMakeName}?format=json`);
            if (modelResponse.data.Results && modelResponse.data.Results.length > 0) {
              firstModel = modelResponse.data.Results[0].Model_Name;
              vehiclesWithModels.push({ make: make.Make_Name, model: firstModel, year: new Date().getFullYear() });
            }
          } catch (modelError) {
            console.error(`Erreur pour ${make.Make_Name}:`, modelError.message);
          }

          if (vehiclesWithModels.length === 4) {
            break;
          }
        }

        setVehicles(vehiclesWithModels);
        localStorage.setItem('vehicles', JSON.stringify(vehiclesWithModels)); // Enregistrer dans localStorage
      } else {
        setError('Aucune marque trouvée.');
      }
    } catch (err) {
      console.error('Erreur lors de la récupération des marques:', err);
      setError('Erreur lors de la récupération des véhicules.');
    } finally {
      setLoading(false);
    }
  };

  const loadVehiclesFromStorage = () => {
    const storedVehicles = localStorage.getItem('vehicles');
    if (storedVehicles) {
      setVehicles(JSON.parse(storedVehicles)); // Charger depuis localStorage
    }
  };

  useEffect(() => {
    loadVehiclesFromStorage(); // Charger les véhicules au démarrage

    // Appelle l'API seulement si aucun véhicule n'est stocké
    if (!localStorage.getItem('vehicles')) {
      fetchVehicles();
    }
  }, []);

  const handleAddOrUpdateVehicle = (e) => {
    e.preventDefault();
    const newVehicle = { make, model, year };

    if (editingIndex !== null) {
      const updatedVehicles = vehicles.map((vehicle, index) =>
        index === editingIndex ? newVehicle : vehicle
      );
      setVehicles(updatedVehicles);
      localStorage.setItem('vehicles', JSON.stringify(updatedVehicles)); // Mettre à jour localStorage
      setEditingIndex(null);
    } else {
      const updatedVehicles = [...vehicles, newVehicle];
      setVehicles(updatedVehicles);
      localStorage.setItem('vehicles', JSON.stringify(updatedVehicles)); // Mettre à jour localStorage
    }
    clearForm();
  };

  const handleEditVehicle = (index) => {
    const vehicle = vehicles[index];
    setEditingIndex(index);
    setMake(vehicle.make);
    setModel(vehicle.model);
    setYear(vehicle.year);
  };

  const handleDeleteVehicle = (indexToDelete) => {
    const updatedVehicles = vehicles.filter((_, index) => index !== indexToDelete);
    setVehicles(updatedVehicles);
    localStorage.setItem('vehicles', JSON.stringify(updatedVehicles)); // Mettre à jour localStorage
  };

  const clearForm = () => {
    setMake('');
    setModel('');
    setYear('');
  };

  const handleSearchVin = () => {
    const foundVehicle = vehicles.find(vehicle => vehicle.vin === vin);
    if (foundVehicle) {
      setSearchedVehicle(foundVehicle);
    } else {
      setSearchedVehicle(null);
      setError('Aucun véhicule trouvé pour ce VIN.');
    }
  };

  return (
    <div className="container">
      <h1>Gestion des Véhicules</h1>
      {error && <div className="error">{error}</div>}
      {loading && <div className="loading">Chargement...</div>}

      {/* Champ de recherche pour VIN */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Rechercher par VIN"
          value={vin}
          onChange={(e) => setVin(e.target.value)}
        />
        <button onClick={handleSearchVin}>
          <i className="fas fa-search"></i> Rechercher
        </button>
      </div>

      {searchedVehicle && (
        <div className="searched-vehicle">
          <h2>Détails du Véhicule Trouvé</h2>
          <p>Marque: {searchedVehicle.make}</p>
          <p>Modèle: {searchedVehicle.model}</p>
          <p>Année: {searchedVehicle.year}</p>
        </div>
      )}

      <form onSubmit={handleAddOrUpdateVehicle} className="form-group">
        <input
          type="text"
          placeholder="Marque"
          value={make}
          onChange={(e) => setMake(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Modèle"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Année"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />
        <button type="submit" className="update">
          <i className={editingIndex !== null ? "fas fa-sync-alt" : "fas fa-plus"}></i>
          {editingIndex !== null ? ' Mettre à Jour' : ' Ajouter'}
        </button>
      </form>

      <h2>Liste des Véhicules</h2>
      <div className="vehicle-list">
        <div className="vehicle-header">
          <span>Marque</span>
          <span>Modèle</span>
          <span>Actions</span>
        </div>
        {vehicles.map((vehicle, index) => (
          <div key={index} className="vehicle-item">
            <span>{vehicle.make}</span>
            <span>{vehicle.model}</span>
            <div className="vehicle-actions">
              <button onClick={() => handleEditVehicle(index)}>
                <i className="fas fa-edit"></i> Modifier
              </button>
              <button className="delete" onClick={() => handleDeleteVehicle(index)}>
                <i className="fas fa-trash-alt"></i> Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehicleManagement;
