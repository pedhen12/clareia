# 🤖 Configuração do Tutor de IA (Groq)

## Como funciona

O Clareia usa a **Groq API** para fornecer um tutor de IA que ajuda estudantes com dúvidas sobre as matérias.

**Arquitetura segura:**
- ✅ A chave da API fica **no servidor** (não exposta ao cliente)
- ✅ Usuários chamam `/api/assistant` (nossa API route)
- ✅ O servidor faz a chamada para a Groq usando a chave
- ✅ **Todos os usuários** podem usar a IA sem ter uma chave própria

## Configuração na Vercel

### 1. Obtenha sua chave da Groq

1. Acesse: https://console.groq.com/keys
2. Faça login ou crie uma conta gratuita
3. Clique em **"Create API Key"**
4. Copie a chave (começa com `gsk_...`)

### 2. Configure na Vercel

1. Acesse seu projeto na Vercel: https://vercel.com/dashboard
2. Vá em **Settings** → **Environment Variables**
3. Adicione:
   - **Name:** `GROQ_API_KEY`
   - **Value:** Cole sua chave (ex: `gsk_xxxxxxxxxxxxx`)
   - **Environment:** Marque **Production, Preview, Development**
4. Clique em **Save**

### 3. Faça redeploy

1. Vá em **Deployments**
2. Clique nos 3 pontinhos do último deploy
3. Clique em **Redeploy**

**Pronto!** O tutor de IA agora funciona para todos os usuários do site.

## Configuração local (desenvolvimento)

Se você está rodando o projeto localmente:

1. Crie o arquivo `.env.local` na raiz do projeto:
   ```bash
   GROQ_API_KEY=gsk_sua_chave_aqui
   ```

2. O arquivo `.env.local` **nunca deve ser commitado** (já está no .gitignore)

3. Reinicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

## Testando o Tutor

1. Acesse a página: `/tutor`
2. Faça uma pergunta, exemplo: *"O que são frações?"*
3. Se funcionar, você verá uma resposta do tutor
4. Se der erro `GROQ_API_KEY not configured`, verifique as variáveis de ambiente

## Limites da API gratuita da Groq

- **14.400 requisições/dia** (gratuito)
- **30 requisições/minuto**
- Modelo usado: `llama-3.3-70b-versatile`

Se atingir o limite, considere:
- Upgrade para plano pago
- Implementar rate limiting por usuário
- Adicionar cache de respostas comuns

## Segurança

✅ **Correto (atual):**
- Chave fica em variável de ambiente
- Apenas o servidor acessa a Groq API
- Cliente chama `/api/assistant` (nosso backend)

❌ **Errado (nunca faça):**
- Colocar chave diretamente no código
- Expor chave no cliente (`NEXT_PUBLIC_*`)
- Commitar `.env.local` no Git
- Compartilhar chave publicamente

## Arquivo da API

A lógica está em: `app/api/assistant/route.ts`

```typescript
// Servidor lê a chave da variável de ambiente
if (process.env.GROQ_API_KEY) {
  groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });
}

// API route recebe mensagens do cliente
export async function POST(request: Request) {
  const { messages } = await request.json();
  
  // Chama Groq API (chave não é exposta)
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [systemPrompt, ...messages],
    temperature: 0.7,
    max_tokens: 500,
  });
  
  return Response.json({ content: assistantMessage });
}
```

## Troubleshooting

### Erro: "GROQ_API_KEY not configured"
- Verifique se a variável existe na Vercel
- Faça redeploy após adicionar a variável
- Localmente, verifique se `.env.local` existe

### Erro: "Failed to get response from Groq API"
- Verifique se a chave é válida
- Verifique se não atingiu o rate limit
- Veja os logs na Vercel (Functions → View Function Logs)

### Resposta lenta
- É normal (Groq API pode levar 2-5 segundos)
- Considere adicionar indicador de "digitando..."

---

**Última atualização:** 24/03/2026
**Versão da API:** Groq SDK v0.x
