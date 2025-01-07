// slices/authSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null,
  loading: false,
  error: null,
};

// Créer une action asynchrone pour l'inscription
export const registerUser = createAsyncThunk('auth/register', async (userData) => {
  const response = await axios.post('https://dummyjson.com/users/add', userData);
  return response.data;
});

// Créer une action asynchrone pour la connexion
export const loginUser = createAsyncThunk('auth/login', async (credentials) => {
  const response = await axios.post('https://dummyjson.com/auth/login', credentials);
  return response.data;
});

// Créer une action synchrone pour la mise à jour de l'utilisateur
export const updateUser = (userData) => (dispatch, getState) => {
  const currentUser = getState().auth.user;
  const updatedUser = { ...currentUser, ...userData };

  dispatch({
    type: 'auth/update',
    payload: updatedUser,
  });
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Ajoute le cas pour la mise à jour de l'utilisateur
    update: (state, action) => {
      state.user = action.payload; // Met à jour les informations de l'utilisateur
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Assigne l'utilisateur
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Assigne l'utilisateur
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { update } = authSlice.actions; // Exporter l'action de mise à jour
export default authSlice.reducer;
