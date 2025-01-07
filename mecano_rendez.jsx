import React, { useEffect, useState } from 'react';
import '../styles/mecano_rendez.css';

const AppointmentManagement1 = () => {
  const [appointmentsData, setAppointmentsData] = useState([]);

  useEffect(() => {
    const storedAppointments = localStorage.getItem('appointments');
    if (storedAppointments) {
      setAppointmentsData(JSON.parse(storedAppointments));
    }
  }, []);

  const handleInvoiceClick = (appointment) => {
    const invoiceDetails = `
      Facture:
      Véhicule: ${appointment.vehicle}
      Date: ${appointment.date}
      Heure: ${appointment.time}
      Symptômes: ${appointment.symptoms}
    `;
    alert(invoiceDetails);
  };

  const handleAccept = (id) => {
    const updatedAppointments = appointmentsData.map((appointment) =>
      appointment.id === id ? { ...appointment, status: 'accepted' } : appointment
    );
    setAppointmentsData(updatedAppointments);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
  };

  const handleReject = (id) => {
    const updatedAppointments = appointmentsData.map((appointment) =>
      appointment.id === id ? { ...appointment, status: 'rejected' } : appointment
    );
    setAppointmentsData(updatedAppointments);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
  };

  return (
    <div className="container">
      <h1>Mes Rendez-vous</h1>
      {appointmentsData.length === 0 ? (
        <p>Aucun rendez-vous à afficher.</p>
      ) : (
        <ul className="appointment-list">
          {appointmentsData.map((appointment) => (
            <li key={appointment.id} className="appointment-item">
              <h3>
                Rendez-vous le {appointment.date} à {appointment.time} ({appointment.status})
              </h3>
              <p>
                <i className="fas fa-car"></i>
                Véhicule: {appointment.vehicle}
              </p>
              <p>
                <i className="fas fa-symptom"></i>
                Symptômes: {appointment.symptoms}
              </p>
              <p>
                <button className="invoice-button" onClick={() => handleInvoiceClick(appointment)}>
                  <i className="fas fa-file-invoice"></i> Consulter Facture
                </button>
              </p>
              {appointment.status === 'pending' && (
                <div>
                  <button className="accept-button" onClick={() => handleAccept(appointment.id)}>
                    <i className="fas fa-check"></i> Accepter
                  </button>
                  <button className="reject-button" onClick={() => handleReject(appointment.id)}>
                    <i className="fas fa-times"></i> Refuser
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AppointmentManagement1;
