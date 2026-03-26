<div align="center">

# ✨ Clareia — Plataforma Educacional Completa

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8?style=for-the-badge&logo=tailwind-css)
![Groq](https://img.shields.io/badge/Groq-AI-orange?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**A plataforma educacional mais completa do Brasil: do 6º ano ao 9º ano + Preparação para Concursos, ENEM e Vestibulares!**

*100% Gratuito • 190+ Videoaulas • Tutor IA • Gamificação • Sem Login Necessário*

---

### 🌐 **[ACESSE A PLATAFORMA](https://clareia-eight.vercel.app)** 🌐

---

[Reportar Bug](https://github.com/pedhen12/clareia/issues) • [Solicitar Feature](https://github.com/pedhen12/clareia/issues) • [⭐ Star no GitHub](https://github.com/pedhen12/clareia)

</div>

---

## 🎯 Como Usar a Plataforma

### 📚 Para Estudantes do Ensino Fundamental (6º ao 9º ano)

1. **Acesse:** [https://clareia-eight.vercel.app](https://clareia-eight.vercel.app)
2. **Escolha sua matéria:** Matemática, Português, História, Geografia ou Inglês
3. **Selecione sua série:** 6º, 7º, 8º ou 9º ano
4. **Assista às aulas em vídeo** e faça os quizzes para ganhar pontos
5. **Use o Tutor de IA** para tirar suas dúvidas (10 perguntas grátis por dia)
6. **Acompanhe seu progresso** no perfil e no ranking

### 🎓 Para Concursos, ENEM e Vestibulares

1. **Acesse a seção Concursos** no menu principal
2. **Escolha sua categoria:** Vestibular, ENEM, Federal, Estadual, Municipal, Tribunais ou Militar
3. **Selecione a matéria** que deseja estudar
4. **Assista às videoaulas** especializadas
5. **Marque como concluído** e acompanhe seu progresso

**✨ 100% gratuito! Sem cadastro, sem login, sem propaganda!** 📚

---

## 📚 Sobre o Projeto

Clareia é a **plataforma educacional mais completa do Brasil**, oferecendo conteúdo desde o ensino fundamental II (6º ao 9º ano) até preparação avançada para concursos públicos, vestibulares e ENEM. Combinamos vídeo-aulas de alta qualidade de canais educacionais renomados com tecnologia de ponta para criar uma experiência de aprendizado envolvente e eficaz.

### ✨ Principais Funcionalidades

#### 🎓 Para Ensino Fundamental (6º ao 9º ano)
- 🎬 **80+ aulas em vídeo** organizadas por matéria e série
- 📝 **Quizzes interativos** com feedback em tempo real
- 🏆 **Sistema de gamificação** com pontos e ranking
- 📅 **Calendário de estudos** com streak de dias consecutivos
- ⏱️ **Timer Pomodoro** para sessões de foco (25 min estudo + 5 min descanso)

#### 🎯 Para Concursos, ENEM e Vestibulares (NOVO! 🚀)
- 📺 **114 videoaulas especializadas** em 7 categorias diferentes
- 🎓 **Vestibulares:** FUVEST, UNICAMP, UNESP (24 aulas)
- 📝 **ENEM:** Todas as áreas do conhecimento (15 aulas)
- 🏛️ **Concursos Federais:** Receita, INSS, Polícia Federal (15 aulas)
- 🚔 **Concursos Estaduais:** PM, Bombeiros, Professor (12 aulas)
- 🏢 **Concursos Municipais:** Prefeituras e órgãos municipais (12 aulas)
- ⚖️ **Tribunais:** TJ, TRT, TST (15 aulas)
- 🎖️ **Carreira Militar:** ESA, EsPCEx, AFA (21 aulas)

#### 🤖 Recursos Universais
- 🤖 **Tutor de IA** powered by Groq (llama-3.3-70b) disponível 24/7
- 🔍 **Busca global** por aulas e temas
- 👤 **Perfil do estudante** com progresso detalhado
- 🎯 **Conquistas e notificações** motivacionais
- 📱 **Totalmente responsivo** para mobile, tablet e desktop
- 💾 **Progresso salvo automaticamente** no navegador

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

## 🚀 Acesso à Plataforma

### 🌐 Acesse Online (Recomendado)

A plataforma está disponível gratuitamente em:

**👉 [https://clareia-eight.vercel.app](https://clareia-eight.vercel.app)**

Não é necessário instalação! Basta acessar o link e começar a estudar.

### 💻 Desenvolvimento Local (Opcional)

<details>
<summary>Clique aqui se você é desenvolvedor e quer rodar o projeto localmente</summary>

#### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn
- Conta no Groq (gratuita) para obter API key

#### Instalação

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

#### Build para Produção

```bash
npm run build
npm start
```

#### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Groq API Key - Obtenha gratuitamente em https://console.groq.com
GROQ_API_KEY=sua_chave_aqui
```

</details>

---

## 📁 Estrutura do Projeto

```
clareia/
├── app/                              # Páginas e rotas Next.js
│   ├── page.tsx                      # Home page
│   ├── subjects/                     # Ensino Fundamental (6º-9º)
│   │   └── [subject]/
│   │       └── [grade]/
│   │           └── [lesson]/
│   │               ├── page.tsx      # Página da aula
│   │               └── quiz/         # Quiz da aula
│   ├── concursos/                    # 🆕 Seção de Concursos
│   │   ├── page.tsx                  # Dashboard de categorias
│   │   └── [categoria]/
│   │       ├── page.tsx              # Lista de matérias
│   │       └── [materia]/
│   │           ├── page.tsx          # Lista de videoaulas
│   │           └── [id]/
│   │               └── page.tsx      # Player de vídeo
│   ├── tutor/                        # Tutor de IA
│   ├── ranking/                      # Ranking de estudantes
│   ├── search/                       # Busca global
│   ├── perfil/                       # Perfil do estudante
│   ├── upload-pdf/                   # Upload e resumo de PDFs com IA
│   └── api/
│       └── assistant/                # API do Tutor de IA
├── components/                       # Componentes reutilizáveis
│   ├── Navbar.tsx                    # Navegação principal
│   ├── AiTutor.tsx                   # Chat do tutor
│   ├── PomodoroTimer.tsx             # Timer de estudos
│   ├── AchievementToast.tsx          # Notificações de conquistas
│   └── ProgressBar.tsx               # Barra de progresso
├── lib/
│   ├── data.ts                       # Dados das 80 aulas (6º-9º)
│   ├── concursos-data.ts             # 🆕 Dados das 114 aulas (Concursos)
│   └── types.ts                      # Tipos TypeScript
└── public/                           # Arquivos estáticos
```

---

## 🎓 Conteúdo Disponível

### 📚 Ensino Fundamental (6º ao 9º ano) - 80 Aulas

| Matéria | Séries | Aulas | Canal do YouTube |
|---------|--------|-------|------------------|
| 📐 **Matemática** | 6º ao 9º ano | 24 aulas | Gis com Giz |
| 📖 **Português** | 6º ao 9º ano | 18 aulas | Professor Noslen |
| 🏛️ **História** | 6º ao 9º ano | 18 aulas | Se Liga Nerd |
| 🌍 **Geografia** | 6º ao 9º ano | 18 aulas | Geobrasil |
| 🌐 **Inglês** | 6º ao 9º ano | 15 aulas | Mairo Vergara |

### 🎯 Preparação para Concursos e Vestibulares - 114 Aulas

| Categoria | Matérias | Aulas | Canais |
|-----------|----------|-------|---------|
| 🎓 **Vestibular** | Português, Matemática, Física, Química, Biologia, História, Geografia, Inglês | 24 | Professor Noslen, Professor Ferretto, Matemática Rio, Me Salva |
| 📝 **ENEM** | Linguagens, Matemática, Redação, Ciências Humanas, Ciências da Natureza | 15 | Me Salva, Professor Noslen, Matemática Rio |
| 🏛️ **Federal** | Português, Raciocínio Lógico, Informática, Direito Administrativo, Direito Constitucional | 15 | Professor Noslen, Professor Ferretto, Matemática Rio |
| 🚔 **Estadual** | Português, Matemática, Raciocínio Lógico, Conhecimentos Específicos | 12 | Professor Noslen, Matemática Rio, Me Salva |
| 🏢 **Municipal** | Português, Matemática, Conhecimentos Gerais, Conhecimentos Específicos | 12 | Professor Noslen, Matemática Rio, Me Salva |
| ⚖️ **Tribunais** | Português, Raciocínio Lógico, Informática, Direito Administrativo, Direito Constitucional | 15 | Professor Noslen, Matemática Rio |
| 🎖️ **Militar** | Português, Matemática, Física, Química, Inglês, História, Geografia | 21 | Professor Noslen, Professor Ferretto, Matemática Rio, Me Salva |

**Total: 194 videoaulas de canais educacionais verificados!** ✅

---

## 🚀 Roadmap

### ✅ Já Implementado

- [x] 80 aulas do 6º ao 9º ano
- [x] 114 aulas para Concursos, ENEM e Vestibulares
- [x] Tutor de IA com Groq
- [x] Sistema de gamificação e ranking
- [x] Upload e resumo de PDFs
- [x] Timer Pomodoro
- [x] Perfil e calendário de estudos
- [x] Busca global
- [x] Interface totalmente responsiva

### 🔜 Próximas Features

- [ ] Banco de questões para concursos (com 1000+ questões)
- [ ] Simulados cronometrados por categoria
- [ ] Sistema de flashcards para revisão
- [ ] Planner de estudos personalizado
- [ ] Estatísticas avançadas com gráficos
- [ ] Modo escuro
- [ ] Autenticação opcional (Google/Email)
- [ ] Sincronização de progresso entre dispositivos
- [ ] Notificações push
- [ ] App mobile nativo (React Native)

**Quer sugerir uma feature?** [Abra uma issue](https://github.com/pedhen12/clareia/issues/new)!

---

## 💡 Funcionalidades em Detalhes

### 🎬 Sistema de Aulas (Ensino Fundamental)

- Vídeos integrados do YouTube com fallback
- Quizzes interativos após cada aula
- Marcação de aulas como concluídas
- Seção de aulas relacionadas
- Progresso salvo automaticamente
- Sistema de pontos (10 pontos por aula)

### 🎯 Sistema de Concursos (NOVO!)

- 7 categorias especializadas
- Player de vídeo com YouTube embutido
- Botão "Abrir no YouTube" como alternativa
- Progresso individual por matéria e categoria
- Vídeos de canais educacionais verificados
- Interface responsiva e moderna

### 🤖 Tutor de IA

- Powered by Groq (llama-3.3-70b-versatile)
- Respostas em tempo real (< 2 segundos)
- Contexto educacional brasileiro
- Disponível 24/7 sem necessidade de login
- 10 perguntas gratuitas por dia
- Interface de chat amigável

### 📄 Upload e Resumo de PDFs

- Upload de PDFs de até 10MB
- IA extrai e resume o conteúdo
- Gera resumo estruturado automaticamente
- Ideal para estudar apostilas e livros

### 🏆 Gamificação

- 10 pontos por aula concluída
- Sistema de conquistas:
  - 🎯 Primeira Aula (1 aula)
  - 🌟 Aprendiz Dedicado (5 aulas)
  - 🏆 Mestre do Conhecimento (10 aulas)
  - 👑 Sábio Supremo (25 aulas)
- Streak de dias de estudo consecutivos
- Ranking global de estudantes

### 📊 Progresso e Perfil

- Calendário visual de 30 dias de atividade
- Progresso detalhado por matéria
- Estatísticas de conclusão
- Compartilhamento de progresso
- Histórico completo de aulas assistidas

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

Feito com ❤️ para estudantes brasileiros por [Pedro Henrique](https://github.com/pedhen12)

---

## 🙏 Agradecimentos

- [Next.js](https://nextjs.org/) - Framework React
- [Groq](https://groq.com/) - API de IA
- [Tailwind CSS](https://tailwindcss.com/) - Estilização
- Canais educacionais do YouTube pelos conteúdos de qualidade

---

<div align="center">

### 🌟 **[COMECE A ESTUDAR AGORA](https://clareia-eight.vercel.app)** 🌟

**[⬆ Voltar ao topo](#-clareia--plataforma-educacional)**

</div>
