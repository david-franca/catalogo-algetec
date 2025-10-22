import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getEquivalencies } from "../api/getAll";

export const useGetEquivalencies = () => {
  return useQuery({
    queryKey: ["equivalencies"],
    queryFn: () => getEquivalencies(),
    placeholderData: keepPreviousData,
  });
};
