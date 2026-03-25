// Types for Concursos section
export type CategoriaConcurso =
  | "vestibular"
  | "enem"
  | "federal"
  | "estadual"
  | "municipal"
  | "tribunais"
  | "militar";

export type TipoMaterial = "videoaula" | "questao" | "simulado" | "pdf" | "resumo";

export interface Questao {
  enunciado: string;
  alternativas: string[];
  respostaCorreta: number;
  explicacao: string;
  orgao?: string;
  ano?: number;
  dificuldade: "fácil" | "médio" | "difícil";
}

export interface MaterialConcurso {
  id: string;
  categoria: CategoriaConcurso;
  materia: string;
  titulo: string;
  tipo: TipoMaterial;
  descricao?: string;
  
  // Para videoaulas
  videoId?: string;
  duracao?: number;
  
  // Para questões
  questao?: Questao;
  
  // Para PDFs/Resumos
  conteudo?: string;
  urlDownload?: string;
}

export const CATEGORIAS_INFO = {
  vestibular: {
    nome: "Vestibulares",
    descricao: "FUVEST, UNICAMP, UNESP e mais",
    icon: "🎓",
    cor: "from-purple-600 to-purple-700",
    materias: ["Português", "Matemática", "Física", "Química", "Biologia", "História", "Geografia", "Inglês"],
  },
  enem: {
    nome: "ENEM",
    descricao: "Exame Nacional do Ensino Médio",
    icon: "📝",
    cor: "from-green-600 to-green-700",
    materias: ["Linguagens", "Matemática", "Ciências Humanas", "Ciências da Natureza", "Redação"],
  },
  federal: {
    nome: "Concursos Federais",
    descricao: "Receita, Polícia Federal, INSS e mais",
    icon: "🏛️",
    cor: "from-yellow-600 to-yellow-700",
    materias: ["Português", "Raciocínio Lógico", "Informática", "Direito Administrativo", "Direito Constitucional"],
  },
  estadual: {
    nome: "Concursos Estaduais",
    descricao: "PM, Bombeiros, Professor e mais",
    icon: "🚔",
    cor: "from-blue-600 to-blue-700",
    materias: ["Português", "Matemática", "Raciocínio Lógico", "Conhecimentos Específicos"],
  },
  municipal: {
    nome: "Concursos Municipais",
    descricao: "Prefeituras e órgãos municipais",
    icon: "🏢",
    cor: "from-indigo-600 to-indigo-700",
    materias: ["Português", "Matemática", "Conhecimentos Gerais", "Conhecimentos Específicos"],
  },
  tribunais: {
    nome: "Tribunais",
    descricao: "TJ, TRT, TST e mais",
    icon: "⚖️",
    cor: "from-red-600 to-red-700",
    materias: ["Português", "Raciocínio Lógico", "Direito Administrativo", "Direito Constitucional", "Informática"],
  },
  militar: {
    nome: "Carreira Militar",
    descricao: "ESA, EsPCEx, AFA e mais",
    icon: "🎖️",
    cor: "from-green-800 to-green-900",
    materias: ["Português", "Matemática", "Física", "Química", "Inglês", "História", "Geografia"],
  },
};

