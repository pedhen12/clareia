# 🔐 Setup de Autenticação e Banco de Dados - Clareia

## Passo 1: Criar Projeto no Supabase

1. Acesse: https://supabase.com
2. Clique em "Start your project"
3. Crie uma conta (gratuita)
4. Clique em "New Project"
5. Preencha:
   - **Name:** clareia
   - **Database Password:** (crie uma senha forte)
   - **Region:** South America (São Paulo) - mais próximo do Brasil
6. Clique em "Create new project"
7. Aguarde alguns minutos até o projeto ser criado

---

## Passo 2: Executar o Schema do Banco de Dados

1. No painel do Supabase, vá em **SQL Editor** (ícone no menu lateral)
2. Clique em "+ New query"
3. Copie TODO o conteúdo do arquivo `supabase-schema.sql`
4. Cole no editor SQL
5. Clique em "Run" (ou pressione Ctrl+Enter)
6. Aguarde a mensagem "Success. No rows returned"

✅ Agora você tem todas as tabelas criadas!

---

## Passo 3: Configurar Google OAuth

### 3.1 - Obter credenciais do Supabase

1. No painel do Supabase, vá em **Settings** → **API**
2. Copie:
   - **Project URL** (exemplo: https://abcdefgh.supabase.co)
   - **anon public** key (uma chave longa)

### 3.2 - Criar aplicação no Google Cloud

1. Acesse: https://console.cloud.google.com
2. Crie um novo projeto ou selecione um existente
3. Vá em **APIs & Services** → **Credentials**
4. Clique em **+ CREATE CREDENTIALS** → **OAuth client ID**
5. Se solicitado, configure a tela de consentimento:
   - Tipo: External
   - Nome: Clareia
   - Email de suporte: seu-email@gmail.com
   - Domínio autorizado: clareia-eight.vercel.app
   - Salve e continue
6. Em **Credentials**, clique em **+ CREATE CREDENTIALS** → **OAuth client ID**
7. Tipo de aplicativo: **Web application**
8. Nome: Clareia
9. **Authorized redirect URIs** - Adicione:
   ```
   https://abcdefgh.supabase.co/auth/v1/callback
   ```
   ⚠️ Substitua `abcdefgh` pelo seu Project URL do Supabase!

10. Clique em **Create**
11. Copie o **Client ID** e **Client Secret**

### 3.3 - Configurar Google OAuth no Supabase

1. No Supabase, vá em **Authentication** → **Providers**
2. Encontre **Google** e clique em **Enable**
3. Cole:
   - **Client ID** (do Google Cloud)
   - **Client Secret** (do Google Cloud)
4. Clique em **Save**

---

## Passo 4: Configurar Variáveis de Ambiente

### 4.1 - Localmente (para desenvolvimento)

1. Crie o arquivo `.env.local` na raiz do projeto
2. Adicione:

```env
# Groq API
GROQ_API_KEY=your_groq_api_key_here

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://SEU_PROJETO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon_publica_aqui
```

3. Substitua pelos valores reais do seu projeto

### 4.2 - Na Vercel (produção)

1. Acesse: https://vercel.com/dashboard
2. Selecione o projeto **clareia**
3. Vá em **Settings** → **Environment Variables**
4. Adicione cada variável:
   - `NEXT_PUBLIC_SUPABASE_URL` = seu Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = sua chave anon
5. Clique em **Save**
6. Faça um novo deploy (ou aguarde o auto-deploy do GitHub)

---

## Passo 5: Configurar Redirect URL na Vercel

### 5.1 - Adicionar domínio de produção

1. Volte ao Google Cloud Console
2. Vá em **APIs & Services** → **Credentials**
3. Edite o OAuth client ID do Clareia
4. Em **Authorized redirect URIs**, adicione:
   ```
   https://clareia-eight.vercel.app/auth/callback
   ```
5. Salve

### 5.2 - Configurar Site URL no Supabase

1. No Supabase, vá em **Authentication** → **URL Configuration**
2. Em **Site URL**, adicione:
   ```
   https://clareia-eight.vercel.app
   ```
3. Em **Redirect URLs**, adicione:
   ```
   https://clareia-eight.vercel.app/auth/callback
   ```
4. Salve

---

## Passo 6: Testar

1. Acesse: https://clareia-eight.vercel.app
2. Clique em "Entrar com Google"
3. Selecione sua conta Google
4. Autorize o Clareia
5. Você deve ser redirecionado para a home logado!

---

## 🎉 Pronto!

Agora os dados dos usuários são:
- ✅ **Salvos no banco de dados real**
- ✅ **Sincronizados entre dispositivos**
- ✅ **Permanentes (não se perdem)**
- ✅ **Ranking global funcionando**
- ✅ **Autenticação segura com Google**

---

## 🐛 Troubleshooting

### Erro: "Invalid redirect URL"
- Verifique se adicionou o redirect URI correto no Google Cloud
- Verifique se configurou o Site URL correto no Supabase

### Erro: "OAuth provider not enabled"
- Verifique se ativou o Google provider no Supabase
- Verifique se salvou o Client ID e Secret corretamente

### Usuário não aparece no banco
- Verifique se o trigger foi criado (`handle_new_user`)
- Execute manualmente o SQL do schema novamente

### Variáveis de ambiente não funcionam
- Variáveis que começam com `NEXT_PUBLIC_` são públicas
- Após adicionar variáveis na Vercel, faça um novo deploy
- Reinicie o servidor local após alterar `.env.local`

---

## 📚 Próximos Passos (Opcional)

- [ ] Adicionar avatares de usuário
- [ ] Implementar notificações por email
- [ ] Criar sistema de conquistas mais elaborado
- [ ] Adicionar analytics de uso
- [ ] Implementar chat entre estudantes
