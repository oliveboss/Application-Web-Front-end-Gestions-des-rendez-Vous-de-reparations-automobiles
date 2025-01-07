import React, { useEffect, useState } from 'react';
import '../styles/appointmentScheduler.css';

const AppointmentScheduler = () => {
  const mechanics = [
    { id: 1, name: 'Abdoulaye' },
    { id: 2, name: 'Sergio' },
    { id: 3, name: 'Massimir' },
  ];

  const [appointments, setAppointments] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [selectedMechanic, setSelectedMechanic] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [editingAppointmentId, setEditingAppointmentId] = useState(null);

  // État pour le paiement
  const [paymentInfo, setPaymentInfo] = useState({ name: '', surname: '', cvc: '' });
  const [isPaymentVisible, setIsPaymentVisible] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);

  useEffect(() => {
    const storedAppointments = localStorage.getItem('appointments');
    if (storedAppointments) {
      setAppointments(JSON.parse(storedAppointments));
    }

    const storedVehicles = localStorage.getItem('vehicles');
    if (storedVehicles) {
      setVehicles(JSON.parse(storedVehicles));
    }
  }, []);

  const handleScheduleAppointment = (e) => {
    e.preventDefault();
    const newAppointment = {
      id: editingAppointmentId ? editingAppointmentId : Date.now(),
      mechanic: selectedMechanic,
      vehicle: selectedVehicle,
      date,
      time,
      symptoms,
      status: 'pending',
    };

    const updatedAppointments = editingAppointmentId
      ? appointments.map((appt) => (appt.id === editingAppointmentId ? newAppointment : appt))
      : [...appointments, newAppointment];

    setAppointments(updatedAppointments);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    clearForm();
  };

  const handleEditAppointment = (appointment) => {
    setSelectedMechanic(appointment.mechanic);
    setSelectedVehicle(appointment.vehicle);
    setDate(appointment.date);
    setTime(appointment.time);
    setSymptoms(appointment.symptoms);
    setEditingAppointmentId(appointment.id);
  };

  const handleDeleteAppointment = (id) => {
    const updatedAppointments = appointments.filter((appointment) => appointment.id !== id);
    setAppointments(updatedAppointments);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    alert('Rendez-vous supprimé avec succès !');
  };

  const handleAccept = (id) => {
    const updatedAppointments = appointments.map((appointment) =>
      appointment.id === id ? { ...appointment, status: 'accepted' } : appointment
    );
    setAppointments(updatedAppointments);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
  };

  const handleReject = (id) => {
    const updatedAppointments = appointments.map((appointment) =>
      appointment.id === id ? { ...appointment, status: 'rejected' } : appointment
    );
    setAppointments(updatedAppointments);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    alert(`Paiement effectué par ${paymentInfo.name} ${paymentInfo.surname}`);
    setIsPaymentVisible(false);
    setPaymentInfo({ name: '', surname: '', cvc: '' });
  };

  const clearForm = () => {
    setSelectedMechanic('');
    setSelectedVehicle('');
    setDate('');
    setTime('');
    setSymptoms('');
    setEditingAppointmentId(null);
  };

  return (
    <div className="container">
      <h1>{editingAppointmentId ? 'Modifier Rendez-vous' : 'Prendre Rendez-vous'}</h1>
      <form onSubmit={handleScheduleAppointment} className="form-group">
        <select value={selectedMechanic} onChange={(e) => setSelectedMechanic(e.target.value)} required>
          <option value="">Choisir un mécanicien</option>
          {mechanics.map((mechanic) => (
            <option key={mechanic.id} value={mechanic.name}>{mechanic.name}</option>
          ))}
        </select>

        <select value={selectedVehicle} onChange={(e) => setSelectedVehicle(e.target.value)} required>
          <option value="">Choisir un véhicule</option>
          {vehicles.map((vehicle) => (
            <option key={vehicle.vin} value={vehicle.vin}>{`${vehicle.make} ${vehicle.model}`}</option>
          ))}
        </select>

        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
        <textarea placeholder="Symptômes ou services souhaités" value={symptoms} onChange={(e) => setSymptoms(e.target.value)} required></textarea>
        <button type="submit">
          <i className="fas fa-calendar-plus"></i> {editingAppointmentId ? 'Confirmer Modification' : 'Prendre Rendez-vous'}
        </button>
      </form>

      <h2>Mes Rendez-vous</h2>
      <div className="appointment-list">
        {appointments.length === 0 ? (
          <p>Aucun rendez-vous à afficher.</p>
        ) : (
          appointments.map((appointment) => (
            <div key={appointment.id} className="appointment-item">
              <p>
                <i className="fas fa-calendar-alt"></i> {`${appointment.date} à ${appointment.time} - ${appointment.mechanic} pour ${appointment.vehicle} (${appointment.status})`}
              </p>
              <p><i className="fas fa-symptom"></i> Symptômes: {appointment.symptoms}</p>
              {appointment.status !== 'accepted' && (
                <>
                  <button className='modifier' onClick={() => handleEditAppointment(appointment)}>Modifier</button>
                  <button className='supprimer' onClick={() => handleDeleteAppointment(appointment.id)}>Supprimer</button>
                </>
              )}
              
              {appointment.status === 'accepted' && (
                <div>
                  <button onClick={() => {
                    setIsPaymentVisible(!isPaymentVisible);
                    setSelectedAppointmentId(appointment.id);
                  }}>
                    Voulez-vous payer ?
                  </button>
                  {isPaymentVisible && selectedAppointmentId === appointment.id && (
                    <form onSubmit={handlePaymentSubmit}>
                      <input
                        type="text"
                        name="name"
                        placeholder="Nom"
                        value={paymentInfo.name}
                        onChange={handlePaymentChange}
                        required
                      />
                      <input
                        type="text"
                        name="surname"
                        placeholder="Prénom"
                        value={paymentInfo.surname}
                        onChange={handlePaymentChange}
                        required
                      />
                      <input
                        type="text"
                        name="cvc"
                        placeholder="CVC"
                        value={paymentInfo.cvc}
                        onChange={handlePaymentChange}
                        required
                      />
                      <button type="submit">Effectuer le Paiement</button>
                    </form>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AppointmentScheduler;
