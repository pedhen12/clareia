# 🚀 Como Ativar Autenticação com Google

## ⚠️ Status Atual

**A autenticação está IMPLEMENTADA mas DESATIVADA até você configurar o Supabase.**

Atualmente a plataforma funciona com dados locais (localStorage). Para ativar autenticação real e banco de dados:

## 📋 Checklist Rápido

- [ ] Criar conta no Supabase (gratuito)
- [ ] Executar o schema SQL (`supabase-schema.sql`)
- [ ] Configurar Google OAuth no Google Cloud
- [ ] Adicionar credenciais no Supabase
- [ ] Adicionar variáveis de ambiente
- [ ] Testar login

**Tempo estimado:** 15-20 minutos

---

## 🎯 Benefícios da Autenticação

### Sem Autenticação (Atual)
- ❌ Dados perdidos ao limpar cache
- ❌ Não sincroniza entre dispositivos
- ❌ Ranking local (não global)
- ❌ Sem backup

### Com Autenticação
- ✅ **Dados permanentes** no banco de dados
- ✅ **Sincronização** entre dispositivos
- ✅ **Ranking global** real
- ✅ **Backup automático**
- ✅ **Login seguro** com Google
- ✅ **Histórico completo** de estudos

---

## 🔧 Guia Completo

Siga o arquivo: **[SETUP_AUTH.md](./SETUP_AUTH.md)**

---

## 🚀 Deploy com Autenticação

Após configurar:

1. **Adicione no `.env.local`:**
```bash
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_aqui
```

2. **Adicione na Vercel:**
- Vá em Settings → Environment Variables
- Adicione as mesmas variáveis
- Faça um novo deploy

3. **Teste:**
- Acesse o site
- Clique em "Entrar com Google"
- Login deve funcionar!

---

## 💡 Modo Híbrido (Recomendado)

A plataforma está configurada para funcionar em **modo híbrido**:

- **Sem login:** Usa localStorage (dados temporários)
- **Com login:** Usa Supabase (dados permanentes)

Isso permite que usuários testem antes de criar conta!

---

## 🆘 Precisa de Ajuda?

1. Leia o **SETUP_AUTH.md** completo
2. Verifique o troubleshooting
3. Abra uma issue no GitHub

---

## 📊 Arquitetura

```
┌─────────────┐
│   Usuário   │
└──────┬──────┘
       │
       ↓ Login com Google
┌──────────────────┐
│  Supabase Auth   │
└──────┬───────────┘
       │
       ↓ Cria/autentica
┌──────────────────┐
│  Banco de Dados  │
│  ┌────────────┐  │
│  │  profiles  │  │
│  │  lessons   │  │
│  │  quizzes   │  │
│  │  streak    │  │
│  └────────────┘  │
└──────────────────┘
```

---

## ✨ Começar Agora

```bash
# 1. Instale dependências (já feito)
npm install

# 2. Configure Supabase seguindo SETUP_AUTH.md

# 3. Adicione variáveis de ambiente

# 4. Rode localmente
npm run dev

# 5. Acesse http://localhost:3000
```

**Pronto! A autenticação está pronta para uso.** 🎉
