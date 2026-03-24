# 🔧 Problemas e Melhorias Necessárias - Clareia

## ❌ PROBLEMAS CRÍTICOS (Precisam ser resolvidos URGENTEMENTE)

### 1. **Sistema de Autenticação Não Integrado com a UI**
- **Problema:** A autenticação está implementada, mas não está conectada ao resto da aplicação
- **Detalhes:**
  - Navbar não mostra status de login (usuário logado ou não)
  - Não há botão "Login/Cadastrar" no Navbar
  - Não há proteção de rotas (usuários não logados podem acessar tudo)
  - localStorage ainda é usado mesmo quando usuário está autenticado
  - Dados do Supabase não são sincronizados com a UI
- **Impacto:** Usuários não conseguem realmente usar o sistema de autenticação
- **Prioridade:** 🔴 CRÍTICA

### 2. **Dados Falsos no Ranking**
- **Problema:** O ranking mostra dados mockados/falsos
- **Detalhes:**
  - Lista de estudantes é hardcoded (`João Silva`, `Maria Santos`, etc.)
  - Não busca dados reais do Supabase
  - Leaderboard view do Supabase existe mas não é usada
  - Usuários reais não aparecem no ranking
- **Impacto:** Funcionalidade completamente fake
- **Prioridade:** 🔴 CRÍTICA

### 3. **Dados do Perfil Não Sincronizam com Supabase**
- **Problema:** Perfil usa apenas localStorage
- **Detalhes:**
  - Dados salvos em `student_profile` localStorage
  - Não salva no banco de dados `profiles` do Supabase
  - Se usuário mudar de dispositivo, perde todos os dados
  - Autenticação existe mas perfil não a usa
- **Impacto:** Dados podem ser perdidos facilmente
- **Prioridade:** 🔴 CRÍTICA

### 4. **Progresso de Aulas Não Persiste no Banco**
- **Problema:** Aulas completadas são salvas apenas em localStorage
- **Detalhes:**
  - `user_progress` está em localStorage
  - Tabela `completed_lessons` no Supabase existe mas não é usada
  - Se limpar cache do navegador, perde todo o progresso
  - Não há sincronização entre dispositivos
- **Impacto:** Perda de progresso do estudante
- **Prioridade:** 🔴 CRÍTICA

### 5. **Quiz Attempts Não São Salvos no Banco**
- **Problema:** Resultados de quiz não vão para o Supabase
- **Detalhes:**
  - Pontuações ficam apenas no localStorage
  - Tabela `quiz_attempts` do Supabase não é usada
  - Histórico de tentativas não é rastreado
  - Não há como ver evolução real do aluno
- **Impacto:** Impossível analisar desempenho real
- **Prioridade:** 🔴 CRÍTICA

---

## ⚠️ PROBLEMAS IMPORTANTES (Devem ser resolvidos em breve)

### 6. **Study Days Calendar Não Funciona com Banco Real**
- **Problema:** Calendário de estudos usa localStorage
- **Detalhes:**
  - `studyDays` array em localStorage
  - Tabela `study_days` do Supabase não é usada
  - Streak calculation é client-side apenas
  - Não sincroniza entre dispositivos
- **Impacto:** Funcionalidade de gamificação não funciona corretamente
- **Prioridade:** 🟠 ALTA

### 7. **Pomodoro Sessions Não São Registradas**
- **Problema:** Timer Pomodoro não salva sessões
- **Detalhes:**
  - Component existe mas não persiste dados
  - Tabela `pomodoro_sessions` do Supabase não é usada
  - Não há histórico de sessões de estudo
  - Não contribui para estatísticas do usuário
- **Impacto:** Perda de dados de tempo de estudo
- **Prioridade:** 🟠 ALTA

### 8. **Google OAuth Não Está Configurado**
- **Problema:** Botão do Google existe mas não funciona
- **Detalhes:**
  - Frontend tem o botão "Entrar com Google"
  - Backend Supabase não tem Google OAuth configurado
  - Usuários clicam mas recebem erro
  - Apenas email/password funciona
- **Impacto:** Experiência ruim do usuário
- **Prioridade:** 🟠 ALTA

