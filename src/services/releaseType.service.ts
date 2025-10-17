import { sortBy } from "lodash";

import { SelectOptions } from "@/types/select";
import { apiClient } from "@/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ReleaseType, ReleaseTypeCreate } from "@/types/releaseType";

export function useReleaseTypeSelect() {
  return useQuery<SelectOptions[]>({
    queryKey: ["release-type"],
    queryFn: async () => {
      const { data } = await apiClient.get<ReleaseType[]>("/releaseTypes/all");
      return sortBy(data, ["name"]).map((releaseType) => ({
        label: releaseType.name,
        value: `${releaseType.id}${releaseType.color}`,
      }));
    },
  });
}

export function useReleaseTypeCreate() {
  return useMutation({
    mutationKey: ["release-type-create"],
    mutationFn: async (body: ReleaseTypeCreate) => {
      const { data } = await apiClient.post<ReleaseType>(
        "/releaseTypes/create",
        body
      );
      return data;
    },
  });
}
