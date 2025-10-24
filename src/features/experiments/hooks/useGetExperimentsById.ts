import { useQuery } from "@tanstack/react-query";

import { getExperimentsById } from "../api/getById";

export const useGetExperimentsById = (id: string) => {
  return useQuery({
    queryKey: ["experiments", id],
    queryFn: () => getExperimentsById(id),
    refetchOnWindowFocus: false,
  });
};
