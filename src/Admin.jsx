import React, { useState, useEffect } from 'react';
import ConfiguracaoForm from './components/ConfiguracaoForm';
import AdminTabs from './components/AdminTabs';
import ReservaList from './components/ReservaList';
import Notification from './components/Notification';
import { adminStyles } from './styles/adminStyles';
import { fetchReservas, fetchConfiguracoes, salvarConfiguracoes, aprovarReserva } from './utils/adminUtils';

const Admin = ({ setFontSizePopup }) => {
  const [reservas, setReservas] = useState([]);
  const [precoAdulto, setPrecoAdulto] = useState(69.90);
  const [precoCrianca6a10, setPrecoCrianca6a10] = useState(34.95);
  const [precoCriancaAte5, setPrecoCriancaAte5] = useState(0);
  const [chavePix, setChavePix] = useState('');
  const [tipoChavePix, setTipoChavePix] = useState('cpf');
  const [cupons, setCupons] = useState([]);
  const [novoCupom, setNovoCupom] = useState({ nome: '', desconto: 0 });
  const [abaAtiva, setAbaAtiva] = useState('pendentes');
  const [notification, setNotification] = useState(null);
  const [tituloPopup, setTituloPopup] = useState('Bem-vindo ao Rodízio!');
  const [descricaoPopup, setDescricaoPopup] = useState('Estamos felizes em tê-lo conosco. Aproveite nossa seleção de carnes e acompanhamentos.');
  const [popupAtivo, setPopupAtivo] = useState(true);
  const [fontsizepopup, setFontSizePopupState] = useState(16);

  useEffect(() => {
    const loadData = async () => {
      const reservasData = await fetchReservas();
      setReservas(reservasData);

      const configuracoesData = await fetchConfiguracoes();
      if (configuracoesData) {
        setPrecoAdulto(configuracoesData.adulto);
        setPrecoCrianca6a10(configuracoesData.crianca6a10);
        setPrecoCriancaAte5(configuracoesData.criancaAte5);
        setChavePix(configuracoesData.chave_pix);
        setTipoChavePix(configuracoesData.tipo_chave_pix || 'cpf');
        setCupons(configuracoesData.cupons || []);
        setTituloPopup(configuracoesData.titulo_popup || 'Bem-vindo ao Rodízio!');
        setDescricaoPopup(configuracoesData.descricao_popup || 'Estamos felizes em tê-lo conosco. Aproveite nossa seleção de carnes e acompanhamentos.');
        setPopupAtivo(configuracoesData.popup_ativo !== undefined ? configuracoesData.popup_ativo : true);
        setFontSizePopupState(configuracoesData.fontsizepopup || 16);
      }
    };

    loadData();
  }, []);

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSalvarConfiguracoes = async () => {
    const configuracoes = {
      adulto: precoAdulto,
      crianca6a10: precoCrianca6a10,
      criancaAte5: precoCriancaAte5,
      chave_pix: chavePix,
      tipo_chave_pix: tipoChavePix,
      cupons: cupons,
      titulo_popup: tituloPopup,
      descricao_popup: descricaoPopup,
      popup_ativo: popupAtivo,
      fontsizepopup: fontsizepopup
    };

    const error = await salvarConfiguracoes(configuracoes);

    if (!error) {
      showNotification('Configurações atualizadas com sucesso!', 'success');
    } else {
      showNotification('Erro ao atualizar configurações: ' + error.message, 'error');
    }
  };

  const handleAprovarReserva = async (id) => {
    const error = await aprovarReserva(id);

    if (!error) {
      const reservasAtualizadas = await fetchReservas();
      setReservas(reservasAtualizadas);
      showNotification('Reserva aprovada com sucesso!', 'success');
    } else {
      showNotification('Erro ao aprovar reserva: ' + error.message, 'error');
    }
  };

  const reservasPendentes = reservas.filter((reserva) => !reserva.aprovada);
  const reservasAprovadas = reservas.filter((reserva) => reserva.aprovada);

  return (
    <div style={adminStyles.container}>
      {notification && <Notification message={notification.message} type={notification.type} />}
      <h1 style={adminStyles.title}>Painel de Administração</h1>

      <ConfiguracaoForm
        precoAdulto={precoAdulto}
        precoCrianca6a10={precoCrianca6a10}
        precoCriancaAte5={precoCriancaAte5}
        chavePix={chavePix}
        tipoChavePix={tipoChavePix}
        cupons={cupons}
        novoCupom={novoCupom}
        tituloPopup={tituloPopup}
        descricaoPopup={descricaoPopup}
        popupAtivo={popupAtivo}
        fontsizepopup={fontsizepopup}
        setPrecoAdulto={setPrecoAdulto}
        setPrecoCrianca6a10={setPrecoCrianca6a10}
        setPrecoCriancaAte5={setPrecoCriancaAte5}
        setChavePix={setChavePix}
        setTipoChavePix={setTipoChavePix}
        setNovoCupom={setNovoCupom}
        setTituloPopup={setTituloPopup}
        setDescricaoPopup={setDescricaoPopup}
        setPopupAtivo={setPopupAtivo}
        setFontSizePopup={setFontSizePopupState}
        salvarConfiguracoes={handleSalvarConfiguracoes}
      />

      <AdminTabs abaAtiva={abaAtiva} setAbaAtiva={setAbaAtiva} />

      {abaAtiva === 'pendentes' ? (
        <ReservaList reservas={reservasPendentes} onAprovar={handleAprovarReserva} />
      ) : (
        <ReservaList reservas={reservasAprovadas} />
      )}
    </div>
  );
};

export default Admin;
