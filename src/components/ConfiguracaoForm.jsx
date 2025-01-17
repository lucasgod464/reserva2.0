import React, { useState } from 'react';

const ConfiguracaoForm = ({
  precoAdulto,
  precoCrianca,
  chavePix,
  tipoChavePix,
  cupons,
  novoCupom,
  tituloPopup,
  descricaoPopup,
  popupAtivo,
  fontsizepopup, // Changed to lowercase
  setPrecoAdulto,
  setPrecoCrianca,
  setChavePix,
  setTipoChavePix,
  setNovoCupom,
  setTituloPopup,
  setDescricaoPopup,
  setPopupAtivo,
  setFontSizePopup, // Function name remains the same
  salvarConfiguracoes
}) => {
  const [minimizado, setMinimizado] = useState(true);

  const handleNomeCupomChange = (e) => {
    setNovoCupom({ ...novoCupom, nome: e.target.value });
  };

  const handleDescontoCupomChange = (e) => {
    setNovoCupom({ ...novoCupom, desconto: parseFloat(e.target.value) });
  };

  const isCupomValido = novoCupom.nome && novoCupom.desconto > 0;

  const adicionarCupom = () => {
    if (novoCupom.nome && novoCupom.desconto > 0) {
      setCupons([...cupons, novoCupom]);
      setNovoCupom({ nome: '', desconto: 0 });
    }
  };

  const removerCupom = (index) => {
    const novosCupons = cupons.filter((_, i) => i !== index);
    setCupons(novosCupons);
  };

  const toggleMinimizado = () => {
    setMinimizado(!minimizado);
  };

  const styles = {
    configuracaoContainer: {
      marginBottom: '40px',
      padding: '20px',
      backgroundColor: '#F5F5DC',
      border: '2px solid #8B4513',
      borderRadius: '10px'
    },
    headerContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px'
    },
    subtitle: {
      color: '#8B4513',
      margin: 0
    },
    minimizeButton: {
      padding: '5px 10px',
      fontSize: '14px',
      backgroundColor: '#8B4513',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer'
    },
    gridContainer: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '20px',
      marginBottom: '20px'
    },
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
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '5px',
      marginBottom: '15px'
    },
    inputContainer: {
      position: 'relative',
      width: '100%'
    },
    label: {
      fontSize: '14px',
      color: '#8B4513'
    },
    input: {
      padding: '10px',
      fontSize: '16px',
      border: '1px solid #8B4513',
      borderRadius: '5px',
      backgroundColor: '#FFF8DC',
      width: '100%',
      boxSizing: 'border-box'
    },
    percentSymbol: {
      position: 'absolute',
      right: '10px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#8B4513',
      pointerEvents: 'none'
    },
    saveButtonContainer: {
      marginTop: '30px',
      textAlign: 'center'
    },
    button: {
      padding: '10px 20px',
      fontSize: '16px',
      backgroundColor: '#8B4513',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: '#A0522D'
      }
    },
    cuponsContainer: {
      marginTop: '20px',
      padding: '20px',
      border: '1px solid #8B4513',
      borderRadius: '5px',
      backgroundColor: '#FFF8DC'
    },
    novoCupomContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      marginBottom: '20px'
    },
    cupomInputGroup: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '15px'
    },
    cupomButton: {
      padding: '10px 20px',
      fontSize: '14px',
      backgroundColor: '#8B4513',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: '#A0522D'
      },
      '&:disabled': {
        backgroundColor: '#ccc',
        cursor: 'not-allowed'
      }
    },
    listaCupons: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    },
    cupomItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px',
      border: '1px solid #8B4513',
      borderRadius: '5px',
      backgroundColor: '#FFF8DC'
    },
    cupomInfo: {
      display: 'flex',
      flexDirection: 'column',
      gap: '5px'
    },
    cupomNome: {
      color: '#8B4513',
      fontWeight: 'bold'
    },
    cupomDesconto: {
      color: '#8B4513',
      fontSize: '14px'
    },
    removerCupomButton: {
      padding: '5px 10px',
      fontSize: '12px',
      backgroundColor: '#dc3545',
      color: 'white',
      border: 'none',
      borderRadius: '3px',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: '#c82333'
      }
    },
    semCupons: {
      textAlign: 'center',
      color: '#8B4513',
      fontStyle: 'italic',
      padding: '10px'
    },
    popupToggleContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '15px'
    },
    checkbox: {
      width: '20px',
      height: '20px',
      cursor: 'pointer'
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
        <div style={styles.gridContainer}>
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
              label="Preço para Criança:"
              type="number"
              step="0.01"
              value={precoCrianca}
              onChange={(e) => setPrecoCrianca(parseFloat(e.target.value))}
            />
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Configurações PIX</h3>
            <SelectField
              label="Tipo de Chave PIX:"
              value={tipoChavePix}
              onChange={(e) => setTipoChavePix(e.target.value)}
              options={[
                { value: 'cpf', label: 'CPF' },
                { value: 'cnpj', label: 'CNPJ' },
                { value: 'email', label: 'E-mail' },
                { value: 'telefone', label: 'Telefone' },
                { value: 'chaveAleatoria', label: 'Chave Aleatória' }
              ]}
            />
            <InputField
              label="Chave PIX:"
              type="text"
              value={chavePix}
              onChange={(e) => setChavePix(e.target.value)}
            />
          </div>
        </div>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Mensagem de Boas-Vindas</h3>
          <div style={styles.popupToggleContainer}>
            <label style={styles.label}>Ativar Popup:</label>
            <input
              type="checkbox"
              checked={popupAtivo}
              onChange={(e) => setPopupAtivo(e.target.checked)}
              style={styles.checkbox}
            />
          </div>
          <InputField
            label="Título do Popup:"
            type="text"
            value={tituloPopup}
            onChange={(e) => setTituloPopup(e.target.value)}
            disabled={!popupAtivo}
          />
          <InputField
            label="Descrição do Popup:"
            type="text"
            value={descricaoPopup}
            onChange={(e) => setDescricaoPopup(e.target.value)}
            textarea
            disabled={!popupAtivo}
          />
          <InputField
            label="Tamanho da Fonte (px):"
            type="number"
            min="10"
            max="30"
            value={fontsizepopup} // Changed to lowercase
            onChange={(e) => setFontSizePopup(parseInt(e.target.value, 10))}
            disabled={!popupAtivo}
          />
        </div>

        <div style={styles.cuponsContainer}>
          <h3 style={styles.sectionTitle}>Cupons de Desconto</h3>

          <div style={styles.novoCupomContainer}>
            <div style={styles.cupomInputGroup}>
              <InputField
                label="Nome do Cupom:"
                type="text"
                placeholder="Ex: DESCONTO10"
                value={novoCupom.nome}
                onChange={handleNomeCupomChange}
              />
              <InputField
                label="Desconto (%):"
                type="number"
                min="0"
                max="100"
                placeholder="0 a 100"
                value={novoCupom.desconto}
                onChange={handleDescontoCupomChange}
                withPercentSymbol
              />
            </div>

            <button
              style={styles.cupomButton}
              onClick={adicionarCupom}
              disabled={!isCupomValido}
            >
              Adicionar Cupom
            </button>
          </div>

          {cupons.length > 0 ? (
            <div style={styles.listaCupons}>
              {cupons.map((cupom, index) => (
                <CupomItem
                  key={index}
                  nome={cupom.nome}
                  desconto={cupom.desconto}
                  onRemover={() => removerCupom(index)}
                />
              ))}
            </div>
          ) : (
            <div style={styles.semCupons}>
              Nenhum cupom cadastrado. Adicione um novo cupom acima.
            </div>
          )}
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

const InputField = ({ label, type, value, onChange, placeholder, step, min, max, withPercentSymbol, textarea, disabled }) => {
  const styles = {
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '5px',
      marginBottom: '15px'
    },
    inputContainer: {
      position: 'relative',
      width: '100%'
    },
    label: {
      fontSize: '14px',
      color: '#8B4513'
    },
    input: {
      padding: '10px',
      fontSize: '16px',
      border: '1px solid #8B4513',
      borderRadius: '5px',
      backgroundColor: '#FFF8DC',
      width: '100%',
      boxSizing: 'border-box'
    },
    percentSymbol: {
      position: 'absolute',
      right: '10px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#8B4513',
      pointerEvents: 'none'
    }
  };

  return (
    <div style={styles.inputGroup}>
      <label style={styles.label}>{label}</label>
      <div style={styles.inputContainer}>
        {textarea ? (
          <textarea
            style={{ ...styles.input, height: '100px' }}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
          />
        ) : (
          <input
            style={styles.input}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            step={step}
            min={min}
            max={max}
            disabled={disabled}
          />
        )}
        {withPercentSymbol && <span style={styles.percentSymbol}>%</span>}
      </div>
    </div>
  );
};

