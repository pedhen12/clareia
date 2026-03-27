# 🎟️ Sistema de Vendas de Rifas - Configuração

## Visão Geral

Sistema completo para vender 100 rifas de R$ 10 cada da Grande Rifa com prêmio de Cesta de Páscoa do Palco Elite. Integrado com Stripe para pagamentos seguros.

## Arquivos Criados

### Páginas
- **`/app/rifa/page.tsx`** - Página principal com grid de números e carrinho
- **`/app/rifa/sucesso/page.tsx`** - Página de confirmação após pagamento

### Componentes
- **`/components/rifa/TicketGrid.tsx`** - Grid interativo de 100 números
- **`/components/rifa/Cart.tsx`** - Carrinho de compras

### APIs
- **`/app/api/rifa/sold-tickets/route.ts`** - Lista números vendidos
- **`/app/api/rifa/checkout/route.ts`** - Cria sessão de pagamento Stripe
- **`/app/api/rifa/payment-details/route.ts`** - Recupera detalhes do pagamento
- **`/app/api/rifa/webhook/route.ts`** - Webhook para confirmar pagamentos

### Banco de Dados
- **`/app/api/rifa-schema.sql`** - Script para criar tabela no Supabase

## Configuração Necessária

### 1. Instalar Dependências
```bash
npm install
```

Isso instalará:
- `stripe` - SDK do Stripe para Node.js
- `@stripe/stripe-js` - SDK do Stripe para frontend

### 2. Configurar Variáveis de Ambiente

Adicione ao seu `.env.local`:

```env
# Stripe
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_... (ou pk_live_...)
STRIPE_SECRET_KEY=sk_test_... (ou sk_live_...)
STRIPE_WEBHOOK_SECRET=whsec_...

# Supabase (já existente)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# App URL (para URLs de sucesso/cancelamento)
NEXT_PUBLIC_APP_URL=http://localhost:3000 (dev) ou seu_dominio.com (prod)
```

### 3. Criar Tabela no Supabase

1. Vá para [Supabase Dashboard](https://app.supabase.com)
2. Abra o Editor de SQL
3. Cole o conteúdo de `/app/api/rifa-schema.sql`
4. Execute o script

### 4. Configurar Webhook Stripe

1. Vá para [Stripe Dashboard](https://dashboard.stripe.com)
2. Navegue até **Developers → Webhooks**
3. Clique em **Add endpoint**
4. URL: `https://seu_dominio.com/api/rifa/webhook`
5. Selecione eventos:
   - `checkout.session.completed`
   - `checkout.session.expired`
6. Copie o **Signing Secret** para `STRIPE_WEBHOOK_SECRET`

## Como Funciona

### Fluxo de Compra

1. usuário acessa `/rifa`
2. Vê grid com 100 números
3. Números em **preto** = já vendidos (não clicáveis)
4. Números em **bege** = disponíveis (clicáveis)
5. Números em **azul** = no carrinho do usuário
6. Clica em "Ir para Pagamento"
7. Redirecionado para página de checkout Stripe
8. Após pagamento bem-sucedido → página de sucesso
9. Webhook confirma pagamento e atualiza banco de dados

### Status dos Números

- Obtidos de `rifa_sales` com status `'completed'`
- Atualizados em tempo real ao carregar a página
- Cache de 30 segundos pode ser adicionado para performance

## Testes

### Testar em Desenvolvimento

**Números de teste Stripe:**
- Cartão: `4242 4242 4242 4242`
- Data: `12/25`
- CVC: `123`
- ZIP: qualquer número

### Simular Webhook

Use Stripe CLI:
```bash
stripe listen --forward-to localhost:3000/api/rifa/webhook
stripe trigger payment_intent.succeeded
```

## Dicas de Segurança

✅ Chaves públicas são seguras expostas como `NEXT_PUBLIC_*`
✅ Chaves secretas são protegidas no servidor
✅ Webhook verifica assinatura Stripe
✅ Banco de dados usa RLS para proteger dados
✅ Metadata de pagamento armazenada para auditoria

## Personalização

### Mudar Preço ou Quantidade
Edite em `/app/rifa/page.tsx`:
```typescript
const TOTAL_TICKETS = 100;  // Quantidade
const TICKET_PRICE = 10;     // Preço em reais
```

### Mudar Cores
Edite as classes Tailwind nos componentes:
- **Vendidas**: `bg-gray-900` → customize
- **Disponíveis**: `bg-amber-100` → customize
- **Selecionadas**: `bg-blue-500` → customize

### Mudar Descrição/Prêmio
Edite em `/app/rifa/page.tsx`:
```typescript
<p className="text-amber-700 text-lg">Contribua com o Palco Elite - Prêmio: [SEU PRÊMIO]</p>
```

## Monitoramento

### Dashboard Stripe
- Monitore todas as transações
- Veja pagamentos completados/falhados
- Reembolsos diretos

### Dashboard Supabase
- Tabela `rifa_sales` com histórico completo
- Filtros por data, status, valor
- Relatórios de vendas

## Troubleshooting

**Erro: "stripe is not a function"**
- Execute `npm install` para adicionar a dependência

**Webhook não processa pagamentos**
- Verifique se `STRIPE_WEBHOOK_SECRET` está correto
- Confirme URL do webhook em Stripe Dashboard

**Grid não atualiza números vendidos**
- Verifi que `SUPABASE_SERVICE_ROLE_KEY` está configurado
- Confirme permissões RLS na tabela `rifa_sales`

## Próximos Passos

1. ✅ Executar `npm install`
2. ✅ Configurar variáveis de ambiente
3. ✅ Executar script SQL do Supabase
4. ✅ Configurar webhook Stripe
5. ✅ Testar com números de cartão Stripe
6. ✅ Deploy em produção

## Suporte

Para mais informações:
- [Documentação Stripe](https://stripe.com/docs)
- [Documentação Supabase](https://supabase.com/docs)
- Contato: teatro.valqueira8b@gmail.com
