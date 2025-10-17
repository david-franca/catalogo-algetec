export interface DesignerQuestion {
  questions: Question[];
}

export interface Question {
  title: string;
  index: number;
  year: number;
  language?: string;
  discipline: string;
  context: string;
  files: string[];
  correctAlternative: string;
  alternativesIntroduction?: string;
  alternatives: Alterna[];
  numSeqYearIndex: number;
  exameCode: number;
  invalidQuestion: boolean;
  skill: string;
  difficulty: string;
  knowledge_objects: KnowledgeObject[];
}

export interface Alterna {
  letter: string;
  text?: string;
  file?: string;
  isCorrect: boolean;
}

export interface KnowledgeObject {
  id: string;
  category: string;
  object: string;
}
