// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './userSlice'; // Assure-toi de créer un slice pour l'authentification
import vehicleReducer from './vehicleSlice'; // Importer le slice des véhicules
import appointmentReducer from './appointmentSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    vehicles: vehicleReducer, // Ajouter le reducer des véhicules
    appointments: appointmentReducer,

  },
});

export default store;
