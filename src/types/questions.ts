export interface QuestionRoot {
  root: {
    [x: string]: Questions;
  };
}
export interface Questions {
  total_questoes_encontradas: number;
  questoes_detalhes: QuestoesDetalhe[];
  questoes_completas: QuestionComplete[];
}

export interface QuestionComplete {
  title: string;
  index: number;
  year: number;
  language: null;
  discipline: Discipline;
  context: string;
  files: string[];
  correctAlternative: CorrectAlternative;
  alternativesIntroduction: null | string;
  alternatives: Alternative[];
  numSeqYearIndex: number;
  exameCode: number;
  invalidQuestion: boolean;
  skill: string;
  difficulty: string;
}

export interface Alternative {
  letter: CorrectAlternative;
  text: null | string;
  file: null | string;
  isCorrect: boolean;
}

export type CorrectAlternative = "A" | "B" | "C" | "D" | "E";

export type Discipline = "ciencias-natureza";

export interface QuestoesDetalhe {
  year: number;
  index: number;
  relative_difficulty: number;
  original_difficulty: string;
}
