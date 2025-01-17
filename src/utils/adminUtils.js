import { supabase } from '../lib/supabaseClient';

export const fetchReservas = async () => {
  const { data, error } = await supabase
    .from('reservas')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Erro ao buscar reservas:', error);
    return [];
  }

  return data;
};

export const fetchConfiguracoes = async () => {
  const { data, error } = await supabase
    .from('configuracoes')
    .select('*')
    .single();

  if (error) {
    console.error('Erro ao buscar configurações:', error);
    return null;
  }

  return data;
};

export const salvarConfiguracoes = async (configuracoes) => {
  const { error } = await supabase
    .from('configuracoes')
    .upsert({
      id: 1,
      ...configuracoes
    });

  return error;
};

export const aprovarReserva = async (id) => {
  const { error } = await supabase
    .from('reservas')
    .update({ aprovada: true })
    .eq('id', id);

  return error;
};
