import { createSlice } from '@reduxjs/toolkit';

const vehicleSlice = createSlice({
  name: 'vehicles',
  initialState: {
    vehicles: [],
  },
  reducers: {
    addVehicle: (state, action) => {
      const existingVehicle = state.vehicles.find(vehicle => vehicle.vin === action.payload.vin);
      if (!existingVehicle) {
        state.vehicles.push(action.payload);
      }
    },
    updateVehicle: (state, action) => {
      const index = state.vehicles.findIndex(vehicle => vehicle.vin === action.payload.vin);
      if (index !== -1) {
        state.vehicles[index] = action.payload;
      }
    },
    deleteVehicle: (state, action) => {
      state.vehicles = state.vehicles.filter(vehicle => vehicle.vin !== action.payload);
    },
  },
});

export const { addVehicle, updateVehicle, deleteVehicle } = vehicleSlice.actions;
export default vehicleSlice.reducer;
