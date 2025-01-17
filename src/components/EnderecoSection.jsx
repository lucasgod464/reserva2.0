import React from 'react';
import { reservaStyles } from '../styles/reservaStyles';

const EnderecoSection = ({ endereco, onCopyAddress, onOpenMaps }) => {
  return (
    <div style={reservaStyles.addressContainer}>
      <h3 style={reservaStyles.addressTitle}>Local do Rodízio</h3>
      <p style={reservaStyles.addressText}>Endereço: {endereco}</p>
      <div style={reservaStyles.addressButtons}>
        <button style={reservaStyles.addressButton} onClick={onOpenMaps}>
          Abrir no Google Maps
        </button>
        <button style={reservaStyles.addressButton} onClick={onCopyAddress}>
          Copiar Endereço
        </button>
      </div>
    </div>
  );
};

export default EnderecoSection;
