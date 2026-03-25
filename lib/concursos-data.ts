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

// Dados iniciais de videoaulas (será expandido)
export const concursosData: MaterialConcurso[] = [
  // Vestibular - Português
  {
    id: "vest-port-1",
    categoria: "vestibular",
    materia: "Português",
    titulo: "Interpretação de Texto para Vestibular",
    tipo: "videoaula",
    descricao: "Técnicas de interpretação textual",
    videoId: "dQw4w9WgXcQ", // Placeholder - será substituído
    duracao: 25,
  },
  
  // ENEM - Redação
  {
    id: "enem-red-1",
    categoria: "enem",
    materia: "Redação",
    titulo: "Como fazer uma redação nota 1000",
    tipo: "videoaula",
    descricao: "Estrutura e técnicas para redação ENEM",
    videoId: "dQw4w9WgXcQ", // Placeholder
    duracao: 30,
  },
  
  // Federal - Português
  {
    id: "fed-port-1",
    categoria: "federal",
    materia: "Português",
    titulo: "Português para Concursos - Sintaxe",
    tipo: "videoaula",
    descricao: "Análise sintática para concursos",
    videoId: "dQw4w9WgXcQ", // Placeholder
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
