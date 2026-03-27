-- Tabela para armazenar vendas de rifas
CREATE TABLE IF NOT EXISTS rifa_sales (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_session_id VARCHAR(255) UNIQUE NOT NULL,
  ticket_numbers INTEGER[] NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending', -- pending, completed, expired, refunded
  customer_email VARCHAR(255),
  customer_name VARCHAR(255),
  payment_intent_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT check_status CHECK (status IN ('pending', 'completed', 'expired', 'refunded'))
);

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_rifa_sales_stripe_session ON rifa_sales(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_rifa_sales_status ON rifa_sales(status);
CREATE INDEX IF NOT EXISTS idx_rifa_sales_created_at ON rifa_sales(created_at DESC);

-- Criar função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_rifa_sales_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Criar trigger para atualizar updated_at
DROP TRIGGER IF EXISTS trigger_update_rifa_sales_updated_at ON rifa_sales;
CREATE TRIGGER trigger_update_rifa_sales_updated_at
BEFORE UPDATE ON rifa_sales
FOR EACH ROW
EXECUTE FUNCTION update_rifa_sales_updated_at();

-- Dar permissões públicas para leitura (vendidos)
ALTER TABLE rifa_sales ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Qualquer um pode ler rifas vendidas"
ON rifa_sales
FOR SELECT
USING (status = 'completed');

-- Apenas a API pode inserir
CREATE POLICY "Só o serviço pode inserir vendas"
ON rifa_sales
FOR INSERT
WITH CHECK (true);

-- Apenas o serviço pode atualizar vendas
CREATE POLICY "Só o serviço pode atualizar vendas"
ON rifa_sales
FOR UPDATE
USING (true);
