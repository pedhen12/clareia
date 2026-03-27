# 🛠️ Scripts de Configuração

Scripts auxiliares para configurar o Clareia.

---

## 🚀 Quick Start

```bash
# Configurar banco de dados do chat
npm run setup:chat

# Verificar se está tudo OK
npm run check:chat
```

---

## 📝 Scripts Disponíveis

### 1️⃣ Setup Chat Database

```bash
npm run setup:chat
```

**O que faz:**
- Verifica se a tabela `chat_messages` existe
- Se não existir, mostra o SQL para você executar manualmente
- Guia você passo a passo

### 2️⃣ Check Chat Database  

```bash
npm run check:chat
```

**O que faz:**
- ✅ Verifica se tabela existe
- ✅ Testa leitura de mensagens
- ✅ Testa inserção de mensagens
- ✅ Testa deleção de mensagens
- ✅ Mostra últimas mensagens
- ✅ Conta total de mensagens

---

## 🔧 Troubleshooting

### Erro: "Variáveis de ambiente não encontradas"

Certifique-se de que `.env.local` existe com:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key
```

### Chat não atualiza em tempo real

1. Acesse: https://supabase.com/dashboard
2. Database → Replication
3. Ative `chat_messages`

---

## 📖 Mais Informações

Leia: `CHAT_README.md` para documentação completa do chat.

---

Feito com 💜 por Clareia
