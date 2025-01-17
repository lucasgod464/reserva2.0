import React from 'react';

const PrecosSection = ({ 
  precoAdulto, 
  precoCrianca6a10,
  precoCriancaAte5,
  setPrecoAdulto, 
  setPrecoCrianca6a10,
  setPrecoCriancaAte5,
  InputField 
}) => {
  const styles = {
    section: {
      padding: '15px',
      backgroundColor: '#FFF8DC',
      border: '1px solid #8B4513',
      borderRadius: '5px'
    },
    sectionTitle: {
      color: '#8B4513',
      marginBottom: '15px',
      textAlign: 'center'
    }
  };

  return (
    <div style={styles.section}>
      <h3 style={styles.sectionTitle}>Preços</h3>
      <InputField
        label="Preço para Adulto:"
        type="number"
        step="0.01"
        value={precoAdulto}
        onChange={(e) => setPrecoAdulto(parseFloat(e.target.value))}
      />
      <InputField
        label="Preço para Criança (6-10 anos):"
        type="number"
        step="0.01"
        value={precoCrianca6a10}
        onChange={(e) => setPrecoCrianca6a10(parseFloat(e.target.value))}
      />
      <InputField
        label="Preço para Criança (até 5 anos):"
        type="number"
        step="0.01"
        value={precoCriancaAte5}
        onChange={(e) => setPrecoCriancaAte5(parseFloat(e.target.value))}
      />
    </div>
  );
};

export default PrecosSection;
