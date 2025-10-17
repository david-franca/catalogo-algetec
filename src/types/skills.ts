import { Key } from "react";

export interface Practice {
  id: number;
  experiment_id: string;
  name: string;
  code: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface ObjectCompetence {
  id: number;
  name: string;
  practices: {
    id: number;
    name: string;
    experiment_id: string;
    code: string;
    experiment: {
      id: string;
      name: string;
    };
  }[];
}

export interface Unity {
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

export interface Skills {
  id: number;
  competence_id: number;
  code: string;
  description: string;
  notes: string;
  created_at: string;
  updated_at: string;
  practices: Practice[];
  objects: ObjectCompetence[];
  unities: Unity[];
  competence: Competence;
}

export interface CreateSkillProps {
  code: string;
  description: string;
  notes: string;
  practices?: number[];
  objects?: string[];
  object_practices?: {
    object_name: string;
    practices: number[];
  }[];
  unities?: string[];
}

export interface CreateSkills {
  curriculum_name: string;
  competence_area_name: string;
  competence_description: string;
  competence_code: string;
  skills: CreateSkillProps[];
}

export type UpdateSkillProps = Omit<CreateSkills, "skills"> & {
  skill: CreateSkillProps;
};

export type UpdateSkill = Partial<UpdateSkillProps> & { id: number };

export interface CompleteObjects {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  practices: Practice[];
  skills: Omit<Skills, "objects">[];
}

interface PracticeList {
  name: string;
  experimentId: string;
  code: string;
}

export interface SkillList {
  key: Key;
  id: number;
  code: string;
  description: string;
  notes: string;
  competenceCode: string;
  competenceDescription: string;
  competenceAreaName: string;
  competenceCurriculumName: string;
  objects: ObjectCompetence[];
  practices: PracticeList[];
  createdAt: string;
  updatedAt: string;
  unites: string[];
}
