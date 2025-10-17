import { ExperimentsMeta } from "@/types/experiment";
import { apiClient } from "@/utils";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";

export function useLabList() {
  const {
    limit,
    page,
    android,
    approved,
    en,
    es,
    field,
    ios,
    name,
    order,
    pt,
    status,
    web,
    hide,
    id,
  } = useSearch({ from: "/dashboard/labs/" });
  return useQuery({
    queryKey: [
      "labs",
      limit,
      page,
      android,
      approved,
      en,
      es,
      field,
      ios,
      name,
      order,
      pt,
      status,
      web,
      hide,
      id,
    ],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const {
        data: { data, meta },
      } = await apiClient.get<ExperimentsMeta>("/experiments/all", {
        params: {
          limit,
          page,
          android,
          approved,
          en,
          es,
          field,
          ios,
          name,
          order,
          pt,
          status,
          web,
          hide,
          id,
        },
      });
      return {
        data: data.map((experiment) => ({
          key: experiment.id,
          id: experiment.id,
          name: experiment.name,
          pt: experiment.pt,
          en: experiment.en,
          es: experiment.es,
          web: experiment.web,
          ios: experiment.ios,
          android: experiment.android,
          status: experiment.status,
          created_at: experiment.created_at,
          updated_at: experiment.updated_at,
          image: experiment.image,
          link: experiment.test,
          issueCounts: experiment?.issueCounts || {
            low: 0,
            medium: 0,
            high: 0,
            critical: 0,
          },
          approved: experiment.approved || false,
        })),
        meta,
      };
    },
  });
}