### 9. **Verificação de Email Não É Obrigatória**
- **Problema:** Usuários podem fazer login sem confirmar email
- **Detalhes:**
  - Cadastro envia email de confirmação
  - Mas login funciona mesmo sem confirmar
  - Supabase deve bloquear mas não está configurado
  - Permite emails fake
- **Impacto:** Segurança comprometida
- **Prioridade:** 🟠 ALTA

### 10. **Sem Proteção de Rotas**
- **Problema:** Todas as páginas são públicas
- **Detalhes:**
  - Não há middleware de autenticação
  - Usuários não logados acessam tudo
  - Páginas de perfil, ranking, etc. deveriam ser protegidas
  - Supabase tem sessão mas não é verificada
- **Impacto:** Segurança e UX ruins
- **Prioridade:** 🟠 ALTA

---

## 🐛 BUGS E PROBLEMAS TÉCNICOS

### 11. **Leaderboard View com SECURITY DEFINER**
- **Problema:** Alerta de segurança no Supabase
- **Detalhes:**
  - View `public.leaderboard` usa SECURITY DEFINER
  - Supabase Security Advisor recomenda remover
  - Pode causar problemas de permissão
  - View existe mas não é usada no frontend
- **Impacto:** Potencial problema de segurança
- **Prioridade:** 🟡 MÉDIA

### 12. **Sem Tratamento de Erro em Autenticação**
- **Problema:** Errors não são bem tratados
- **Detalhes:**
  - Se Supabase falhar, página quebra
  - Não há fallback para offline
  - Mensagens de erro genéricas
  - Console.error apenas, sem UI feedback
- **Impacto:** UX ruim quando há erro
- **Prioridade:** 🟡 MÉDIA

### 13. **Limit de 10 Perguntas do Tutor IA Não Persiste**
- **Problema:** Limite diário é apenas em localStorage
- **Detalhes:**
  - `tutor_usage` em localStorage
  - Se limpar cache, reseta limite
  - Usuário pode burlar facilmente
  - Deveria estar no banco de dados
- **Impacto:** Controle de custos API não funciona
- **Prioridade:** 🟡 MÉDIA

### 14. **Videos do YouTube Podem Estar Errados**
- **Problema:** Video IDs foram buscados automaticamente
- **Detalhes:**
  - 75+ videos foram adicionados via web search
  - Alguns podem não corresponder exatamente ao tópico
  - Não foram todos verificados manualmente
  - Especialmente História e Geografia podem ter vídeos errados
- **Impacto:** Alunos assistem vídeo errado para o tópico
- **Prioridade:** 🟡 MÉDIA

### 15. **Sem Loading States em Operações do Banco**
- **Problema:** UI não mostra carregamento
- **Detalhes:**
  - Operações Supabase não têm loading spinner
  - Usuário não sabe se ação está processando
  - Pode clicar múltiplas vezes
  - Sem feedback visual
- **Impacto:** UX confusa
- **Prioridade:** 🟡 MÉDIA

---

## 🎨 MELHORIAS DE UX/UI

### 16. **Navbar Não Mostra Status de Login**
- **Problema:** Não dá para saber se está logado
- **Detalhes:**
  - Deveria mostrar avatar/nome do usuário
  - Botão "Login" deveria virar "Perfil" após login
  - Não há indicação visual de autenticação
  - UserMenu component existe mas não é usado
- **Impacto:** UX confusa
- **Prioridade:** 🟡 MÉDIA

### 17. **Sem Página "Esqueci Minha Senha"**
- **Problema:** Usuários não podem recuperar senha
- **Detalhes:**
  - Supabase tem função `resetPasswordForEmail`
  - Frontend não implementa
  - Link "Esqueci senha" não existe
  - Usuários ficam travados se esquecerem
- **Impacto:** Usuários perdem acesso
- **Prioridade:** 🟡 MÉDIA

### 18. **Achievements/Conquistas Não Funcionam com Banco Real**
- **Problema:** AchievementToast existe mas dados são fake
- **Detalhes:**
  - Component mostra notificação
  - Mas não verifica conquistas reais do banco
  - Não há tabela de achievements no Supabase
  - Sistema de badges não implementado
- **Impacto:** Gamificação incompleta
- **Prioridade:** 🟡 MÉDIA

