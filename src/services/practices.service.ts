import { apiClient } from "@/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "./client";
import { Practice, PracticeList } from "@/types/practice";
import { orderBy } from "lodash";

export function usePracticeDelete() {
  return useMutation({
    mutationKey: ["practice-delete"],
    mutationFn: async (id: number) => {
      await apiClient.delete(`/practices/delete/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["practices"] });
    },
  });
}

export function usePracticeList() {
  return useQuery<PracticeList[]>({
    queryKey: ["practices"],
    queryFn: async () => {
      const { data } = await apiClient.get<Practice[]>("/practices/all");

      return orderBy(data, "code", "asc").map((practice) => ({
        key: practice.id,
        id: practice.id,
        code: practice.code,
        name: practice.name,
        description: practice.description,
        experiment_id: practice.experiment_id,
        experiment_name: practice.experiment.name,
        experiment_description: practice.experiment.description,
        areas: practice.experiment.areas.map((el) => el.name),
        skills: practice.skills.map(
          (el) =>
            `${el.competence.curriculum.name} - ${el.competence.code} - ${el.code}`
        ),
      }));
    },
  });
}
