import React from 'react';
import { InputField } from './FormFields';

const PrecosSection = ({ 
  precoAdulto, 
  precoCrianca6a10,
  precoCriancaAte5,
  setPrecoAdulto, 
  setPrecoCrianca6a10,
  setPrecoCriancaAte5
}) => {
  const styles = {
    section: {
      padding: '20px',
      backgroundColor: '#F5F5DC',
      border: '1px solid #8B4513',
      borderRadius: '10px',
      marginBottom: '20px'
    },
    sectionTitle: {
      color: '#8B4513',
      marginBottom: '20px',
      textAlign: 'center',
      fontSize: '20px',
      fontWeight: 'bold'
    },
    priceGrid: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px'
    },
    priceItem: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    },
    priceLabel: {
      fontSize: '16px',
      color: '#8B4513',
      fontWeight: 'bold'
    }
  };

  return (
    <div style={styles.section}>
      <h3 style={styles.sectionTitle}>Configuração de Preços</h3>
      <div style={styles.priceGrid}>
        <div style={styles.priceItem}>
          <div style={styles.priceLabel}>Adulto:</div>
          <InputField
            label="Valor:"
            type="number"
            step="0.01"
            value={precoAdulto}
            onChange={(e) => setPrecoAdulto(parseFloat(e.target.value))}
          />
        </div>
        <div style={styles.priceItem}>
          <div style={styles.priceLabel}>Criança (6-10 anos):</div>
          <InputField
            label="Valor:"
            type="number"
            step="0.01"
            value={precoCrianca6a10}
            onChange={(e) => setPrecoCrianca6a10(parseFloat(e.target.value))}
          />
        </div>
        <div style={styles.priceItem}>
          <div style={styles.priceLabel}>Criança (até 5 anos):</div>
          <InputField
            label="Valor:"
            type="number"
            step="0.01"
            value={precoCriancaAte5}
            onChange={(e) => setPrecoCriancaAte5(parseFloat(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
};

export default PrecosSection;
