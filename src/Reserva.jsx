import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabaseClient';
import ReservaForm from './components/ReservaForm';
import PagamentoSection from './components/PagamentoSection';
import PixPopup from './components/PixPopup';
import Notification from './components/Notification';
import WelcomePopup from './components/WelcomePopup';
import EnderecoSection from './components/EnderecoSection';
import { reservaStyles } from './styles/reservaStyles';
import { 
  calcularValorTotal, 
  validarReserva, 
  prepararDadosReserva 
} from './utils/reservaUtils';

const Reserva = () => {
  const [pessoas, setPessoas] = useState(1);
  const [nomes, setNomes] = useState(['']);
  const [criancas, setCriancas] = useState([false]);
  const [criancas6a10, setCriancas6a10] = useState([false]);
  const [criancasAte5, setCriancasAte5] = useState([false]);
  const [telefone, setTelefone] = useState('');
  const [comprovante, setComprovante] = useState(null);
  const [mostrarAviso, setMostrarAviso] = useState(false);
  const [mostrarPopupPix, setMostrarPopupPix] = useState(false);
  const [precos, setPrecos] = useState({ 
    adulto: 69.90, 
    crianca: 34.95, 
    crianca6a10: 29.95, 
    criancaAte5: 0 
  });
  const [cupom, setCupom] = useState('');
  const [descontoAplicado, setDescontoAplicado] = useState(0);
  const [chavepix, setChavepix] = useState('');
  const [tipo_chavepix, setTipoChavepix] = useState('cpf');
  const [cuponsDisponiveis, setCuponsDisponiveis] = useState([]);
  const [notification, setNotification] = useState(null);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const [popupAtivo, setPopupAtivo] = useState(true);
  const [tituloPopup, setTituloPopup] = useState('');
  const [descricaoPopup, setDescricaoPopup] = useState('');
  const endereco = 'Rua Juiz David Barrilli, 376 - Jardim Aquarius, São José dos Campos - SP, 12246-200';

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  useEffect(() => {
    fetchConfiguracoes();
  }, []);

  const fetchConfiguracoes = async () => {
    const { data, error } = await supabase
      .from('configuracoes')
      .select('*')
      .single();

    if (!error) {
      setPrecos({ 
        adulto: data.adulto, 
        crianca: data.crianca,
        crianca6a10: data.crianca6a10,
        criancaAte5: data.criancaAte5
      });
      setChavepix(data.chave_pix);
      setTipoChavepix(data.tipo_chave_pix || 'cpf');
      setCuponsDisponiveis(data.cupons || []);
      setTituloPopup(data.titulo_popup || 'Bem-vindo ao Rodízio!');
      setDescricaoPopup(data.descricao_popup || 'Estamos felizes em tê-lo conosco. Aproveite nossa seleção de carnes e acompanhamentos.');
      setPopupAtivo(data.popup_ativo);
      setShowWelcomePopup(data.popup_ativo);
    }
  };

  const handlePessoasChange = (e) => {
    const numPessoas = parseInt(e.target.value, 10);
    setPessoas(numPessoas);
    setNomes(Array(numPessoas).fill(''));
    setCriancas(Array(numPessoas).fill(false));
    setCriancas6a10(Array(numPessoas).fill(false));
    setCriancasAte5(Array(numPessoas).fill(false));
  };

  const handleNomeChange = (index, value) => {
    const novosNomes = [...nomes];
    novosNomes[index] = value;
    setNomes(novosNomes);
  };

  const handleCriancaChange = (index, isCrianca) => {
    const novasCriancas = [...criancas];
    novasCriancas[index] = isCrianca;
    setCriancas(novasCriancas);
    if (isCrianca) {
      setCriancas6a10(prev => {
        const novo = [...prev];
        novo[index] = false;
        return novo;
      });
      setCriancasAte5(prev => {
        const novo = [...prev];
        novo[index] = false;
        return novo;
      });
    }
  };

  const handleCrianca6a10Change = (index, isCrianca6a10) => {
    const novasCriancas6a10 = [...criancas6a10];
    novasCriancas6a10[index] = isCrianca6a10;
    setCriancas6a10(novasCriancas6a10);
    if (isCrianca6a10) {
      setCriancas(prev => {
        const novo = [...prev];
        novo[index] = false;
        return novo;
      });
      setCriancasAte5(prev => {
        const novo = [...prev];
        novo[index] = false;
        return novo;
      });
    }
  };

  const handleCriancaAte5Change = (index, isCriancaAte5) => {
    const novasCriancasAte5 = [...criancasAte5];
    novasCriancasAte5[index] = isCriancaAte5;
    setCriancasAte5(novasCriancasAte5);
    if (isCriancaAte5) {
      setCriancas(prev => {
        const novo = [...prev];
        novo[index] = false;
        return novo;
      });
      setCriancas6a10(prev => {
        const novo = [...prev];
        novo[index] = false;
        return novo;
      });
    }
  };

  const handleTelefoneChange = (e) => {
    setTelefone(e.target.value);
  };

  const handleComprovanteChange = (e) => {
    setComprovante(e.target.files[0]);
  };

  const handleCupomChange = (e) => {
    setCupom(e.target.value);
  };

  const aplicarCupom = () => {
    const cupomValido = cuponsDisponiveis.find(c => c.nome === cupom);
    if (cupomValido) {
      setDescontoAplicado(cupomValido.desconto);
      showNotification('Cupom aplicado com sucesso!', 'success');
    } else {
      setDescontoAplicado(0);
      showNotification('Cupom inválido', 'error');
    }
  };

  const valorTotal = calcularValorTotal(
    nomes, 
    criancas, 
    criancas6a10, 
    criancasAte5, 
    precos, 
    descontoAplicado
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validacao = validarReserva(nomes, telefone, comprovante);
    if (!validacao.valido) {
      showNotification(validacao.mensagem, 'error');
      return;
    }

    try {
      let comprovanteNome = null;

      if (comprovante) {
        const extensao = comprovante.name.split('.').pop();
        comprovanteNome = `comprovante_${Date.now()}.${extensao}`;

        const { error: uploadError } = await supabase
          .storage
          .from('comprovantes')
          .upload(comprovanteNome, comprovante);

        if (uploadError) throw uploadError;
      }

      const dadosReserva = prepararDadosReserva(
        nomes, 
        criancas, 
        criancas6a10, 
        criancasAte5, 
        telefone, 
        pessoas, 
        comprovanteNome, 
        valorTotal, 
        chavepix, 
        tipo_chavepix, 
        cupom, 
        descontoAplicado
      );

      const { data, error } = await supabase
        .from('reservas')
        .insert([dadosReserva])
        .select();

      if (error) throw error;

      showNotification('Reserva realizada com sucesso!', 'success');
      resetForm();
    } catch (error) {
      showNotification('Erro ao salvar a reserva', 'error');
    }
  };

  const resetForm = () => {
    setPessoas(1);
    setNomes(['']);
    setCriancas([false]);
    setCriancas6a10([false]);
    setCriancasAte5([false]);
    setTelefone('');
    setComprovante(null);
    setCupom('');
    setDescontoAplicado(0);
  };

  const handleClickPix = () => {
    setMostrarPopupPix(true);
    navigator.clipboard.writeText(chavepix);
    setMostrarAviso(true);
    setTimeout(() => setMostrarAviso(false), 2000);
  };

  const fecharPopupPix = () => {
    setMostrarPopupPix(false);
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(endereco)
      .then(() => showNotification('Endereço copiado para a área de transferência!', 'success'))
      .catch(err => showNotification('Erro ao copiar endereço: ' + err, 'error'));
  };

  const handleOpenMaps = () => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(endereco)}`, '_blank');
  };

  return (
    <div style={reservaStyles.container}>
      {notification && <Notification message={notification.message} type={notification.type} />}
      {showWelcomePopup && popupAtivo && (
        <WelcomePopup
          onClose={() => setShowWelcomePopup(false)}
          titulo={tituloPopup}
          descricao={descricaoPopup}
        />
      )}

      <h1 style={reservaStyles.title}>Fazer Reserva</h1>

      <ReservaForm
        pessoas={pessoas}
        nomes={nomes}
        criancas={criancas}
        criancas6a10={criancas6a10}
        criancasAte5={criancasAte5}
        telefone={telefone}
        cupom={cupom}
        precos={precos}
        handlePessoasChange={handlePessoasChange}
        handleNomeChange={handleNomeChange}
        handleCriancaChange={handleCriancaChange}
        handleCrianca6a10Change={handleCrianca6a10Change}
        handleCriancaAte5Change={handleCriancaAte5Change}
        handleTelefoneChange={handleTelefoneChange}
        handleCupomChange={handleCupomChange}
        aplicarCupom={aplicarCupom}
      />

      <EnderecoSection 
        endereco={endereco} 
        onCopyAddress={handleCopyAddress} 
        onOpenMaps={handleOpenMaps} 
      />

      <PagamentoSection
        chavepix={chavepix}
        tipo_chavepix={tipo_chavepix}
        valorTotal={valorTotal}
        handleClickPix={handleClickPix}
        mostrarAviso={mostrarAviso}
        handleComprovanteChange={handleComprovanteChange}
      />

      <button 
        type="submit" 
        style={reservaStyles.button} 
        onClick={handleSubmit}
      >
        Finalizar Reserva
      </button>

      {mostrarPopupPix && (
        <PixPopup
          valorTotal={valorTotal}
          fecharPopupPix={fecharPopupPix}
        />
      )}
    </div>
  );
};

export default Reserva;
