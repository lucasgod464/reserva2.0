-- Adicionar novas colunas na tabela configuracoes
ALTER TABLE configuracoes 
ADD COLUMN crianca6a10 NUMERIC(10, 2) DEFAULT 29.95,
ADD COLUMN criancaAte5 NUMERIC(10, 2) DEFAULT 0.00;

-- Adicionar novas colunas na tabela reservas
ALTER TABLE reservas 
ADD COLUMN criancas6a10 BOOLEAN[] DEFAULT ARRAY[]::BOOLEAN[],
ADD COLUMN criancasAte5 BOOLEAN[] DEFAULT ARRAY[]::BOOLEAN[];
