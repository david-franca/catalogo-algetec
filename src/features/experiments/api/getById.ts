import { queryOptions } from "@tanstack/react-query";

import { apiClient } from "@/lib/axios";

import { experimentsSchema, type Experiments } from "../schemas";

export const getExperimentsById = async (id: string) => {
  const response = await apiClient.get<Experiments[]>(`experiments/show/${id}`);
  return experimentsSchema.parse(response.data[0]);
};

export const experimentQueryOptions = (experimentId: string) =>
  queryOptions({
    queryKey: ["experiment", experimentId], // Chave da query
    queryFn: () => getExperimentsById(experimentId), // Função de busca
  });
