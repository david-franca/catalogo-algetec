import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getFields } from "../api/getAll";

export const useGetFields = () => {
  return useQuery({
    queryKey: ["fields"],
    queryFn: () => getFields(),
    placeholderData: keepPreviousData,
  });
};
