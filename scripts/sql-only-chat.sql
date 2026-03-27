-- ============================
-- APENAS TABELA DO CHAT
-- ============================
-- Execute este SQL se você já tem outras tabelas configuradas

-- Criar tabela de mensagens do chat
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_name TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  likes INTEGER DEFAULT 0
);

-- Criar índice para performance
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at
ON chat_messages(created_at DESC);

-- Habilitar Row Level Security
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Remover policies antigas se existirem (evita erro de duplicata)
DROP POLICY IF EXISTS "Anyone can read messages" ON chat_messages;
DROP POLICY IF EXISTS "Authenticated users can insert messages" ON chat_messages;
DROP POLICY IF EXISTS "Users can delete their own messages" ON chat_messages;

-- Criar policies de segurança
CREATE POLICY "Anyone can read messages"
ON chat_messages FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can insert messages"
ON chat_messages FOR INSERT
WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'anon');

CREATE POLICY "Users can delete their own messages"
ON chat_messages FOR DELETE
USING (auth.uid() = user_id);

-- ============================
-- DEPOIS DE EXECUTAR:
-- 1. Vá em Database → Replication
-- 2. Ative "chat_messages"
-- 3. Teste em /chat
-- ============================
