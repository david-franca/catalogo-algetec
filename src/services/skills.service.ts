import { SkillList, Skills } from "@/types/skills";
import { apiClient } from "@/utils";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useSkillList() {
  return useQuery<SkillList[]>({
    queryKey: ["skills"],
    queryFn: async () => {
      const { data } = await apiClient.get<Skills[]>("/skills/all");

      return data.map((skill) => ({
        key: skill.id,
        id: skill.id,
        code: skill.code,
        description: skill.description,
        notes: skill.notes,
        competenceCode: skill.competence.code,
        competenceDescription: skill.competence.description,
        competenceAreaName: skill.competence.competence_area.name,
        competenceCurriculumName: skill.competence.curriculum.name,
        objects: skill.objects,
        practices: skill.practices?.map((practice) => ({
          name: practice.name,
          experimentId: practice.experiment_id,
          code: practice.code,
        })),
        unites: skill.unities.map((unit) => unit.name),
        createdAt: skill.created_at,
        updatedAt: skill.updated_at,
      }));
    },
  });
}

export function useSkillDelete() {
  return useMutation({
    mutationKey: ["skill-delete"],
    mutationFn: async (id: number) => {
      await apiClient.delete(`/skills/delete/${id}`);
    },
  });
}