### 19. **Search Não Busca em Descrições/Conteúdo**
- **Problema:** Busca é limitada
- **Detalhes:**
  - Busca apenas em títulos de aulas
  - Não busca em descrições ou transcrições
  - Poderia usar full-text search do Supabase
  - Filtros funcionam mas busca é básica
- **Impacto:** Difícil encontrar conteúdo
- **Prioridade:** 🟢 BAIXA

### 20. **Sem Sistema de Notificações**
- **Problema:** Usuários não recebem alertas
- **Detalhes:**
  - Sem notificações push
  - Sem email quando completam milestone
  - Sem lembrete de estudar
  - Supabase tem trigger de email mas não configurado
- **Impacto:** Baixo engajamento
- **Prioridade:** 🟢 BAIXA

---

## 📊 PROBLEMAS DE DADOS E PERFORMANCE

### 21. **Sem Paginação em Listas**
- **Problema:** Todas as aulas carregam de uma vez
- **Detalhes:**
  - lib/data.ts tem 80+ aulas
  - Todas são carregadas no client
  - Sem lazy loading ou paginação
  - Pode ficar lento com mais conteúdo
- **Impacto:** Performance pode degradar
- **Prioridade:** 🟢 BAIXA

### 22. **Videos do YouTube Não Têm Fallback**
- **Problema:** Se vídeo for removido, página quebra
- **Detalhes:**
  - Iframe mostra erro do YouTube
  - Não verifica se video_id ainda existe
  - Link alternativo existe mas não detecta erro
  - Deveria mostrar placeholder se vídeo indisponível
- **Impacto:** UX ruim se vídeo é deletado
- **Prioridade:** 🟢 BAIXA

### 23. **Sem Analytics/Tracking**
- **Problema:** Não sabemos como usuários usam a plataforma
- **Detalhes:**
  - Sem Google Analytics
  - Sem Vercel Analytics
  - Sem tracking de eventos
  - Impossível otimizar baseado em dados
- **Impacto:** Não conseguimos melhorar com dados
- **Prioridade:** 🟢 BAIXA

### 24. **Sem Cache de Dados do Supabase**
- **Problema:** Sempre busca do banco
- **Detalhes:**
  - Queries Supabase não têm cache
  - Mesmo dado é buscado múltiplas vezes
  - Poderia usar SWR ou React Query
  - Aumenta latência desnecessariamente
- **Impacto:** Performance pode ser melhor
- **Prioridade:** 🟢 BAIXA

---

## 🔒 PROBLEMAS DE SEGURANÇA

### 25. **GROQ_API_KEY Está Visível em Commits**
- **Problema:** Chave API foi commitada
- **Detalhes:**
  - Foi incluída em VERCEL_FIX.md (depois removida)
  - Histórico do Git ainda tem a chave
  - GitHub Secret Scanning detectou
  - Chave deveria ser rotacionada
- **Impacto:** Possível uso não autorizado da API
- **Prioridade:** 🔴 CRÍTICA

### 26. **NEXT_PUBLIC_SUPABASE_ANON_KEY é Pública**
- **Problema:** Chave anon é visível no cliente
- **Detalhes:**
  - Por design do Supabase, isso é esperado
  - Mas RLS (Row Level Security) deve estar bem configurado
  - Algumas policies podem estar muito permissivas
  - Precisa revisar todas as policies
- **Impacto:** Potencial acesso não autorizado a dados
- **Prioridade:** 🟠 ALTA

### 27. **Sem Rate Limiting no Backend**
- **Problema:** API routes não têm proteção
- **Detalhes:**
  - `/api/assistant` não tem rate limit
  - Usuários podem fazer spam
  - Pode gerar custos altos com Groq API
  - Limite de 10 perguntas é apenas client-side
- **Impacto:** Possível abuso e custos altos
- **Prioridade:** 🟠 ALTA

---

## 📱 PROBLEMAS DE RESPONSIVIDADE E PWA

### 28. **PWA Não Está Totalmente Funcional**
- **Problema:** Manifest existe mas faltam ícones
- **Detalhes:**
  - manifest.json pede icon-192.png e icon-512.png
  - Arquivos não existem em /public
  - PWA install prompt não funciona
  - Sem service worker
- **Impacto:** App não pode ser instalado
- **Prioridade:** 🟡 MÉDIA

