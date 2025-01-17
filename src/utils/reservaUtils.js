export const calcularValorTotal = (nomes, criancas, criancas6a10, criancasAte5, precos, descontoAplicado) => {
  const total = nomes.reduce((total, _, index) => {
    if (criancas[index]) return total + precos.crianca;
    if (criancas6a10[index]) return total + precos.crianca6a10;
    if (criancasAte5[index]) return total + precos.criancaAte5;
    return total + precos.adulto;
  }, 0);

  return (total * (1 - descontoAplicado/100)).toFixed(2);
};

export const validarReserva = (nomes, telefone, comprovante) => {
  const nomesPreenchidos = nomes.every(nome => nome.trim() !== '');
  
  if (!nomesPreenchidos) {
    return { valido: false, mensagem: 'Preencha todos os nomes' };
  }

  if (!telefone.trim()) {
    return { valido: false, mensagem: 'Informe um número de telefone' };
  }

  if (!comprovante) {
    return { valido: false, mensagem: 'Envie o comprovante de pagamento' };
  }

  return { valido: true };
};

export const prepararDadosReserva = (
  nomes, 
  criancas, 
  criancas6a10, 
  criancasAte5, 
  telefone, 
  pessoas, 
  comprovante, 
  valorTotal, 
  chavepix, 
  tipo_chavepix, 
  cupom, 
  descontoAplicado
) => {
  return {
    nomes: nomes.filter((nome, index) => nome.trim() !== ''),
    criancas: criancas.filter((_, index) => nomes[index].trim() !== ''),
    criancas6a10: criancas6a10.filter((_, index) => nomes[index].trim() !== ''),
    criancasAte5: criancasAte5.filter((_, index) => nomes[index].trim() !== ''),
    telefone,
    pessoas,
    comprovante,
    valor_total: valorTotal,
    chavepix,
    tipo_chavepix,
    cupom: cupom || null,
    desconto: descontoAplicado
  };
};
