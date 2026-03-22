<div align="center">

# ✨ Clareia — Plataforma Educacional

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8?style=for-the-badge&logo=tailwind-css)
![Groq](https://img.shields.io/badge/Groq-AI-orange?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Aprenda matemática, português, história, geografia e inglês com aulas em vídeo, quizzes e um tutor de IA inteligente.**

*Gratuito para estudantes brasileiros do 6º ao 9º ano.*

[Demo](https://clareia-theta.vercel.app) • [Reportar Bug](https://github.com/pedhen12/clareia/issues) • [Solicitar Feature](https://github.com/pedhen12/clareia/issues)

</div>

---

## 📚 Sobre o Projeto

Clareia é uma plataforma educacional interativa projetada especialmente para estudantes brasileiros do ensino fundamental II (6º ao 9º ano). Combinamos vídeo-aulas de alta qualidade com tecnologia de ponta para criar uma experiência de aprendizado envolvente e eficaz.

### ✨ Principais Funcionalidades

- 🎬 **80+ aulas em vídeo** organizadas por matéria e série
- 🤖 **Tutor de IA** powered by Groq (llama-3.3-70b) para tirar dúvidas instantaneamente
- 📝 **Quizzes interativos** com feedback em tempo real
- 🏆 **Sistema de gamificação** com pontos e ranking
- 🔍 **Busca global** por aulas e temas
- 👤 **Perfil do estudante** com progresso detalhado por matéria
- 📅 **Calendário de estudos** com streak de dias consecutivos
- ⏱️ **Timer Pomodoro** para sessões de foco (25 min estudo + 5 min descanso)
- 🎯 **Conquistas e notificações** motivacionais
- 📱 **Totalmente responsivo** para mobile, tablet e desktop

---

## 📸 Capturas de Tela

<div align="center">

### 🏠 Página Inicial
![Home](screenshots/home.png)

### 📚 Matérias
![Matérias](screenshots/materias.png)

### 🎬 Aula com Vídeo
![Aula](screenshots/aula.png)

### 🤖 Tutor de IA
![Tutor](screenshots/tutor.png)

### 🏆 Ranking
![Ranking](screenshots/ranking.png)

### 👤 Perfil do Estudante
![Perfil](screenshots/perfil.png)

</div>

---

## 🛠️ Tecnologias

| Tecnologia | Uso |
|------------|-----|
| **Next.js 14** | Framework React com App Router |
| **TypeScript** | Tipagem estática e melhor DX |
| **Tailwind CSS** | Estilização utility-first |
| **Groq API** | Tutor de IA com llama-3.3-70b |
| **localStorage** | Persistência de dados do usuário |

---

## 🚀 Como Começar

### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn
- Conta no Groq (gratuita) para obter API key

### Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/pedhen12/clareia.git
cd clareia

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.example .env.local

# 4. Adicione sua GROQ_API_KEY no arquivo .env.local
# Obtenha gratuitamente em: https://console.groq.com

# 5. Rode o projeto em modo de desenvolvimento
npm run dev
```

O projeto estará disponível em `http://localhost:3000`

### Build para Produção

```bash
npm run build
npm start
```

---

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Groq API Key - Obtenha gratuitamente em https://console.groq.com
GROQ_API_KEY=sua_chave_aqui
```

> **Nota:** O Tutor de IA só funcionará com uma API key válida do Groq. O restante da plataforma funciona normalmente sem ela.

---

## 📁 Estrutura do Projeto

```
clareia/
├── app/                          # Páginas e rotas Next.js
│   ├── page.tsx                  # Home page
│   ├── subjects/                 # Matérias e aulas
│   │   └── [subject]/
│   │       └── [grade]/
│   │           └── [lesson]/
│   │               ├── page.tsx  # Página da aula
│   │               └── quiz/     # Quiz da aula
│   ├── tutor/                    # Tutor de IA
│   ├── ranking/                  # Ranking de estudantes
│   ├── search/                   # Busca global
│   ├── perfil/                   # Perfil do estudante
│   └── api/
│       └── assistant/            # API do Tutor de IA
├── components/                   # Componentes reutilizáveis
│   ├── Navbar.tsx                # Navegação
│   ├── AiTutor.tsx               # Chat do tutor
│   ├── PomodoroTimer.tsx         # Timer de estudos
│   ├── AchievementToast.tsx      # Notificações
│   └── ProgressBar.tsx           # Barra de progresso
├── lib/
│   ├── data.ts                   # Dados das 80+ aulas
│   └── types.ts                  # Tipos TypeScript
└── public/                       # Arquivos estáticos
```

---

## 🎓 Matérias Disponíveis

| Matéria | Séries | Aulas | Canal do YouTube |
|---------|--------|-------|------------------|
| 📐 **Matemática** | 6º ao 9º ano | 24 aulas | Gis com Giz |
| 📖 **Português** | 6º ao 9º ano | 18 aulas | Professor Noslen |
| 🏛️ **História** | 6º ao 9º ano | 18 aulas | Se Liga Nerd |
| 🌍 **Geografia** | 6º ao 9º ano | 18 aulas | Geobrasil |
| 🌐 **Inglês** | 6º ao 9º ano | 15 aulas | Mairo Vergara |

---

## 💡 Funcionalidades em Detalhes

### 🎬 Sistema de Aulas

- Vídeos integrados do YouTube com fallback
- Marcação de aulas como concluídas
- Seção de aulas relacionadas
- Progresso salvo automaticamente

### 🤖 Tutor de IA

- Powered by Groq (llama-3.3-70b-versatile)
- Respostas em tempo real
- Contexto educacional brasileiro
- Disponível 24/7

### 🏆 Gamificação

- 10 pontos por aula concluída
- Sistema de conquistas (1, 5, 10, 25 aulas)
- Streak de dias de estudo
- Ranking global

### 📊 Progresso

- Calendário visual de 30 dias
- Progresso por matéria
- Estatísticas detalhadas
- Compartilhamento de progresso

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Siga estes passos:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'feat: Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

### Convenção de Commits

Seguimos o padrão [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` nova funcionalidade
- `fix:` correção de bug
- `docs:` documentação
- `style:` formatação, ponto e vírgula, etc
- `refactor:` refatoração de código
- `test:` adição de testes
- `chore:` atualização de dependências, etc

---

## �� License

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

Feito com ❤️ para estudantes brasileiros

---

## 🙏 Agradecimentos

- [Next.js](https://nextjs.org/) - Framework React
- [Groq](https://groq.com/) - API de IA
- [Tailwind CSS](https://tailwindcss.com/) - Estilização
- Canais educacionais do YouTube pelos conteúdos de qualidade

---

<div align="center">

**[⬆ Voltar ao topo](#-clareia--plataforma-educacional)**

</div>
