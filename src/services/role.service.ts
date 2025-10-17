import { SelectOptions } from "@/types/select";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { Role } from "../types/role";
import { apiClient } from "../utils/HttpClient";

export function useRoleSelect(id?: number | string) {
  return useQuery<SelectOptions[]>({
    queryKey: ["roles-select"],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const { data } = await apiClient.get<Role[]>("/roles/all");

      return data
        .map((role) => ({
          label: role.name,
          value: role.id.toString(),
        }))
        .filter((role) => role.value !== id?.toString());
    },
  });
}
