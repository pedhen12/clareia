# 🔐 Alerta de Segurança - GROQ API KEY

## ⚠️ AÇÃO NECESSÁRIA IMEDIATAMENTE

A chave `GROQ_API_KEY` foi **acidentalmente exposta** no histórico do Git.

### O que aconteceu?

Durante o processo de correção do deploy, a chave API foi incluída em um arquivo de documentação (`VERCEL_FIX.md`) que foi commitado no Git. Embora o arquivo tenha sido corrigido imediatamente, o histórico do Git ainda contém a chave antiga.

### Commit afetado:
- **Commit ID:** `3e62990` (e outros)
- **Arquivo:** `VERCEL_FIX.md` e histórico do Git
- **Status:** Chave foi removida dos arquivos, mas ainda está no histórico do Git

### 🚨 O que fazer AGORA:

#### 1. Rotacionar a Chave API no Groq

1. Acesse: https://console.groq.com/keys
2. Faça login na sua conta
3. **Revogue a chave antiga** que começava com `gsk_`
4. Gere uma **nova chave API**
5. Copie a nova chave

#### 2. Atualizar na Vercel

1. Acesse: https://vercel.com/seu-projeto/settings/environment-variables
2. Encontre a variável `GROQ_API_KEY`
3. Clique em "Edit"
4. Cole a **nova chave**
5. Salve as alterações
6. Faça um redeploy:
   ```bash
   cd ~/clareia
   npx vercel --prod
   ```

#### 3. Atualizar Localmente

Atualize o arquivo `.env.local`:

```bash
# Em ~/.clareia/.env.local
GROQ_API_KEY=sua_nova_chave_aqui
```

**IMPORTANTE:** Nunca commite arquivos `.env` ou `.env.local` no Git!

---

## 📊 Impacto

### Severidade: 🔴 ALTA

**Riscos:**
- ✅ Chave pode ser usada por terceiros para fazer chamadas à API Groq
- ✅ Pode gerar custos na sua conta
- ✅ Atingir limites de taxa (rate limits)
- ❌ Não há risco aos dados dos usuários (Supabase usa chaves diferentes)
- ❌ Não há risco ao código fonte (já é público)

**Mitigação atual:**
- Chave foi removida do arquivo ativo
- GitHub Secret Scanning detectou e alertou
- Acesso ao Git é controlado (apenas você tem push access)

---

## ✅ Prevenção Futura

### 1. Adicione ao `.gitignore`

Certifique-se que estes arquivos estão no `.gitignore`:

```
# Environment variables
.env
.env.local
.env.*.local

# Temporary docs with sensitive data
*_FIX.md
*_TEMP.md
```

### 2. Use Placeholders em Documentação

Sempre use placeholders ao invés de valores reais:

```bash
# ❌ ERRADO - Nunca exponha chaves reais
GROQ_API_KEY=gsk_sua_chave_real_aqui

# ✅ CORRETO - Use placeholders em documentação
GROQ_API_KEY=sua_chave_groq_aqui
```

### 3. Configure GitHub Secret Scanning

Já está ativo! O GitHub detectou e bloqueou o push inicial. Continue usando essa proteção.

### 4. Revise Antes de Commitar

Sempre verifique:
```bash
git diff --cached
```

Antes de:
```bash
git commit
```

---

## 📚 Referências

- [Groq Console](https://console.groq.com)
- [GitHub Secret Scanning](https://docs.github.com/en/code-security/secret-scanning)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

---

## ✅ Checklist de Ação

- [ ] Revogada chave antiga no Groq Console
- [ ] Gerada nova chave no Groq Console
- [ ] Atualizada variável na Vercel
- [ ] Atualizado `.env.local` localmente
- [ ] Feito redeploy na Vercel
- [ ] Testado que API ainda funciona
- [ ] Confirmado que Tutor de IA responde corretamente

---

**Status:** 🔴 PENDENTE - Aguardando ação do usuário

*Criado em: 24/03/2026 às 03:10 UTC*
