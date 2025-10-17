import { SelectOptions } from "@/types/select";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { Department } from "../types/department";
import { handleTypeName } from "../utils/handleTypeName";
import { apiClient } from "../utils/HttpClient";
import { Experiment } from "@/types/experiment";

export function useDepartmentSelect(
  mode: "id" | "name" = "id",
  id?: number | string
) {
  return useQuery<SelectOptions[]>({
    queryKey: ["departments-select"],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const { data } = await apiClient.get<Department[]>("/departments/all");

      return data
        .filter((department) => department.id !== id)
        .map((department) => ({
          label: handleTypeName(department.name),
          value:
            mode === "id"
              ? department.id.toString()
              : department.name.toLowerCase(),
        }));
    },
  });
}

export function useDemandExperimentSelect() {
  return useQuery<SelectOptions[]>({
    queryKey: ["demand-experiment-select"],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const { data } = await apiClient.get<Experiment[]>(
        "/demands/experiments"
      );
      return data
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((experiment) => ({
          label: `${experiment.id} - ${experiment.name.toUpperCase()}`,
          value: experiment.id.toString(),
        }));
    },
  });
}
