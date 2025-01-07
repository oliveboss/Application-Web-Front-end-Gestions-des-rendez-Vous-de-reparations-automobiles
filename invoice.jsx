import React from 'react';

const Invoice = ({ appointment }) => {
  return (
    <div className="invoice">
      <h2>Facture</h2>
      <p><strong>Client :</strong> {appointment.client.firstName} {appointment.client.lastName}</p>
      <p><strong>Email :</strong> {appointment.client.email}</p>
      <p><strong>Véhicule :</strong> {appointment.vehicle.make} {appointment.vehicle.model} ({appointment.vehicle.year})</p>
      <p><strong>Date :</strong> {appointment.date}</p>
      <p><strong>Heure :</strong> {appointment.time}</p>
      <p><strong>Coût du service :</strong> ${appointment.cost}</p>
      <p><strong>Bénéfice :</strong> ${(appointment.cost * 0.15).toFixed(2)}</p>
    </div>
  );
};

export default Invoice;
