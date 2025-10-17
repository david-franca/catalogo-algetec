import { Key } from "react";

import { ObjectCompetence } from "./skills";

export interface ObjectsList {
  key: Key;
  id: number;
  code: string;
  description: string;
  notes: string;
  competenceCode: string;
  competenceDescription: string;
  competenceAreaName: string;
  competenceCurriculumName: string;
  objects: ObjectCompetence;
  practices: string[];
  createdAt: string;
  updatedAt: string;
  unites: string[];
  objectPractices: string[];
}
