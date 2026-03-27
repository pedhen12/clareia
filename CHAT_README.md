# 💬 Chat da Comunidade Clareia

## 🎯 O que é?

Sistema de chat em **tempo real** para estudantes se conectarem, tirarem dúvidas e compartilharem materiais de estudo.

---

## ✨ Funcionalidades

### 1. **Mensagens em Tempo Real**
- Baseado em Supabase Realtime
- Mensagens aparecem instantaneamente para todos os usuários
- Scroll automático para novas mensagens

### 2. **Sistema de Nome/Apelido**
- Usuário escolhe nome ao entrar
- Nome salvo no localStorage
- Pode trocar de nome a qualquer momento

### 3. **UI/UX Moderna**
- Design gradiente roxo/azul
- Mensagens estilo WhatsApp (suas mensagens à direita, outras à esquerda)
- Indicador de usuários online (simulado)
- Emoji de status online pulsante

### 4. **Regras da Comunidade**
- Exibidas logo abaixo do chat
- Incentiva respeito e colaboração
- Proíbe spam e conteúdo ofensivo

---

## 🏗️ Arquitetura

```
clareia/
├── app/
│   └── chat/
│       └── page.tsx          # Página principal do chat
├── components/
│   └── chat/
│       └── ChatRoom.tsx      # Componente do chat (realtime)
└── supabase-schema.sql       # Schema do banco de dados
```

---

## 📊 Banco de Dados (Supabase)

### Tabela: `chat_messages`

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `id` | UUID | Primary key |
| `user_name` | TEXT | Nome do usuário |
| `message` | TEXT | Conteúdo da mensagem |
| `created_at` | TIMESTAMP | Data/hora da mensagem |
| `user_id` | UUID | Referência ao usuário (opcional) |
| `likes` | INTEGER | Curtidas (futuro) |

### RLS Policies

- ✅ **Todos podem ler** mensagens
- ✅ **Usuários autenticados E anônimos** podem enviar
- ✅ **Usuários podem deletar** suas próprias mensagens

### Realtime

Tabela adicionada ao Supabase Realtime para:
- Receber novas mensagens automaticamente
- Atualizar a lista sem refresh
- Notificar quando mensagens são deletadas

---

## 🚀 Como Usar

### 1. **Criar Tabela no Supabase**

Execute o SQL do arquivo `supabase-schema.sql`:

```sql
-- Busque a seção "CHAT SYSTEM" no final do arquivo
```

Ou use o Supabase Studio:
1. Vá em **Database** → **SQL Editor**
2. Cole o SQL da tabela `chat_messages`
3. Execute

### 2. **Habilitar Realtime**

No Supabase Studio:
1. Vá em **Database** → **Replication**
2. Ative realtime para a tabela `chat_messages`

### 3. **Testar Localmente**

```bash
npm run dev
```

Acesse: `http://localhost:3000/chat`

### 4. **Testar Realtime**

1. Abra o chat em **duas abas diferentes**
2. Envie uma mensagem em uma aba
3. Veja aparecer na outra **instantaneamente**!

---

## 🎨 Personalização

### Mudar Cores do Gradiente

Em `app/chat/page.tsx` e `components/chat/ChatRoom.tsx`:

```tsx
// Trocar de roxo/azul para verde/amarelo
className="bg-gradient-to-r from-green-600 to-yellow-600"
```

### Limitar Mensagens Antigas

Em `ChatRoom.tsx`, linha ~78:

```tsx
.limit(100)  // Mude para .limit(50) para carregar menos
```

### Adicionar Emojis

Você pode adicionar um picker de emojis:

```bash
npm install emoji-picker-react
```

---

## 📈 Melhorias Futuras

- [ ] Sistema de curtidas em mensagens
- [ ] Menções (@usuário)
- [ ] Emoji picker integrado
- [ ] Salas separadas por matéria
- [ ] Busca de mensagens
- [ ] Modo só leitura para moderadores
- [ ] Sistema de denúncia
- [ ] Upload de imagens
- [ ] Markdown suportado (negrito, itálico)
- [ ] Notificações push

---

## 🔒 Moderação

### Como deletar mensagens inapropriadas:

1. Acesse o Supabase Studio
2. Vá em **Table Editor** → `chat_messages`
3. Encontre a mensagem
4. Clique em **Delete row**

**Futuro:** Sistema de moderação integrado no app.

---

## 📝 Notas Técnicas

- **Supabase Realtime**: WebSocket connection para mensagens instantâneas
- **localStorage**: Salva nome do usuário localmente
- **Auto-scroll**: Desce automaticamente ao receber nova mensagem
- **Limites**: Mensagem máxima de 500 caracteres, nome máximo de 30

---

## 🎉 Resultado Final

✅ Chat funcional em tempo real  
✅ Interface moderna e responsiva  
✅ Integrado ao navbar e homepage  
✅ Regras de comunidade visíveis  
✅ Indicador de usuários online  
✅ 100% gratuito e open source  

---

## 💡 Dicas de Uso

**Para Estudantes:**
- Use para tirar dúvidas rápidas
- Compartilhe materiais de estudo
- Forme grupos de estudo
- Ajude outros colegas

**Para Administradores:**
- Monitore mensagens ocasionalmente
- Delete spam rapidamente
- Incentive uso educacional
- Adicione moderadores se necessário

---

Feito com 💜 por Clareia
