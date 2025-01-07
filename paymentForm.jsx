// PaymentForm.js
import React, { useState } from 'react';

const PaymentForm = ({ appointmentId }) => {
  const [cardInfo, setCardInfo] = useState('');

  const handlePayment = (e) => {
    e.preventDefault();
    // Logique de traitement de paiement
    alert(`Paiement traité pour le rendez-vous ID : ${appointmentId}`);
  };

  return (
    <form onSubmit={handlePayment}>
      <input
        type="text"
        value={cardInfo}
        onChange={(e) => setCardInfo(e.target.value)}
        placeholder="Numéro de carte"
        required
      />
      <button type="submit">Payer</button>
    </form>
  );
};

export default PaymentForm;
