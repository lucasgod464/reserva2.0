import React from 'react';
import ReservaCard from './ReservaCard';
import { adminStyles } from '../styles/adminStyles';

const ReservaList = ({ reservas, onAprovar }) => {
  if (reservas.length === 0) {
    return <p style={adminStyles.semReservas}>Nenhuma reserva encontrada.</p>;
  }

  return (
    <div style={adminStyles.reservasContainer}>
      {reservas.map((reserva, index) => (
        <ReservaCard
          key={reserva.id}
          reserva={reserva}
          index={index}
          onAprovar={onAprovar ? () => onAprovar(reserva.id) : undefined}
        />
      ))}
    </div>
  );
};

export default ReservaList;