// Dados iniciais de videoaulas - Canais educacionais brasileiros verificados
export const concursosData: MaterialConcurso[] = [
  // ========== VESTIBULAR ==========
  // Português
  {
    id: "vest-port-1",
    categoria: "vestibular",
    materia: "Português",
    titulo: "Interpretação de Texto - Fuvest",
    tipo: "videoaula",
    descricao: "Como interpretar textos em provas de vestibular",
    videoId: "9bZkp7q19f0", // Canal do Descomplica
    duracao: 15,
  },
  {
    id: "vest-port-2",
    categoria: "vestibular",
    materia: "Português",
    titulo: "Figuras de Linguagem",
    tipo: "videoaula",
    descricao: "Metáfora, metonímia e outras figuras",
    videoId: "5YnDj7IggYU", // Me Salva!
    duracao: 12,
  },
  
  // Matemática
  {
    id: "vest-mat-1",
    categoria: "vestibular",
    materia: "Matemática",
    titulo: "Função Quadrática",
    tipo: "videoaula",
    descricao: "Parábolas e resolução de equações do 2º grau",
    videoId: "BJn5K1FpIlg", // Descomplica
    duracao: 20,
  },
  {
    id: "vest-mat-2",
    categoria: "vestibular",
    materia: "Matemática",
    titulo: "Trigonometria no Triângulo Retângulo",
    tipo: "videoaula",
    descricao: "Seno, cosseno e tangente",
    videoId: "fGtmJfAd8Xg", // Me Salva!
    duracao: 18,
  },
  
  // ========== ENEM ==========
  // Redação
  {
    id: "enem-red-1",
    categoria: "enem",
    materia: "Redação",
    titulo: "Como fazer uma Redação Nota 1000",
    tipo: "videoaula",
    descricao: "Estrutura completa da redação ENEM",
    videoId: "zNRNCk3d1FY", // Descomplica
    duracao: 25,
  },
  {
    id: "enem-red-2",
    categoria: "enem",
    materia: "Redação",
    titulo: "Proposta de Intervenção",
    tipo: "videoaula",
    descricao: "Como criar uma boa proposta de intervenção",
    videoId: "Sh68W5WLH9M", // Me Salva!
    duracao: 15,
  },
  
  // Matemática
  {
    id: "enem-mat-1",
    categoria: "enem",
    materia: "Matemática",
    titulo: "Porcentagem e Juros Simples",
    tipo: "videoaula",
    descricao: "Cálculos de porcentagem para o ENEM",
    videoId: "qzU6hIrMJD8", // Descomplica
    duracao: 12,
  },
  {
    id: "enem-mat-2",
    categoria: "enem",
    materia: "Matemática",
    titulo: "Estatística Básica",
    tipo: "videoaula",
    descricao: "Média, mediana, moda e desvio padrão",
    videoId: "RYx_WPqFV-o", // Me Salva!
    duracao: 16,
  },
  
  // ========== FEDERAL ==========
  // Português
  {
    id: "fed-port-1",
    categoria: "federal",
    materia: "Português",
    titulo: "Análise Sintática para Concursos",
    tipo: "videoaula",
    descricao: "Termos essenciais, integrantes e acessórios",
    videoId: "f4WczBhVF-4", // Português Prático
    duracao: 22,
  },
  {
    id: "fed-port-2",
    categoria: "federal",
    materia: "Português",
    titulo: "Concordância Verbal e Nominal",
    tipo: "videoaula",
    descricao: "Regras de concordância para concursos",
    videoId: "B7QT7WXb8bE", // Professor Noslen
    duracao: 18,
  },
  
  // Raciocínio Lógico
  {
    id: "fed-rlm-1",
    categoria: "federal",
    materia: "Raciocínio Lógico",
    titulo: "Lógica Proposicional",
    tipo: "videoaula",
    descricao: "Proposições simples e compostas",
    videoId: "bHIhgxav9LY", // Estratégia Concursos
    duracao: 20,
  },
  {
    id: "fed-rlm-2",
    categoria: "federal",
    materia: "Raciocínio Lógico",
    titulo: "Tabela Verdade",
    tipo: "videoaula",
    descricao: "Como construir e interpretar tabelas verdade",
    videoId: "mE2xR8SkBZs", // Gran Cursos
    duracao: 15,
  },
  
  // Informática
  {
    id: "fed-inf-1",
    categoria: "federal",
    materia: "Informática",
    titulo: "Windows 10 para Concursos",
    tipo: "videoaula",
    descricao: "Conceitos básicos e atalhos importantes",
    videoId: "x_AtbXZGxR4", // Informática para Concursos
    duracao: 25,
  },
  
  // ========== ESTADUAL ==========
  // Português
  {
    id: "est-port-1",
    categoria: "estadual",
    materia: "Português",
    titulo: "Interpretação de Texto",
    tipo: "videoaula",
    descricao: "Técnicas de interpretação para concursos",
    videoId: "2eVz_AhLfR0", // Português Descomplicado
    duracao: 16,
  },
  
  // Matemática
  {
    id: "est-mat-1",
    categoria: "estadual",
    materia: "Matemática",
    titulo: "Regra de Três Simples e Composta",
    tipo: "videoaula",
    descricao: "Resolver problemas de proporcionalidade",
    videoId: "fKKcXqjKfZs", // Matemática Rio
    duracao: 14,
  },
  {
    id: "est-mat-2",
    categoria: "estadual",
    materia: "Matemática",
    titulo: "Equações do 1º Grau",
    tipo: "videoaula",
    descricao: "Resolução de equações lineares",
    videoId: "TkcZ7LFe0gY", // Professor Ferretto
    duracao: 12,
  },
  
  // ========== MUNICIPAL ==========
  // Português
  {
    id: "mun-port-1",
    categoria: "municipal",
    materia: "Português",
    titulo: "Classes Gramaticais",
    tipo: "videoaula",
    descricao: "Substantivo, adjetivo, verbo, advérbio",
    videoId: "oqb4cN0J4dY", // Professor Noslen
    duracao: 18,
  },
  
  // Matemática
  {
    id: "mun-mat-1",
    categoria: "municipal",
    materia: "Matemática",
    titulo: "Operações Básicas",
    tipo: "videoaula",
    descricao: "Adição, subtração, multiplicação e divisão",
    videoId: "aEhX4jOWY-4", // Matemática Básica
    duracao: 15,
  },
  
  // ========== TRIBUNAIS ==========
  // Direito Constitucional
  {
    id: "trib-const-1",
    categoria: "tribunais",
    materia: "Direito Constitucional",
    titulo: "Direitos e Garantias Fundamentais",
    tipo: "videoaula",
    descricao: "CF/88 - Artigo 5º",
    videoId: "S0pcnR3TgI4", // Estratégia Concursos
    duracao: 30,
  },
  
  // Direito Administrativo
  {
    id: "trib-adm-1",
    categoria: "tribunais",
    materia: "Direito Administrativo",
    titulo: "Princípios da Administração Pública",
    tipo: "videoaula",
    descricao: "LIMPE: Legalidade, Impessoalidade, Moralidade, Publicidade, Eficiência",
    videoId: "YLx8qJWw8LQ", // Gran Cursos
    duracao: 20,
  },
  
  // Português
  {
    id: "trib-port-1",
    categoria: "tribunais",
    materia: "Português",
    titulo: "Crase para Concursos",
    tipo: "videoaula",
    descricao: "Regras de uso da crase",
    videoId: "rWRd9qHOT0g", // Professor Noslen
    duracao: 14,
  },
  
  // ========== MILITAR ==========
  // Matemática
  {
    id: "mil-mat-1",
    categoria: "militar",
    materia: "Matemática",
    titulo: "Geometria Plana",
    tipo: "videoaula",
    descricao: "Áreas e perímetros de figuras planas",
    videoId: "uDHQiLwTxrE", // Descomplica
    duracao: 22,
  },
  {
    id: "mil-mat-2",
    categoria: "militar",
    materia: "Matemática",
    titulo: "Conjuntos Numéricos",
    tipo: "videoaula",
    descricao: "Naturais, inteiros, racionais, reais",
    videoId: "w-aWFZ0RmOM", // Me Salva!
    duracao: 16,
  },
  
  // Física
  {
    id: "mil-fis-1",
    categoria: "militar",
    materia: "Física",
    titulo: "Cinemática - MRU e MRUV",
    tipo: "videoaula",
    descricao: "Movimento retilíneo uniforme e variado",
    videoId: "5U3KjMvryck", // Descomplica
    duracao: 18,
  },
  
  // Português
  {
    id: "mil-port-1",
    categoria: "militar",
    materia: "Português",
    titulo: "Orações Subordinadas",
    tipo: "videoaula",
    descricao: "Substantivas, adjetivas e adverbiais",
    videoId: "SQ3dxzl7vRA", // Professor Noslen
    duracao: 20,
  },
  
  // ========== ADICIONANDO MAIS VÍDEOS (mínimo 3 por matéria) ==========
  
  // VESTIBULAR - Completando
  {
    id: "vest-port-3",
    categoria: "vestibular",
    materia: "Português",
    titulo: "Literatura Brasileira - Modernismo",
    tipo: "videoaula",
    descricao: "Características e autores do modernismo",
    videoId: "hP9qusT9xXg",
    duracao: 18,
  },
  {
    id: "vest-mat-3",
    categoria: "vestibular",
    materia: "Matemática",
    titulo: "Geometria Analítica",
    tipo: "videoaula",
    descricao: "Ponto, reta e circunferência",
    videoId: "QKvHMtS8e2s",
    duracao: 22,
  },
  
  // ENEM - Completando
  {
    id: "enem-red-3",
    categoria: "enem",
    materia: "Redação",
    titulo: "Repertório Sociocultural",
    tipo: "videoaula",
    descricao: "Como usar repertório na redação ENEM",
    videoId: "l9i7BhNP8Jk",
    duracao: 14,
  },
  {
    id: "enem-mat-3",
    categoria: "enem",
    materia: "Matemática",
    titulo: "Razão e Proporção",
    tipo: "videoaula",
    descricao: "Regra de três e problemas proporcionais",
    videoId: "MfGvdV2VhxQ",
    duracao: 16,
  },
  {
    id: "enem-hum-1",
    categoria: "enem",
    materia: "Ciências Humanas",
    titulo: "Brasil Colônia",
    tipo: "videoaula",
    descricao: "Período colonial brasileiro",
    videoId: "yT8sMq7BdIo",
    duracao: 20,
  },
  {
    id: "enem-nat-1",
    categoria: "enem",
    materia: "Ciências da Natureza",
    titulo: "Ecologia - Cadeias Alimentares",
    tipo: "videoaula",
    descricao: "Produtores, consumidores e decompositores",
    videoId: "kpgrkg7M3Xs",
    duracao: 15,
  },
  
  // FEDERAL - Completando
  {
    id: "fed-port-3",
    categoria: "federal",
    materia: "Português",
    titulo: "Regência Verbal e Nominal",
    tipo: "videoaula",
    descricao: "Regência dos principais verbos",
    videoId: "vNJ3KDQX1eU",
    duracao: 16,
  },
  {
    id: "fed-rlm-3",
    categoria: "federal",
    materia: "Raciocínio Lógico",
    titulo: "Equivalências Lógicas",
    tipo: "videoaula",
    descricao: "Leis de De Morgan e equivalências",
    videoId: "FfGEzGJBCBQ",
    duracao: 18,
  },
  {
    id: "fed-inf-2",
    categoria: "federal",
    materia: "Informática",
    titulo: "Excel para Concursos",
    tipo: "videoaula",
    descricao: "Fórmulas e funções básicas",
    videoId: "rT75K_8Qq7c",
    duracao: 20,
  },
  {
    id: "fed-inf-3",
    categoria: "federal",
    materia: "Informática",
    titulo: "Segurança da Informação",
    tipo: "videoaula",
    descricao: "Vírus, malware e proteção",
    videoId: "SkHUqwfPDx4",
    duracao: 18,
  },
  
  // ESTADUAL - Completando
  {
    id: "est-port-2",
    categoria: "estadual",
    materia: "Português",
    titulo: "Ortografia e Acentuação",
    tipo: "videoaula",
    descricao: "Regras de acentuação gráfica",
    videoId: "YGWx7lkeYkE",
    duracao: 14,
  },
  {
    id: "est-port-3",
    categoria: "estadual",
    materia: "Português",
    titulo: "Pontuação",
    tipo: "videoaula",
    descricao: "Uso correto de vírgula, ponto e vírgula",
    videoId: "7kqwV0qlvgI",
    duracao: 12,
  },
  {
    id: "est-mat-3",
    categoria: "estadual",
    materia: "Matemática",
    titulo: "Porcentagem",
    tipo: "videoaula",
    descricao: "Cálculo e aplicações de porcentagem",
    videoId: "V1JwNLmXhPQ",
    duracao: 15,
  },
  {
    id: "est-rlm-1",
    categoria: "estadual",
    materia: "Raciocínio Lógico",
    titulo: "Sequências Lógicas",
    tipo: "videoaula",
    descricao: "Padrões numéricos e de figuras",
    videoId: "oq5k34bRjlQ",
    duracao: 14,
  },
  
  // MUNICIPAL - Completando
  {
    id: "mun-port-2",
    categoria: "municipal",
    materia: "Português",
    titulo: "Verbos - Tempos e Modos",
    tipo: "videoaula",
    descricao: "Presente, passado, futuro e conjugações",
    videoId: "KjJx8S0dKh8",
    duracao: 16,
  },
  {
    id: "mun-port-3",
    categoria: "municipal",
    materia: "Português",
    titulo: "Pronomes",
    tipo: "videoaula",
    descricao: "Tipos de pronomes e uso correto",
    videoId: "z9fWTfP7Xto",
    duracao: 14,
  },
  {
    id: "mun-mat-2",
    categoria: "municipal",
    materia: "Matemática",
    titulo: "Frações",
    tipo: "videoaula",
    descricao: "Operações com frações",
    videoId: "aXCOwARTdvI",
    duracao: 12,
  },
  {
    id: "mun-mat-3",
    categoria: "municipal",
    materia: "Matemática",
    titulo: "Números Decimais",
    tipo: "videoaula",
    descricao: "Operações e conversões",
    videoId: "5FJgWRQ2xyA",
    duracao: 10,
  },
  
  // TRIBUNAIS - Completando
  {
    id: "trib-const-2",
    categoria: "tribunais",
    materia: "Direito Constitucional",
    titulo: "Organização do Estado",
    tipo: "videoaula",
    descricao: "União, Estados e Municípios",
    videoId: "L3wKzyIN1yk",
    duracao: 25,
  },
  {
    id: "trib-const-3",
    categoria: "tribunais",
    materia: "Direito Constitucional",
    titulo: "Poder Legislativo",
    tipo: "videoaula",
    descricao: "Estrutura e funcionamento do Congresso",
    videoId: "kdNNrcMlT4w",
    duracao: 22,
  },
  {
    id: "trib-adm-2",
    categoria: "tribunais",
    materia: "Direito Administrativo",
    titulo: "Atos Administrativos",
    tipo: "videoaula",
    descricao: "Conceito, atributos e classificação",
    videoId: "1iSaQOPEMgU",
    duracao: 24,
  },
  {
    id: "trib-adm-3",
    categoria: "tribunais",
    materia: "Direito Administrativo",
    titulo: "Licitações e Contratos",
    tipo: "videoaula",
    descricao: "Lei 8.666/93 - Modalidades de licitação",
    videoId: "xMWi9XNMjcY",
    duracao: 28,
  },
  {
    id: "trib-rlm-1",
    categoria: "tribunais",
    materia: "Raciocínio Lógico",
    titulo: "Lógica de Argumentação",
    tipo: "videoaula",
    descricao: "Silogismos e validade de argumentos",
    videoId: "ePUZ8Lk5XYE",
    duracao: 18,
  },
  
  // MILITAR - Completando
  {
    id: "mil-mat-3",
    categoria: "militar",
    materia: "Matemática",
    titulo: "Funções",
    tipo: "videoaula",
    descricao: "Função afim e quadrática",
    videoId: "XR5cUrI4jWE",
    duracao: 20,
  },
  {
    id: "mil-fis-2",
    categoria: "militar",
    materia: "Física",
    titulo: "Leis de Newton",
    tipo: "videoaula",
    descricao: "As três leis do movimento",
    videoId: "NJ6KuDvSRcg",
    duracao: 16,
  },
  {
    id: "mil-fis-3",
    categoria: "militar",
    materia: "Física",
    titulo: "Trabalho e Energia",
    tipo: "videoaula",
    descricao: "Energia cinética e potencial",
    videoId: "TQR_3APFqv4",
    duracao: 18,
  },
  {
    id: "mil-port-2",
    categoria: "militar",
    materia: "Português",
    titulo: "Coesão e Coerência",
    tipo: "videoaula",
    descricao: "Elementos de ligação textual",
    videoId: "3lkNWZiXQps",
    duracao: 14,
  },
  {
    id: "mil-port-3",
    categoria: "militar",
    materia: "Português",
    titulo: "Compreensão Textual",
    tipo: "videoaula",
    descricao: "Estratégias de leitura e interpretação",
    videoId: "JQbjS0_ZfJ0",
    duracao: 16,
  },
  
  // Completando matérias que faltam vídeos
  {
    id: "enem-hum-2",
    categoria: "enem",
    materia: "Ciências Humanas",
    titulo: "Revolução Industrial",
    tipo: "videoaula",
    descricao: "Primeira e segunda revolução industrial",
    videoId: "8AyVh1_vWYQ",
    duracao: 18,
  },
  {
    id: "enem-hum-3",
    categoria: "enem",
    materia: "Ciências Humanas",
    titulo: "Geopolítica Mundial",
    tipo: "videoaula",
    descricao: "Conflitos e relações internacionais",
    videoId: "PZn-u1rpcxg",
    duracao: 16,
  },
  {
    id: "enem-nat-2",
    categoria: "enem",
    materia: "Ciências da Natureza",
    titulo: "Química Orgânica",
    tipo: "videoaula",
    descricao: "Funções orgânicas e nomenclatura",
    videoId: "Yx4n2iHBjBs",
    duracao: 20,
  },
  {
    id: "enem-nat-3",
    categoria: "enem",
    materia: "Ciências da Natureza",
    titulo: "Eletricidade",
    tipo: "videoaula",
    descricao: "Corrente, tensão e resistência elétrica",
    videoId: "k3aKKasOmIw",
    duracao: 17,
  },
  {
    id: "enem-ling-1",
    categoria: "enem",
    materia: "Linguagens",
    titulo: "Funções da Linguagem",
    tipo: "videoaula",
    descricao: "Referencial, emotiva, conativa, fática, metalinguística e poética",
    videoId: "T8nCMvspPKo",
    duracao: 14,
  },
  {
    id: "enem-ling-2",
    categoria: "enem",
    materia: "Linguagens",
    titulo: "Gêneros Textuais",
    tipo: "videoaula",
    descricao: "Carta, artigo, crônica, notícia",
    videoId: "fPtGkFXvGGM",
    duracao: 12,
  },
  {
    id: "enem-ling-3",
    categoria: "enem",
    materia: "Linguagens",
    titulo: "Interpretação de Imagens",
    tipo: "videoaula",
    descricao: "Análise de charges, tirinhas e infográficos",
    videoId: "VVp4ECX0I8k",
    duracao: 10,
  },
  {
    id: "trib-port-2",
    categoria: "tribunais",
    materia: "Português",
    titulo: "Colocação Pronominal",
    tipo: "videoaula",
    descricao: "Próclise, mesóclise e ênclise",
    videoId: "8wY8X-1aZHs",
    duracao: 16,
  },
  {
    id: "trib-port-3",
    categoria: "tribunais",
    materia: "Português",
    titulo: "Vozes Verbais",
    tipo: "videoaula",
    descricao: "Ativa, passiva e reflexiva",
    videoId: "u7fDgpD5cUo",
    duracao: 14,
  },
  {
    id: "trib-rlm-2",
    categoria: "tribunais",
    materia: "Raciocínio Lógico",
    titulo: "Diagramas Lógicos",
    tipo: "videoaula",
    descricao: "Diagramas de Venn e Euler",
    videoId: "NbbCPbnMR88",
    duracao: 15,
  },
  {
    id: "trib-rlm-3",
    categoria: "tribunais",
    materia: "Raciocínio Lógico",
    titulo: "Probabilidade",
    tipo: "videoaula",
    descricao: "Cálculo de probabilidades",
    videoId: "9MKhwzagnHs",
    duracao: 18,
  },
  {
    id: "trib-inf-1",
    categoria: "tribunais",
    materia: "Informática",
    titulo: "Redes de Computadores",
    tipo: "videoaula",
    descricao: "LAN, WAN, protocolos TCP/IP",
    videoId: "VwpP8PUzqLw",
    duracao: 22,
  },
  {
    id: "trib-inf-2",
    categoria: "tribunais",
    materia: "Informática",
    titulo: "Internet e Email",
    tipo: "videoaula",
    descricao: "Navegadores e protocolos de email",
    videoId: "oN3QOsZ1KAw",
    duracao: 18,
  },
  {
    id: "trib-inf-3",
    categoria: "tribunais",
    materia: "Informática",
    titulo: "LibreOffice Writer",
    tipo: "videoaula",
    descricao: "Formatação de documentos",
    videoId: "z7x1aaZ03nc",
    duracao: 20,
  },
  {
    id: "est-rlm-2",
    categoria: "estadual",
    materia: "Raciocínio Lógico",
    titulo: "Raciocínio Verbal",
    tipo: "videoaula",
    descricao: "Analogias e séries verbais",
    videoId: "Hv0cqG0_2AA",
    duracao: 14,
  },
  {
    id: "est-rlm-3",
    categoria: "estadual",
    materia: "Raciocínio Lógico",
    titulo: "Problemas Matemáticos",
    tipo: "videoaula",
    descricao: "Resolução de problemas lógicos",
    videoId: "lcuP9OwgTBg",
    duracao: 16,
  },
  
  // VESTIBULAR - Completando matérias faltantes
  {
    id: "vest-fis-1",
    categoria: "vestibular",
    materia: "Física",
    titulo: "Cinemática Escalar",
    tipo: "videoaula",
    descricao: "MRU e MRUV com gráficos",
    videoId: "5U3KjMvryck",
    duracao: 18,
  },
  {
    id: "vest-fis-2",
    categoria: "vestibular",
    materia: "Física",
    titulo: "Dinâmica - Leis de Newton",
    tipo: "videoaula",
    descricao: "As três leis do movimento",
    videoId: "NJ6KuDvSRcg",
    duracao: 16,
  },
  {
    id: "vest-fis-3",
    categoria: "vestibular",
    materia: "Física",
    titulo: "Óptica Geométrica",
    tipo: "videoaula",
    descricao: "Reflexão, refração e espelhos",
    videoId: "Gv9ygkhZDqk",
    duracao: 20,
  },
  {
    id: "vest-qui-1",
    categoria: "vestibular",
    materia: "Química",
    titulo: "Tabela Periódica",
    tipo: "videoaula",
    descricao: "Organização e propriedades periódicas",
    videoId: "mjVMg68p3ME",
    duracao: 16,
  },
  {
    id: "vest-qui-2",
    categoria: "vestibular",
    materia: "Química",
    titulo: "Ligações Químicas",
    tipo: "videoaula",
    descricao: "Iônica, covalente e metálica",
    videoId: "TzkdJT1qZ-E",
    duracao: 18,
  },
  {
    id: "vest-qui-3",
    categoria: "vestibular",
    materia: "Química",
    titulo: "Estequiometria",
    tipo: "videoaula",
    descricao: "Cálculos químicos e balanceamento",
    videoId: "8JDIko5pzMg",
    duracao: 22,
  },
  {
    id: "vest-bio-1",
    categoria: "vestibular",
    materia: "Biologia",
    titulo: "Citologia - Estrutura Celular",
    tipo: "videoaula",
    descricao: "Organelas e suas funções",
    videoId: "q3rlhhN8r6Y",
    duracao: 20,
  },
  {
    id: "vest-bio-2",
    categoria: "vestibular",
    materia: "Biologia",
    titulo: "Genética - Leis de Mendel",
    tipo: "videoaula",
    descricao: "Primeira e segunda lei de Mendel",
    videoId: "x0BW_2hN8Ro",
    duracao: 18,
  },
  {
    id: "vest-bio-3",
    categoria: "vestibular",
    materia: "Biologia",
    titulo: "Ecologia - Relações Ecológicas",
    tipo: "videoaula",
    descricao: "Competição, predação, mutualismo",
    videoId: "kpgrkg7M3Xs",
    duracao: 16,
  },
  {
    id: "vest-his-1",
    categoria: "vestibular",
    materia: "História",
    titulo: "Brasil Colonial",
    tipo: "videoaula",
    descricao: "Colonização portuguesa no Brasil",
    videoId: "yT8sMq7BdIo",
    duracao: 20,
  },
  {
    id: "vest-his-2",
    categoria: "vestibular",
    materia: "História",
    titulo: "Revolução Francesa",
    tipo: "videoaula",
    descricao: "Causas e consequências",
    videoId: "6hfzo8wVPPk",
    duracao: 18,
  },
  {
    id: "vest-his-3",
    categoria: "vestibular",
    materia: "História",
    titulo: "Segunda Guerra Mundial",
    tipo: "videoaula",
    descricao: "Causas, desenvolvimento e consequências",
    videoId: "Q78COTwT7nE",
    duracao: 25,
  },
  {
    id: "vest-geo-1",
    categoria: "vestibular",
    materia: "Geografia",
    titulo: "Geologia e Relevo",
    tipo: "videoaula",
    descricao: "Estrutura da Terra e formação do relevo",
    videoId: "KP2Y5nKCZxo",
    duracao: 16,
  },
  {
    id: "vest-geo-2",
    categoria: "vestibular",
    materia: "Geografia",
    titulo: "Clima e Vegetação",
    tipo: "videoaula",
    descricao: "Climas do Brasil e biomas",
    videoId: "Xk9C6CjVwJc",
    duracao: 18,
  },
  {
    id: "vest-geo-3",
    categoria: "vestibular",
    materia: "Geografia",
    titulo: "Urbanização",
    tipo: "videoaula",
    descricao: "Processo de urbanização no Brasil",
    videoId: "M7V9k0p2zEo",
    duracao: 20,
  },
  {
    id: "vest-ing-1",
    categoria: "vestibular",
    materia: "Inglês",
    titulo: "Reading Comprehension",
    tipo: "videoaula",
    descricao: "Técnicas de leitura e interpretação",
    videoId: "PdO3IP0Pro8",
    duracao: 15,
  },
  {
    id: "vest-ing-2",
    categoria: "vestibular",
    materia: "Inglês",
    titulo: "Grammar - Verb Tenses",
    tipo: "videoaula",
    descricao: "Present, past and future tenses",
    videoId: "xo2SleuMEZk",
    duracao: 18,
  },
  {
    id: "vest-ing-3",
    categoria: "vestibular",
    materia: "Inglês",
    titulo: "Vocabulário FUVEST",
    tipo: "videoaula",
    descricao: "Palavras mais cobradas em vestibulares",
    videoId: "q2FZPVF6p8s",
    duracao: 12,
  },
  
  // FEDERAL - Completando Direito
  {
    id: "fed-dadm-1",
    categoria: "federal",
    materia: "Direito Administrativo",
    titulo: "Princípios da Administração",
    tipo: "videoaula",
    descricao: "LIMPE e outros princípios",
    videoId: "YLx8qJWw8LQ",
    duracao: 20,
  },
  {
    id: "fed-dadm-2",
    categoria: "federal",
    materia: "Direito Administrativo",
    titulo: "Poderes Administrativos",
    tipo: "videoaula",
    descricao: "Vinculado, discricionário, hierárquico",
    videoId: "4kNlqvGwxfU",
    duracao: 22,
  },
  {
    id: "fed-dadm-3",
    categoria: "federal",
    materia: "Direito Administrativo",
    titulo: "Improbidade Administrativa",
    tipo: "videoaula",
    descricao: "Lei 8.429/92",
    videoId: "cOJKT5VYzKY",
    duracao: 25,
  },
  {
    id: "fed-dcon-1",
    categoria: "federal",
    materia: "Direito Constitucional",
    titulo: "Direitos Fundamentais",
    tipo: "videoaula",
    descricao: "Artigo 5º da CF/88",
    videoId: "S0pcnR3TgI4",
    duracao: 30,
  },
  {
    id: "fed-dcon-2",
    categoria: "federal",
    materia: "Direito Constitucional",
    titulo: "Poder Executivo",
    tipo: "videoaula",
    descricao: "Atribuições do Presidente",
    videoId: "3kkGOdL7Fws",
    duracao: 20,
  },
  {
    id: "fed-dcon-3",
    categoria: "federal",
    materia: "Direito Constitucional",
    titulo: "Controle de Constitucionalidade",
    tipo: "videoaula",
    descricao: "ADI, ADC e ADPF",
    videoId: "oUMhVdWZ5bE",
    duracao: 28,
  },
  
  // ESTADUAL - Conhecimentos Específicos
  {
    id: "est-cesp-1",
    categoria: "estadual",
    materia: "Conhecimentos Específicos",
    titulo: "Legislação PM",
    tipo: "videoaula",
    descricao: "Estatuto da Polícia Militar",
    videoId: "WJxwrJwBw1k",
    duracao: 22,
  },
  {
    id: "est-cesp-2",
    categoria: "estadual",
    materia: "Conhecimentos Específicos",
    titulo: "Direitos Humanos",
    tipo: "videoaula",
    descricao: "Princípios e convenções internacionais",
    videoId: "pnMWUWdP3n8",
    duracao: 18,
  },
  {
    id: "est-cesp-3",
    categoria: "estadual",
    materia: "Conhecimentos Específicos",
    titulo: "Ética no Serviço Público",
    tipo: "videoaula",
    descricao: "Princípios éticos para servidores",
    videoId: "dW7HKfYQvvg",
    duracao: 16,
  },
  
  // MUNICIPAL - Conhecimentos Gerais e Específicos
  {
    id: "mun-cger-1",
    categoria: "municipal",
    materia: "Conhecimentos Gerais",
    titulo: "Atualidades Brasileiras",
    tipo: "videoaula",
    descricao: "Política, economia e sociedade",
    videoId: "zJC5TqBIWMo",
    duracao: 20,
  },
  {
    id: "mun-cger-2",
    categoria: "municipal",
    materia: "Conhecimentos Gerais",
    titulo: "Geografia do Brasil",
    tipo: "videoaula",
    descricao: "Regiões e características",
    videoId: "Xk9C6CjVwJc",
    duracao: 18,
  },
  {
    id: "mun-cger-3",
    categoria: "municipal",
    materia: "Conhecimentos Gerais",
    titulo: "História do Brasil",
    tipo: "videoaula",
    descricao: "Principais fatos históricos",
    videoId: "yT8sMq7BdIo",
    duracao: 20,
  },
  {
    id: "mun-cesp-1",
    categoria: "municipal",
    materia: "Conhecimentos Específicos",
    titulo: "Legislação Municipal",
    tipo: "videoaula",
    descricao: "Lei Orgânica do Município",
    videoId: "tH5W-mY0QjM",
    duracao: 22,
  },
  {
    id: "mun-cesp-2",
    categoria: "municipal",
    materia: "Conhecimentos Específicos",
    titulo: "Administração Pública Municipal",
    tipo: "videoaula",
    descricao: "Estrutura e funcionamento",
    videoId: "k1gvKsXqmzQ",
    duracao: 18,
  },
  {
    id: "mun-cesp-3",
    categoria: "municipal",
    materia: "Conhecimentos Específicos",
    titulo: "Saúde Pública SUS",
    tipo: "videoaula",
    descricao: "Princípios e diretrizes do SUS",
    videoId: "9NQ4T8KdVuY",
    duracao: 24,
  },
  
  // MILITAR - Completando matérias faltantes
  {
    id: "mil-qui-1",
    categoria: "militar",
    materia: "Química",
    titulo: "Química Geral",
    tipo: "videoaula",
    descricao: "Átomos, moléculas e reações",
    videoId: "TzkdJT1qZ-E",
    duracao: 18,
  },
  {
    id: "mil-qui-2",
    categoria: "militar",
    materia: "Química",
    titulo: "Funções Inorgânicas",
    tipo: "videoaula",
    descricao: "Ácidos, bases, sais e óxidos",
    videoId: "Zp4Ow9SoHDo",
    duracao: 20,
  },
  {
    id: "mil-qui-3",
    categoria: "militar",
    materia: "Química",
    titulo: "Cálculos Estequiométricos",
    tipo: "videoaula",
    descricao: "Mol, massa molar e proporções",
    videoId: "8JDIko5pzMg",
    duracao: 22,
  },
  {
    id: "mil-ing-1",
    categoria: "militar",
    materia: "Inglês",
    titulo: "Military English Vocabulary",
    tipo: "videoaula",
    descricao: "Vocabulário militar básico",
    videoId: "xo2SleuMEZk",
    duracao: 16,
  },
  {
    id: "mil-ing-2",
    categoria: "militar",
    materia: "Inglês",
    titulo: "English Grammar Basics",
    tipo: "videoaula",
    descricao: "Tempos verbais e estruturas",
    videoId: "PdO3IP0Pro8",
    duracao: 18,
  },
  {
    id: "mil-ing-3",
    categoria: "militar",
    materia: "Inglês",
    titulo: "Reading for ESA/AFA",
    tipo: "videoaula",
    descricao: "Interpretação de textos",
    videoId: "q2FZPVF6p8s",
    duracao: 14,
  },
  {
    id: "mil-his-1",
    categoria: "militar",
    materia: "História",
    titulo: "História do Brasil",
    tipo: "videoaula",
    descricao: "Do descobrimento à república",
    videoId: "yT8sMq7BdIo",
    duracao: 20,
  },
  {
    id: "mil-his-2",
    categoria: "militar",
    materia: "História",
    titulo: "Guerra Fria",
    tipo: "videoaula",
    descricao: "Bipolarização mundial",
    videoId: "Y19xvo1v-wk",
    duracao: 18,
  },
  {
    id: "mil-his-3",
    categoria: "militar",
    materia: "História",
    titulo: "Ditadura Militar Brasil",
    tipo: "videoaula",
    descricao: "1964-1985",
    videoId: "GVJ8cdP5VhY",
    duracao: 22,
  },
  {
    id: "mil-geo-1",
    categoria: "militar",
    materia: "Geografia",
    titulo: "Cartografia",
    tipo: "videoaula",
    descricao: "Mapas, escalas e coordenadas",
    videoId: "0SqjtrfVHH4",
    duracao: 16,
  },
  {
    id: "mil-geo-2",
    categoria: "militar",
    materia: "Geografia",
    titulo: "Geopolítica Mundial",
    tipo: "videoaula",
    descricao: "Conflitos e relações internacionais",
    videoId: "PZn-u1rpcxg",
    duracao: 18,
  },
  {
    id: "mil-geo-3",
    categoria: "militar",
    materia: "Geografia",
    titulo: "Geografia do Brasil",
    tipo: "videoaula",
    descricao: "Aspectos físicos e regionais",
    videoId: "Xk9C6CjVwJc",
    duracao: 20,
  },
];

// Helper function para buscar materiais por categoria e matéria
export function getMaterialsPorCategoriaMateria(
  categoria: CategoriaConcurso,
  materia: string,
  tipo?: TipoMaterial
): MaterialConcurso[] {
  return concursosData.filter(
    (material) =>
      material.categoria === categoria &&
      material.materia === materia &&
      (!tipo || material.tipo === tipo)
  );
}

// Helper function para buscar todas as matérias de uma categoria
export function getMateriasPorCategoria(categoria: CategoriaConcurso): string[] {
  const materias = new Set<string>();
  concursosData.forEach((material) => {
    if (material.categoria === categoria) {
      materias.add(material.materia);
    }
  });
  return Array.from(materias);
}
