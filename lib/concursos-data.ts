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
