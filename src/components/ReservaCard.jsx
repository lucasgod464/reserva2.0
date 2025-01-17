import React from 'react';

const ReservaCard = ({ reserva, index, onAprovar }) => {
  const calcularTotais = (criancas6a10, criancasAte5) => {
    // Verificações de segurança
    if (!criancas6a10 || !criancasAte5) {
      return { 
        totalAdultos: reserva?.nomes?.length || 0, 
        totalCriancas6a10: 0, 
        totalCriancasAte5: 0 
      };
    }

    // Garantir que os arrays tenham o mesmo comprimento
    const maxLength = Math.max(criancas6a10.length, criancasAte5.length, reserva.nomes.length);
    
    // Preencher arrays com false se necessário
    const criancas6a10Padded = Array(maxLength).fill(false).map((_, i) => criancas6a10[i] || false);
    const criancasAte5Padded = Array(maxLength).fill(false).map((_, i) => criancasAte5[i] || false);

    const totalAdultos = reserva.nomes.filter((_, i) => 
      !criancas6a10Padded[i] && !criancasAte5Padded[i]
    ).length;

    const totalCriancas6a10 = criancas6a10Padded.filter(crianca => crianca).length;
    const totalCriancasAte5 = criancasAte5Padded.filter(crianca => crianca).length;

    return { totalAdultos, totalCriancas6a10, totalCriancasAte5 };
  };

  // Verificação de segurança para reserva
  if (!reserva || !reserva.nomes) {
    return null;
  }

  const { totalAdultos, totalCriancas6a10, totalCriancasAte5 } = calcularTotais(
    reserva.criancas6a10 || [],
    reserva.criancasAte5 || []
  );

  const comprovanteUrl = reserva?.comprovante
    ? `https://vpteneqwgfifezlnzxtu.supabase.co/storage/v1/object/public/comprovantes/${reserva.comprovante}`
    : '';

  const handleVerComprovante = () => {
    if (comprovanteUrl) {
      window.open(comprovanteUrl, '_blank');
    }
  };

  return (
    <div style={styles.reservaCard}>
      <div style={styles.header}>
        <h3 style={styles.reservaTitle}>Reserva #{index + 1}</h3>
        <div style={styles.statusBadge}>
          {reserva.aprovada ? (
            <span style={styles.aprovada}>Aprovada</span>
          ) : (
            <span style={styles.pendente}>Pendente</span>
          )}
        </div>
      </div>

      <div style={styles.reservaInfo}>
        <div style={styles.gridContainer}>
          <div style={styles.gridItem}>
            <strong>ID:</strong> {reserva.id}
          </div>
          <div style={styles.gridItem}>
            <strong>Telefone:</strong> {reserva.telefone}
          </div>
          <div style={styles.gridItem}>
            <strong>Cupom:</strong> {reserva.cupom || 'Nenhum'}
          </div>
          <div style={styles.gridItem}>
            <strong>Desconto:</strong> {reserva.desconto || 0}%
          </div>
        </div>

        <div style={styles.totaisContainer}>
          <div style={styles.totalBox}>
            <strong>Adultos:</strong> {totalAdultos}
          </div>
          <div style={styles.totalBox}>
            <strong>Crianças (6-10):</strong> {totalCriancas6a10}
          </div>
          <div style={styles.totalBox}>
            <strong>Crianças (até 5):</strong> {totalCriancasAte5}
          </div>
          <div style={styles.totalBox}>
            <strong>Total:</strong> R$ {reserva.valor_total}
          </div>
        </div>

        <div style={styles.nomesContainer}>
          <strong>Nomes:</strong>
          <ul style={styles.listaNomes}>
            {reserva.nomes.map((nome, i) => (
              <li key={i} style={styles.nomeItem}>
                {nome} {
                  (reserva.criancas6a10 && reserva.criancas6a10[i]) ? '(Criança 6-10)' : 
                  (reserva.criancasAte5 && reserva.criancasAte5[i]) ? '(Criança até 5)' : ''
                }
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div style={styles.buttonsContainer}>
        {reserva.comprovante && (
          <button 
            style={styles.comprovanteButton}
            onClick={handleVerComprovante}
          >
            Ver Comprovante
          </button>
        )}
        {!reserva.aprovada && onAprovar && (
          <button 
            style={styles.aprovarButton}
            onClick={onAprovar}
          >
            Aprovar Reserva
          </button>
        )}
      </div>
    </div>
  );
};

const styles = {
  // ... (estilos permanecem os mesmos)
  nomeItem: {
    marginBottom: '3px',
  },
};

export default ReservaCard;
