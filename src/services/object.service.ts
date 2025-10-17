import { nanoid } from "nanoid";

import { ObjectsList } from "@/types/objects";
import { Skills } from "@/types/skills";
import { apiClient } from "@/utils";
import { useQuery } from "@tanstack/react-query";

export function useObjectsList() {
  return useQuery<ObjectsList[]>({
    queryKey: ["objects-list"],
    queryFn: async () => {
      const { data } = await apiClient.get<Skills[]>("/skills/all");

      const returnedSkills: ObjectsList[] = [];

      data.forEach((skill) => {
        skill.objects.forEach((object) => {
          returnedSkills.push({
            key: `${skill.id}||${nanoid()}`,
            id: skill.id,
            code: skill.code,
            description: skill.description,
            notes: skill.notes,
            competenceCode: skill.competence.code,
            competenceDescription: skill.competence.description,
            competenceAreaName: skill.competence.competence_area.name,
            competenceCurriculumName: skill.competence.curriculum.name,
            objects: object,
            practices: skill.practices.map(
              (practice) =>
                `${practice.code} | ID: ${practice.experiment_id} | ${practice.name}`
            ),
            unites: skill.unities.map((unit) => unit.name),
            createdAt: skill.created_at,
            updatedAt: skill.updated_at,
            objectPractices: object.practices.map(
              (practice) =>
                `${practice.code} | ID: ${practice.experiment_id} | ${practice.name}`
            ),
          });
        });
      });
      return returnedSkills;
    },
  });
}
