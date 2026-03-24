# ⚠️ Preocupações e Riscos da Plataforma Clareia

**Última atualização:** 24/03/2026

Este documento lista os principais riscos e preocupações além da segurança básica de "não ser hackeado".

---

## 🔴 CRÍTICO - Ação Imediata Necessária

### 1. LGPD e Privacidade de Menores

**Problema:** A plataforma é para estudantes de 12-15 anos (6º ao 9º ano). Você está coletando dados pessoais de **menores de idade** sem:
- Política de Privacidade
- Termos de Uso
- Consentimento dos pais/responsáveis
- Aviso sobre uso de IA (Groq processa as mensagens)

**Por que é grave:**
- LGPD (Lei Geral de Proteção de Dados) exige proteções especiais para menores
- Multa pode chegar a R$ 50 milhões ou 2% do faturamento
- Responsabilidade civil por danos aos menores

**Solução:**
1. Criar página `/termos` com Termos de Uso
2. Criar página `/privacidade` com Política de Privacidade
3. Adicionar checkbox no cadastro: "Li e aceito os termos"
4. Considerar: exigir email dos pais para menores de 13 anos
5. Aviso claro: "Tutor de IA processa suas mensagens com Groq API"

**Urgência:** ⚠️ **ANTES DE DIVULGAR PUBLICAMENTE**

---

### 2. Rate Limiting (Abuso de API)

**Problema:** Qualquer pessoa pode fazer quantas perguntas quiser ao tutor de IA até esgotar seu limite diário (14.400 requisições).

**Cenários de risco:**
- Bot fazendo spam de perguntas
- Usuário mal-intencionado esgotando seu limite
- Você fica sem tutor para usuários legítimos
- Ultrapassar limite = você PAGA (Groq cobra por excesso)

**Solução:**
```typescript
// Implementar em middleware ou API route
// Opção 1: Rate limit por IP
// Opção 2: Rate limit por usuário autenticado
// Sugestão: 10 perguntas por hora por usuário
```

**Ferramentas:**
- `upstash/ratelimit` (Redis-based, gratuito até 10k req/dia)
- `express-rate-limit` (se usar Express)
- Cloudflare Rate Limiting (na borda)

**Urgência:** ⚠️ **ANTES DE TER 100+ USUÁRIOS SIMULTÂNEOS**

---

### 3. Row Level Security (RLS) do Supabase

**Problema:** Suas políticas RLS podem não estar corretas, permitindo que:
- Usuário A veja dados do Usuário B
- Alguém altere pontos de outro usuário
- Perfis privados sejam expostos

**Verificar AGORA no Supabase:**

```sql
-- Tabela: profiles
-- Política: Usuário só vê/edita próprio perfil?
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Tabela: completed_lessons
-- Política: Usuário só insere/vê próprias aulas?
CREATE POLICY "Users manage own lessons"
  ON completed_lessons
  USING (auth.uid() = user_id);

-- Tabela: quiz_attempts
-- Política: Usuário só vê próprios quizzes?
CREATE POLICY "Users manage own quiz attempts"
  ON quiz_attempts
  USING (auth.uid() = user_id);

-- View: leaderboard
-- Política: Todos podem ver (OK, é ranking público)
-- MAS: não deve expor email, endereço IP, etc
```

**Como testar:**
1. Crie dois usuários de teste
2. Logue como Usuário A
3. Tente acessar/modificar dados do Usuário B via console do navegador
4. Se conseguir = **RLS está errado**

**Urgência:** ⏰ **VERIFICAR HOJE**

---

## 🟡 IMPORTANTE - Ação em 1-2 Semanas

### 4. Validação de Dados

**Problema:** Nenhuma validação no backend. Usuário pode enviar:
- Nome com 10.000 caracteres
- Grade inválida: "PhD em Astrofísica"
- Pontos negativos: -999999
- SQL injection em campos de texto (Supabase protege, mas melhor validar)

**Solução:**
```bash
npm install zod
```

```typescript
// lib/validations.ts
import { z } from 'zod';

export const profileSchema = z.object({
  name: z.string().min(2, "Nome muito curto").max(50, "Nome muito longo"),
  grade: z.enum(['6º ano', '7º ano', '8º ano', '9º ano'], {
    errorMap: () => ({ message: "Série inválida" })
  }),
});

export const quizSchema = z.object({
  score: z.number().int().min(0).max(100),
  lessonId: z.string().uuid("ID de aula inválido"),
});

// Usar nos hooks:
const result = profileSchema.safeParse(data);
if (!result.success) {
  return { error: result.error.message };
}
```

**Urgência:** ⏰ **2 SEMANAS**

---

### 5. Logs e Monitoramento

**Problema:** Você não sabe:
- Quantas pessoas usam o tutor por dia
- Quantas requisições já foram feitas à Groq
- Que erros estão acontecendo
- Se alguém está abusando do sistema

