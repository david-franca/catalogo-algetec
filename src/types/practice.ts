import { Key } from "react";
import { Experiment } from "./experiment";

export interface Area {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface CompetenceArea {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Curriculum {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Competence {
  id: number;
  curriculum_id: number;
  competence_area_id: number;
  code: string;
  description: string;
  created_at: string;
  updated_at: string;
  competence_area: CompetenceArea;
  curriculum: Curriculum;
}

export interface Skill {
  id: number;
  competence_id: number;
  code: string;
  description: string;
  notes: string;
  created_at: string;
  updated_at: string;
  competence: Competence;
}

export type ExperimentWithArea = Experiment & {
  areas: Area[];
};

export interface Practice {
  id: number;
  experiment_id: string;
  name: string;
  code: string;
  description: string;
  created_at: string;
  updated_at: string;
  experiment: ExperimentWithArea;
  skills: Skill[];
}

export interface PracticeList {
  key: Key;
  id: number;
  code: string;
  name: string;
  description: string;
  experiment_id: string;
  experiment_name: string;
  experiment_description: string;
  areas: string[];
  skills: string[];
}
