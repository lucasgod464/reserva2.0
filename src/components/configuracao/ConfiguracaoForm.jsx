import React, { useState } from 'react';
import PrecosSection from './PrecosSection';
import PixSection from './PixSection';
import MensagemBoasVindasSection from './MensagemBoasVindasSection';
import CuponsSection from './CuponsSection';

const ConfiguracaoForm = ({
  precoAdulto,
  precoCrianca6a10,
  precoCriancaAte5,
  chavePix,
  tipoChavePix,
  cupons,
  novoCupom,
  tituloPopup,
  descricaoPopup,
  popupAtivo,
  fontsizepopup,
  setPrecoAdulto,
  setPrecoCrianca6a10,
  setPrecoCriancaAte5,
  setChavePix,
  setTipoChavePix,
  setNovoCupom,
  setTituloPopup,
  setDescricaoPopup,
  setPopupAtivo,
  setFontSizePopup,
  salvarConfiguracoes
}) => {
  const [minimizado, setMinimizado] = useState(false); // Expandido por padrão

  const toggleMinimizado = () => {
    setMinimizado(!minimizado);
  };

  const styles = {
    configuracaoContainer: {
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#FFF8DC',
      border: '2px solid #8B4513',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    },
    headerContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px'
    },
    subtitle: {
      color: '#8B4513',
      margin: 0,
      fontSize: '24px',
      fontWeight: 'bold'
    },
    minimizeButton: {
      padding: '8px 16px',
      fontSize: '14px',
      backgroundColor: '#8B4513',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: '#A0522D'
      }
    },
    sectionsContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    },
    saveButtonContainer: {
      marginTop: '30px',
      textAlign: 'center'
    },
    button: {
      padding: '12px 24px',
      fontSize: '16px',
      backgroundColor: '#8B4513',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: '#A0522D'
      }
    }
  };

  return (
    <div style={styles.configuracaoContainer}>
      <div style={styles.headerContainer}>
        <h2 style={styles.subtitle}>Configurações</h2>
        <button onClick={toggleMinimizado} style={styles.minimizeButton}>
          {minimizado ? 'Expandir' : 'Minimizar'}
        </button>
      </div>
      <div style={{ display: minimizado ? 'none' : 'block' }}>
        <div style={styles.sectionsContainer}>
          <PrecosSection
            precoAdulto={precoAdulto}
            precoCrianca6a10={precoCrianca6a10}
            precoCriancaAte5={precoCriancaAte5}
            setPrecoAdulto={setPrecoAdulto}
            setPrecoCrianca6a10={setPrecoCrianca6a10}
            setPrecoCriancaAte5={setPrecoCriancaAte5}
          />
          <PixSection
            chavePix={chavePix}
            tipoChavePix={tipoChavePix}
            setChavePix={setChavePix}
            setTipoChavePix={setTipoChavePix}
          />
          <MensagemBoasVindasSection
            tituloPopup={tituloPopup}
            descricaoPopup={descricaoPopup}
            popupAtivo={popupAtivo}
            fontsizepopup={fontsizepopup}
            setTituloPopup={setTituloPopup}
            setDescricaoPopup={setDescricaoPopup}
            setPopupAtivo={setPopupAtivo}
            setFontSizePopup={setFontSizePopup}
          />
          <CuponsSection
            cupons={cupons}
            novoCupom={novoCupom}
            setCupons={setCupons}
            setNovoCupom={setNovoCupom}
          />
        </div>
        <div style={styles.saveButtonContainer}>
          <button style={styles.button} onClick={salvarConfiguracoes}>
            Salvar Configurações
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfiguracaoForm;