### 29. **Sem Modo Offline**
- **Problema:** App não funciona sem internet
- **Detalhes:**
  - Não há service worker
  - Conteúdo não é cacheado
  - Vídeos obviamente precisam de internet
  - Mas UI poderia funcionar offline
- **Impacto:** UX ruim em conexão instável
- **Prioridade:** 🟢 BAIXA

### 30. **Mobile Menu Pode Ficar Muito Grande**
- **Problema:** Com autenticação, menu mobile terá muitos itens
- **Detalhes:**
  - Já tem 6 itens (Home, Matérias, Buscar, Tutor, Ranking, Perfil)
  - Vai adicionar Login/Logout
  - Pode não caber na tela
  - Poderia usar bottom navigation
- **Impacto:** UX ruim no mobile
- **Prioridade:** 🟢 BAIXA

---

## 📚 PROBLEMAS DE CONTEÚDO

### 31. **Aulas Não Têm Descrição Detalhada**
- **Problema:** Apenas título e videoId
- **Detalhes:**
  - lib/data.ts tem estrutura básica
  - Falta descrição do que será aprendido
  - Falta objetivos de aprendizagem
  - Falta pré-requisitos
- **Impacto:** Alunos não sabem o que esperar
- **Prioridade:** 🟢 BAIXA

### 32. **Quizzes São Muito Simples**
- **Problema:** Apenas 3-4 questões por quiz
- **Detalhes:**
  - Perguntas são genéricas
  - Não há feedback detalhado
  - Não explica porque resposta está errada
  - Poderia ter dificuldade progressiva
- **Impacto:** Avaliação não é efetiva
- **Prioridade:** 🟢 BAIXA

### 33. **Sem Material Complementar**
- **Problema:** Apenas vídeos
- **Detalhes:**
  - Não há PDFs para download
  - Não há exercícios extras
  - Não há links para aprofundamento
  - Poderia ter resumos em texto
- **Impacto:** Aprendizado limitado
- **Prioridade:** 🟢 BAIXA

---

## 🎯 RESUMO DE PRIORIDADES

### 🔴 CRÍTICO (Resolver AGORA)
1. Integrar autenticação com UI e Navbar
2. Ranking com dados reais do Supabase
3. Perfil sincronizar com tabela profiles
4. Progresso de aulas salvar em completed_lessons
5. Quiz attempts salvar no banco
6. Rotacionar GROQ_API_KEY que vazou

### 🟠 ALTO (Resolver esta semana)
7. Study days calendar com banco real
8. Pomodoro sessions registrar no banco
9. Configurar Google OAuth
10. Forçar verificação de email
11. Adicionar proteção de rotas
12. Revisar RLS policies do Supabase
13. Rate limiting no /api/assistant

### 🟡 MÉDIO (Resolver este mês)
14. Verificar todos os vídeos do YouTube
15. Loading states em operações do banco
16. Navbar mostrar status de login
17. Página "Esqueci minha senha"
18. Sistema real de achievements
19. Melhorar busca (full-text search)
20. Tratamento de erros em auth
21. Corrigir SECURITY DEFINER na view
22. PWA completo com ícones

### 🟢 BAIXO (Backlog)
23. Paginação nas listas
24. Fallback para vídeos removidos
25. Analytics e tracking
26. Cache de dados com SWR
27. Sistema de notificações
28. Modo offline
29. Melhorar mobile menu
30. Descrições detalhadas das aulas
31. Quizzes mais complexos
32. Material complementar

---

## 📝 NOTAS IMPORTANTES

**Status atual do deploy:** ✅ Funcionando (https://clareia-eight.vercel.app)
**Status do banco:** ✅ Configurado mas não integrado
**Status da autenticação:** ⚠️ Implementada mas não conectada à UI

**Próximos passos recomendados:**
1. Integrar autenticação com o resto da aplicação (navbar, proteção de rotas)
2. Migrar todos os dados de localStorage para Supabase
3. Testar fluxo completo de usuário (cadastro → login → estudar → quiz → ranking)
4. Rotacionar API keys que vazaram
5. Adicionar rate limiting e proteção de segurança

---

*Documento gerado em: 24/03/2026 às 03:03 UTC*