**Solução:**
```typescript
// app/api/assistant/route.ts
export async function POST(request: Request) {
  const startTime = Date.now();
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  
  console.log('[AI] Request from:', ip);
  
  try {
    // ... sua lógica ...
    const duration = Date.now() - startTime;
    console.log('[AI] Success in', duration, 'ms');
  } catch (error) {
    console.error('[AI] Error:', error, 'IP:', ip);
  }
}
```

**Melhor ainda:** Usar serviço de logging:
- Vercel Logs (já incluso)
- Sentry (erros e performance)
- Logtail/Betterstack (logs estruturados)

**Urgência:** ⏰ **1-2 SEMANAS**

---

### 6. Backup e Recuperação

**Problema:** Se algo der errado:
- Você sabe onde estão os backups do Supabase?
- Sabe como restaurar?
- Tem backup do código?

**Solução:**
1. **Supabase tem backups automáticos** (7 dias para plano gratuito)
2. Configure backup manual semanal: Database → Backups → Download
3. Git está OK (código está no GitHub)
4. Considere exportar dados importantes periodicamente

**Urgência:** ⏰ **QUANDO TIVER 100+ USUÁRIOS REAIS**

---

## 🟢 MELHORIAS - Quando Tiver Tempo

### 7. Performance e Escalabilidade

**Problemas futuros:**
- Ranking busca TODOS os usuários (sem limite)
- Queries sem índices otimizados
- Sem cache de respostas do tutor
- Sem paginação

**Quando virar problema:**
- 10.000+ usuários
- 1.000+ requisições simultâneas

**Solução:**
- Adicionar índices no Supabase
- Implementar paginação no ranking (TOP 100, depois páginas)
- Cache de respostas comuns do tutor (Redis)
- CDN para assets estáticos

**Urgência:** ⏳ **QUANDO TIVER 1000+ USUÁRIOS ATIVOS**

---

### 8. User Experience

**Melhorias de UX:**
- ❌ Sem loading states em operações assíncronas
- ❌ Mensagens de erro genéricas ("Erro desconhecido")
- ❌ Sem feedback quando algo dá certo ("Perfil salvo!")
- ❌ Sem indicador "digitando..." no tutor
- ❌ Sem modo offline

**Urgência:** ⏳ **MELHORIAS GRADUAIS**

---

### 9. SEO e Marketing

**Faltando:**
- Meta tags Open Graph (preview em redes sociais)
- Sitemap.xml
- robots.txt
- Analytics (Google Analytics / Plausible)
- Pixel de conversão

**Urgência:** ⏳ **QUANDO QUISER DIVULGAR/MONETIZAR**

---

### 10. Acessibilidade

**Problemas:**
- Sem ARIA labels
- Contraste de cores pode não passar WCAG
- Navegação por teclado não testada
- Sem suporte a screen readers

**Urgência:** ⏳ **IMPORTANTE PARA INCLUSÃO, MAS NÃO URGENTE**

---

## 📋 CHECKLIST DE PRIORIDADES

### ⚠️ FAZER AGORA (esta semana):
- [ ] Verificar políticas RLS no Supabase
- [ ] Implementar rate limiting básico
- [ ] Criar Política de Privacidade e Termos de Uso
- [ ] Adicionar checkbox "Aceito os termos" no cadastro

### ⏰ FAZER EM 2 SEMANAS:
- [ ] Validação de dados com Zod
- [ ] Logs básicos de uso da API
- [ ] Loading states nas páginas principais
- [ ] Mensagens de erro user-friendly

### ⏳ FAZER QUANDO CRESCER:
- [ ] Otimização de queries e índices
- [ ] Paginação no ranking
- [ ] Cache de respostas do tutor
- [ ] SEO e meta tags
- [ ] Acessibilidade (WCAG 2.1)

---

## 🚨 ALERTAS A CONFIGURAR

1. **Groq API:** Alerta quando atingir 80% do limite diário
2. **Supabase:** Alerta se storage passar 400MB (limite free)
3. **Vercel:** Alerta se bandwidth passar 80% do limite
4. **Erros:** Notificação se tiver 10+ erros em 1 hora

---

## 📞 QUANDO PROCURAR AJUDA LEGAL

Procure um advogado especializado em:
- LGPD e proteção de dados
- Direito digital
- Responsabilidade civil online

**Especialmente se:**
- For divulgar para escolas/instituições
- For monetizar a plataforma
- Tiver mais de 1.000 usuários cadastrados
- Receber reclamação de pais/responsáveis

---

**Dúvidas?** Revise este documento a cada 3 meses ou quando:
- Atingir 1.000 usuários
- Implementar nova funcionalidade
- Receber feedback de segurança
- Supabase/Groq mudarem políticas
