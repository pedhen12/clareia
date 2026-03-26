# 🎯 Plano de Implementação: Aulas Focadas em Concursos

## 💡 A Ideia do Usuário

> "As aulas poderiam ser de acordo com o que caiu nessas provas nos últimos anos, para tentar ser mais certeiro"

**EXCELENTE SUGESTÃO!** Ao invés de aulas genéricas, ter conteúdo específico do que **realmente cai** nas provas.

---

## ✅ O Que Foi Feito (Fase 1: Pesquisa)

### 1. Pesquisa de Conteúdos Prioritários
📄 **Criado:** `ENEM_TOPICOS_PRIORITARIOS.md`

**Mapeamento completo do ENEM:**
- ✅ Matemática: Top 10 tópicos (ex: Porcentagem cai em 8-10 questões)
- ✅ Português: Interpretação de texto = 15-20 questões!
- ✅ Física: Mecânica = 10-12 questões
- ✅ Química: Química Ambiental = 6-7 questões
- ✅ Biologia: Ecologia = 8-10 questões
- ✅ História: República Brasileira = 8-10 questões
- ✅ Geografia: Urbanização = 7-8 questões

**Sistema de prioridades:**
- 🔥🔥🔥 Prioridade ALTA (mais questões nas provas)
- 🟡 Prioridade MÉDIA
- 🟢 Prioridade BAIXA

### 2. Pesquisa de Outros Concursos
📄 **Criado:** `CONTEUDOS_POR_CONCURSO.md`

**Mapeamento de 6 tipos de concurso:**
1. ✅ **Concursos Federais** (INSS, Receita, BB)
   - Português (25%), Raciocínio Lógico (20%), Direito (25%)
   
2. ✅ **Concursos Policiais** (PM, PC, PRF)
   - Direito Penal (20-25%), CTB, Português (20%)
   
3. ✅ **Tribunais** (TJ, TRF, TSE)
   - Português (25-30%), Direito Processual (15-20%)
   
4. ✅ **Professores** (Estaduais/Municipais)
   - LDB (40% das questões de legislação!), Didática
   
5. ✅ **Saúde (SUS)** (Hospitais, Postos)
   - Leis do SUS (30%), Políticas de Saúde
   
6. ✅ **Militares** (ESA, EsPCEx, AFA)
   - Matemática, Física, Química (maior peso)

---

## 📋 O Que Fazer Agora (Fase 2: Implementação)

### OPÇÃO A: Reorganizar ENEM (Mais Rápido) ⚡
**Tempo:** 2-3 horas

1. ✏️ Editar `lib/concursos-data.ts`
2. 🔄 Reorganizar aulas de ENEM por prioridade
3. 🔍 Buscar vídeos específicos dos Top 5 tópicos de cada matéria
4. 🏷️ Adicionar tags "Mais cobrado no ENEM"
5. ✅ Testar e commitar

**Resultado:** ENEM com aulas focadas no que realmente cai

---

### OPÇÃO B: Implementar Concurso Federal (Completo) 🏛️
**Tempo:** 4-5 horas

Adicionar aulas novas para:
1. 📝 **Português** (gramática normativa)
   - Ortografia e acentuação
   - Concordância verbal/nominal
   - Regência e crase
   
2. 🧠 **Raciocínio Lógico**
   - Sequências lógicas
   - Tabelas e gráficos
   - Diagramas de Venn
   
3. 💻 **Informática**
   - Windows 10/11
   - Microsoft Office (Word, Excel)
   - Segurança da informação
   
4. ⚖️ **Direito Administrativo**
   - Princípios da Administração
   - Poderes administrativos
   - Atos administrativos
   
5. 📜 **Direito Constitucional**
   - Direitos fundamentais
   - Poderes (Executivo, Legislativo, Judiciário)
   - Administração Pública

**Resultado:** Novo conjunto completo para concursos federais

---

### OPÇÃO C: Híbrido (Recomendado) 🌟
**Tempo:** 3-4 horas

**Fase 1 (Imediato):**
1. Reorganizar ENEM por prioridade (1h)
2. Adicionar 10-15 vídeos TOP do ENEM (1h)

**Fase 2 (Próxima sessão):**
3. Adicionar matérias de Concurso Federal (2h)
   - Raciocínio Lógico (5 aulas)
   - Informática (5 aulas)
   - Direito Administrativo (5 aulas)
   - Direito Constitucional (5 aulas)

**Resultado:** ENEM otimizado + Base de concursos federais

---

## 🎬 Como Buscar Vídeos Específicos

### Estratégia de Busca:

Para cada tópico prioritário, buscar vídeos nos canais verificados:

**PORTUGUÊS:**
```bash
Canal: Professor Noslen
Buscar: "interpretação de texto enem"
Buscar: "gêneros textuais"
Buscar: "figuras de linguagem"
```

**MATEMÁTICA:**
```bash
Canais: Professor Ferretto, Matemática Rio
Buscar: "porcentagem enem"
Buscar: "geometria plana áreas"
Buscar: "regra de três composta"
```