const SelectField = ({ label, value, onChange, options }) => {
  const styles = {
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '5px',
      marginBottom: '15px'
    },
    label: {
      fontSize: '14px',
      color: '#8B4513'
    },
    input: {
      padding: '10px',
      fontSize: '16px',
      border: '1px solid #8B4513',
      borderRadius: '5px',
      backgroundColor: '#FFF8DC',
      width: '100%',
      boxSizing: 'border-box'
    }
  };

  return (
    <div style={styles.inputGroup}>
      <label style={styles.label}>{label}</label>
      <select style={styles.input} value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

const CupomItem = ({ nome, desconto, onRemover }) => {
  const styles = {
    cupomItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px',
      border: '1px solid #8B4513',
      borderRadius: '5px',
      backgroundColor: '#FFF8DC'
    },
    cupomInfo: {
      display: 'flex',
      flexDirection: 'column',
      gap: '5px'
    },
    cupomNome: {
      color: '#8B4513',
      fontWeight: 'bold'
    },
    cupomDesconto: {
      color: '#8B4513',
      fontSize: '14px'
    },
    removerCupomButton: {
      padding: '5px 10px',
      fontSize: '12px',
      backgroundColor: '#dc3545',
      color: 'white',
      border: 'none',
      borderRadius: '3px',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: '#c82333'
      }
    }
  };

  return (
    <div style={styles.cupomItem}>
      <div style={styles.cupomInfo}>
        <div style={styles.cupomNome}>{nome}</div>
        <div style={styles.cupomDesconto}>{desconto}% de desconto</div>
      </div>
      <button style={styles.removerCupomButton} onClick={onRemover}>
        Remover
      </button>
    </div>
  );
};

export default ConfiguracaoForm;
