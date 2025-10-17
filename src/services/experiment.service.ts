import {
  Experiment,
  ExperimentReleaseResponse,
  ExperimentShow,
  ExperimentShowResponse,
} from "@/types/experiment";
import { SelectOptions } from "@/types/select";
import { apiClient } from "@/utils";
import { useQuery } from "@tanstack/react-query";

export function useExperimentSelect() {
  return useQuery<SelectOptions[]>({
    queryKey: ["experiment-select"],
    queryFn: async () => {
      const { data } = await apiClient.get<Experiment[]>(
        "/demands/experiments"
      );
      return data.map((experiment) => ({
        label: `${experiment.id} - ${experiment.name}`,
        value: experiment.id.toString(),
      }));
    },
  });
}

export function useExperimentShow(id?: number | string) {
  return useQuery<ExperimentShowResponse>({
    queryKey: ["experiment", id],
    queryFn: async () => {
      const { data } = await apiClient.get<ExperimentShow>(
        `/experiments/show/${id}`
      );
      const res: ExperimentReleaseResponse[] = [];

      data.releases.forEach((release) => {
        if (release.releaseType.length === 1) {
          res.push({ ...release, releaseType: release.releaseType[0] });
        }
        if (release.releaseType.length > 1) {
          release.releaseType.forEach((releaseType) =>
            res.push({ ...release, releaseType })
          );
        }
      });
      return { ...data, releases: res };
    },
    enabled: !!id,
  });
}
