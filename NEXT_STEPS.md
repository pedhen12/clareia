# 📋 Próximas Etapas - Integração dos Hooks

## ✅ PARTE 1 COMPLETA (Commitada)

Criamos toda a infraestrutura de autenticação e hooks:
- ✅ useAuth - Gerencia sessão do usuário
- ✅ useProfile - Sincroniza perfil com Supabase  
- ✅ useCompletedLessons - Rastreia aulas completadas
- ✅ useQuizAttempts - Salva resultados de quiz
- ✅ Navbar integrada com auth
- ✅ Middleware protegendo rotas
- ✅ Ranking com dados reais

## 🔄 PARTE 2 - Integrar Hooks nas Páginas (PRÓXIMO)

### 2.1 - Página de Perfil (15 min)
**Arquivo:** `app/perfil/page.tsx`

Mudar de:
```typescript
const profile = JSON.parse(localStorage.getItem("student_profile") || "{}");
```

Para:
```typescript
const { profile, loading, updateProfile } = useProfile();
```

### 2.2 - Página de Aulas (20 min)
**Arquivos:** 
- `app/subjects/[subject]/[grade]/page.tsx`
- `app/subjects/[subject]/[grade]/[lesson]/page.tsx`

Adicionar:
```typescript
const { completedLessons, completeLesson } = useCompletedLessons();
```

Ao completar aula, chamar:
```typescript
await completeLesson(lessonId);
```

### 2.3 - Página de Quiz (15 min)
**Arquivo:** `app/subjects/[subject]/[grade]/[lesson]/quiz/page.tsx`

Adicionar:
```typescript
const { saveQuizAttempt } = useQuizAttempts();
```

Ao submeter quiz:
```typescript
await saveQuizAttempt(lessonId, score, totalQuestions);
```

### 2.4 - Página Home (10 min)
**Arquivo:** `app/page.tsx`

Trocar localStorage por useProfile:
```typescript
const { profile } = useProfile();
const { completedLessons } = useCompletedLessons();
```

## 🔄 PARTE 3 - Testes e Validação (DEPOIS)

1. Testar cadastro de novo usuário
2. Testar login
3. Completar uma aula e verificar se salva
4. Fazer um quiz e verificar pontos
5. Ver se ranking atualiza
6. Testar logout

## 📊 Status Atual

**Hooks criados:** 4/4 ✅
**Páginas integradas:** 0/5 ⏳
**Testes realizados:** 0/6 ⏳

**Próximo comando:** Integrar useProfile em /perfil/page.tsx

---

*Criado em: 24/03/2026 03:58 UTC*
