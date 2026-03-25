# Como Adicionar Vídeos Reais do YouTube

## Problema
Os IDs de vídeo que foram adicionados automaticamente podem não ser válidos ou não permitem embedding (incorporação em sites). Por isso você vê "Vídeo indisponível".

## Solução: Adicionar IDs Reais

### Passo 1: Encontre vídeos nos canais recomendados

Acesse esses canais no YouTube e encontre vídeos sobre os temas:

**Matemática:**
- Professor Ferretto: https://www.youtube.com/@professorferretto
- Matemática Rio: https://www.youtube.com/@MatematicaRio
- Me Salva!: https://www.youtube.com/@MeSalva

**Português:**
- Professor Noslen: https://www.youtube.com/@ProfessorNoslen
- Eduardo Gafa: https://www.youtube.com/@EduardoGafa

**Concursos:**
- Estratégia Concursos: https://www.youtube.com/@EstregiaconcursosOficial
- Gran Cursos: https://www.youtube.com/@GranCursosOnline
- Descomplica: https://www.youtube.com/@Descomplica

**ENEM:**
- Canal Futura: https://www.youtube.com/@canalfutura

### Passo 2: Copie o ID do vídeo

Quando abrir um vídeo, a URL vai ter este formato:
```
https://www.youtube.com/watch?v=ABC123defGH
```

O ID do vídeo é a parte depois de `v=`:
```
ABC123defGH
```

### Passo 3: Substitua no arquivo

Abra o arquivo: `lib/concursos-data.ts`

Procure a aula que quer atualizar e substitua o `videoId`:

```typescript
{
  id: "vest-port-1",
  categoria: "vestibular",
  materia: "Português",
  titulo: "Interpretação de Texto - Fuvest",
  tipo: "videoaula",
  descricao: "Como interpretar textos em provas de vestibular",
  videoId: "ABC123defGH", // ← Cole o ID real aqui
  duracao: 15,
},
```

### Passo 4: Salve e faça deploy

```bash
npm run build
git add .
git commit -m "feat: update video IDs with real YouTube videos"
git push
```

## Dica: Como saber se um vídeo permite embedding

Alguns vídeos do YouTube não permitem ser incorporados em sites. Para testar:
1. Abra o vídeo no YouTube
2. Clique em "Compartilhar" → "Incorporar"
3. Se aparecer o código HTML, o vídeo permite embedding ✅
4. Se aparecer erro, procure outro vídeo ❌

## Exemplo de busca

Para encontrar "Português para concursos":
1. Acesse: https://www.youtube.com/@ProfessorNoslen
2. Use a busca: "análise sintática"
3. Escolha um vídeo
4. Copie o ID da URL
5. Cole no `videoId` correspondente

## Canais que geralmente permitem embedding

✅ Recomendado usar:
- Professor Ferretto
- Matemática Rio  
- Professor Noslen
- Me Salva!
- Gran Cursos Online
- Estratégia Concursos

❌ Evite canais que bloqueiam:
- Alguns canais de TV (Globo, Record, etc)
- Vídeos com restrições de copyright
- Vídeos marcados como "não incorporável"

## Precisa de ajuda?

Se quiser, me mande uma lista de temas e eu te ajudo a montar buscas no YouTube para encontrar os vídeos certos!