**RACIOCÍNIO LÓGICO:**
```bash
Canais: Professor Ferretto, Matemática Rio
Buscar: "sequências lógicas concurso"
Buscar: "raciocínio lógico tabelas"
Buscar: "diagramas de venn"
```

**DIREITO:**
```bash
Canal: Alfacon, Gran Cursos
Buscar: "direito administrativo princípios"
Buscar: "direitos fundamentais"
```

---

## 🚀 Roteiro de Implementação (Opção C)

### Passo 1: Backup
```bash
cp lib/concursos-data.ts lib/concursos-data.ts.backup
```

### Passo 2: Reorganizar ENEM
```typescript
// Ordem ANTIGA (aleatória):
// - Análise Sintática
// - Concordância 
// - Regência

// Ordem NOVA (por prioridade):
// 🔥 Interpretação de Texto (15-20 questões no ENEM)
// 🔥 Gêneros Textuais (5-7 questões)
// 🔥 Figuras de Linguagem (4-5 questões)
// - Concordância (menos cobrado)
// - Análise Sintática (menos cobrado)
```

### Passo 3: Buscar Vídeos TOP
Usar `curl` e `grep` para extrair IDs específicos:
```bash
# Exemplo: Buscar "porcentagem enem" no Ferretto
curl -s "https://www.youtube.com/@professorferretto/search?query=porcentagem+enem" | \
  grep -o 'watch?v=[^"&]*' | cut -d'=' -f2 | head -5
```

### Passo 4: Atualizar Dados
```typescript
{
  id: "enem-mat-1",
  categoria: "enem",
  materia: "Matemática",
  titulo: "Porcentagem e Matemática Financeira",
  tipo: "videoaula",
  descricao: "🔥 TÓPICO MAIS COBRADO: 8-10 questões por prova!",
  videoId: "NOVO_ID_ESPECIFICO",
  duracao: 20,
  tags: ["prioridade-alta", "mais-cobrado-enem"],
},
```

### Passo 5: Adicionar Tags
```typescript
// Adicionar campo tags na interface:
export interface MaterialConcurso {
  // ... campos existentes
  tags?: string[];
}

// Usar para filtrar:
// - "prioridade-alta" 🔥
// - "prioridade-media" 🟡  
// - "prioridade-baixa" 🟢
// - "mais-cobrado-enem"
// - "cai-todo-ano"
```

### Passo 6: Testar
```bash
npm run build
npm run dev
# Verificar: http://localhost:3000/concursos/enem
```

### Passo 7: Commit
```bash
git add .
git commit -m "feat: reorganize ENEM content by exam priority

- Reordered topics based on 2020-2024 exam analysis
- Added priority tags (high/medium/low)
- Focused on top 5 topics per subject
- Porcentagem (8-10 questions), Interpretação (15-20), etc"
git push
```

---

## 📊 Exemplo de Resultado Final

### ANTES:
```
ENEM > Matemática
- Aula 1: Função Quadrática
- Aula 2: Trigonometria
- Aula 3: Geometria
```

### DEPOIS:
```
ENEM > Matemática (ordenado por frequência nas provas)

🔥 MAIS COBRADO (26-36 questões)
- ⭐ Porcentagem e Matemática Financeira (8-10 questões)
- ⭐ Geometria Plana - Áreas e Perímetros (6-8 questões)
- ⭐ Análise de Gráficos e Tabelas (5-7 questões)
- ⭐ Regra de Três e Proporção (5-6 questões)

🟡 MÉDIO (11-16 questões)
- Funções 1º e 2º grau (4-6 questões)
- Geometria Espacial (4-5 questões)
- Estatística Básica (3-4 questões)

🟢 COMPLEMENTAR (7-10 questões)
- Probabilidade (3-4 questões)
- Trigonometria (2-3 questões)
- Análise Combinatória (2-3 questões)
```

---

## ❓ Perguntas para o Usuário

1. **Quer começar qual concurso primeiro?**
   - [ ] ENEM (reorganizar o existente)
   - [ ] Concursos Federais (adicionar novos conteúdos)
   - [ ] Híbrido (fazer os dois gradualmente)

2. **Prefere fazer tudo de uma vez ou em partes?**
   - [ ] Tudo de uma vez (3-5h trabalho)
   - [ ] Fazer 1 matéria por vez (para não gastar créditos)

3. **Quer que eu busque vídeos novos ou só reorganize os existentes?**
   - [ ] Buscar vídeos específicos dos tópicos prioritários
   - [ ] Só reorganizar e renomear os existentes

---

## 💾 Status Atual

✅ **Documentação completa criada**
✅ **Pesquisa de tópicos prioritários finalizada**
✅ **Estratégia de implementação definida**
📋 **Aguardando decisão do usuário para implementar**

---

**Próxima ação:** Aguardando escolha do usuário sobre qual opção seguir!

**Commit atual:** `3e0123d` - Documentos de pesquisa adicionados  
**Branch:** `main`  
**GitHub:** https://github.com/pedhen12/clareia
