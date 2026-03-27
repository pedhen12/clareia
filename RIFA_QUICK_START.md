# 🎟️ Site de Rifas - Resumo Completo

## ✅ Tudo Implementado!

Seu site de venda de rifas está pronto! Sistema completo com 100 números a R$ 10 cada.

## 📁 Estrutura de Arquivos Criada

```
app/
  rifa/
    page.tsx                    # 🏠 Página principal
    sucesso/
      page.tsx                  # ✓ Página de confirmação
    admin/
      page.tsx                  # 📊 Dashboard admin
  api/
    rifa/
      sold-tickets/
        route.ts               # API: Lista rifas vendidas
      checkout/
        route.ts               # API: Cria checkout Stripe
      payment-details/
        route.ts               # API: Detalhes do pagamento
      webhook/
        route.ts               # API: Webhook Stripe
      admin/
        sales/
          route.ts             # API: Dados para admin
      rifa-schema.sql          # 📋 Script SQL

components/
  rifa/
    TicketGrid.tsx             # Grid de números (100)
    Cart.tsx                   # Carrinho de compras

RIFA_SETUP.md                  # 📖 Guia completo de setup
.env.example.rifa              # 🔐 Variáveis de ambiente
RIFA_QUICK_START.md            # ⚡ Este arquivo
```

## 🚀 Quick Start (5 Passos)

### 1️⃣ Instalar dependências
```bash
npm install
```

### 2️⃣ Configurar Stripe
- Acesse https://dashboard.stripe.com
- Crie chaves de teste:
  - **Pública**: `pk_test_...`
  - **Secreta**: `sk_test_...`

### 3️⃣ Criar tabela no Supabase
- Abra SQL Editor em https://app.supabase.com
- Cole conteúdo de `/app/api/rifa-schema.sql`
- Execute

### 4️⃣ Adicionar variáveis ao `.env.local`
```env
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_SUPABASE_URL=seu_supabase_url
SUPABASE_SERVICE_ROLE_KEY=seu_service_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5️⃣ Executar em local
```bash
npm run dev
# Acesse http://localhost:3000/rifa
```

## 🎨 Como Funciona

### Página Principal (`/rifa`)
- ✅ Grid de 100 números em 10 colunas
- ✅ Números em **preto** = vendidos (não clicáveis)
- ✅ Números em **bege** = disponíveis (clicáveis)
- ✅ Números em **azul** = no carrinho
- ✅ Carrinho à direita com resumo
- ✅ Estatísticas em tempo real

### Checkout
- ✅ Integração direta com Stripe
- ✅ Cartão de crédito seguro
- ✅ Confirmação instantânea

### Admin (`/rifa/admin`)
- 🔐 Acesso com senha (padrão: `admin123`)
- 📊 Dashboard com estatísticas
- 📋 Tabela de todas as vendas
- 🔄 Atualização em tempo real

## 🧪 Testar em Desenvolvimento

**Números de cartão Stripe (teste):**
- Cartão: `4242 4242 4242 4242`
- Validade: `12/25`
- CVC: `123`
- ZIP: qualquer número

## 📊 Fluxo de Dados

```
Usuário clica em número
         ↓
Adiciona ao carrinho (frontend)
         ↓
Clica "Ir para Pagamento"
         ↓
Cria sessão Stripe
         ↓
Redirecionado ao checkout Stripe
         ↓
Escolhe pagamento (cartão)
         ↓
Valida no Stripe
         ↓
Status "Completed" → Webhook recebe
         ↓
Atualizar BD status = 'completed'
         ↓
Números marcados como vendidos
         ↓
Próximos clientes veem como pretos
```

## 🔒 Segurança

✅ **Chaves públicas**: Seguro expor com `NEXT_PUBLIC_`
✅ **Chaves secretas**: Protegidas no servidor
✅ **Webhook**: Verifica assinatura Stripe
✅ **Database**: Row-Level Security (RLS) ativado
✅ **Validação**: Números já vendidos não podem ser comprados

## 💰 Informações de Teste

- **Números**: 1-100
- **Preço**: R$ 10 cada
- **Prêmio**: Cesta de Páscoa
- **Sorteio**: 01/04/2026
- **Contato**: teatro.valqueira8b@gmail.com

## 🔧 Personalizações Fáceis

### Mudar Preço ou Quantidade
Em `/app/rifa/page.tsx`:
```typescript
const TOTAL_TICKETS = 100;  // Quantidade
const TICKET_PRICE = 10;     // Preço em reais
```

### Mudar Senha Admin
Em `/app/rifa/admin/page.tsx`:
```typescript
if (password === 'sua_nova_senha') {
  setAuthenticated(true);
}
```

### Mudar Cores
Edite classe Tailwind nos componentes (ex: `bg-amber-100`).

### Mudar Prêmio/Descrição
Em `/app/rifa/page.tsx`:
```typescript
<p>Contribua com... - Prêmio: [SEU PRÊMIO]</p>
```

## 🐛 Troubleshooting

| Problema | Solução |
|----------|---------|
| Erro "stripe is not a function" | Execute `npm install` |
| Webhook não processa | Verifique `STRIPE_WEBHOOK_SECRET` |
| Grid não atualiza | Confirme `SUPABASE_SERVICE_ROLE_KEY` |
| Números não aparecem como vendidos | Verifique status na tabela `rifa_sales` |

## 📞 Próximos Passos Production

1. Mudar chaves Stripe para `pk_live_` e `sk_live_`
2. Configurar domínio próprio
3. Setup webhook Stripe com URL real
4. Testar fluxo completo
5. Deploy em Vercel/sua plataforma
6. Monitorar Dashboard Stripe

## 📖 Documentação Completa

Veja `RIFA_SETUP.md` para:
- Setup detalhado passo a passo
- Configuração completa Stripe
- Configuração webhook
- Testes avançados
- Dicas de segurança
- Monitoramento

## ✨ Features Incluídas

- ✅ Grid responsivo 100 números
- ✅ Carrinho de compras
- ✅ Integração Stripe
- ✅ Webhook automático
- ✅ Dashboard admin
- ✅ Database Supabase
- ✅ Responsivo (mobile)
- ✅ Dark/Light ready
- ✅ Segurança RLS
- ✅ Metadata de auditoria

---

**Pronto? Comece com:** `npm run dev` → `http://localhost:3000/rifa` 🚀
